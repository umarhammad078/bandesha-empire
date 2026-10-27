import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { PGlite } from "@electric-sql/pglite";

// Real PostgreSQL engine, in memory only. Mock just the Supabase-owned schemas;
// execute the actual migration and its grants, policies, constraints and triggers.
test("client portal migration and tenant isolation", async t => {
  const db = new PGlite();
  const a = "10000000-0000-4000-8000-000000000001";
  const b = "10000000-0000-4000-8000-000000000002";
  const requestA = "20000000-0000-4000-8000-000000000001";
  const requestB = "20000000-0000-4000-8000-000000000002";
  let orderA, orderB;
  async function client(id) {
    await db.exec("reset role; set role authenticated;");
    await db.query("select set_config('request.jwt.claim.sub', $1, false)", [id]);
  }
  async function studio() { await db.exec("reset role"); }
  const denied = action => assert.rejects(action, error => error.code === "42501");
  try {
    await db.exec(`
      create role anon; create role authenticated; create role service_role bypassrls;
      create schema auth; create schema storage;
      create table auth.users(id uuid primary key);
      create function auth.uid() returns uuid language sql stable as
        $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
      create function storage.foldername(object_name text) returns text[] language sql immutable as
        $$ select (string_to_array(object_name, '/'))[1:greatest(cardinality(string_to_array(object_name, '/')) - 1, 0)] $$;
      create table storage.buckets(id text primary key, name text, public boolean, file_size_limit bigint, allowed_mime_types text[]);
      create table storage.objects(id uuid primary key default gen_random_uuid(), bucket_id text references storage.buckets(id), name text);
      alter table storage.objects enable row level security;
      grant usage on schema auth, storage to anon, authenticated, service_role;
      grant select, insert, delete on storage.objects to authenticated;
    `);
    await db.query("insert into auth.users(id) values ($1), ($2)", [a, b]);
    await db.exec(await readFile(new URL("../supabase/migrations/20261027000000_client_portal.sql", import.meta.url), "utf8"));

    await t.test("anonymous users cannot read client records", async () => {
      await db.exec("set role anon");
      for (const table of ["portal_profiles", "portal_orders", "portal_messages", "portal_invoices", "portal_files", "portal_order_events"]) await denied(() => db.query(`select * from public.${table}`));
    });

    await t.test("each authenticated client can submit their own project", async () => {
      for (const [id, request, title] of [[a, requestA, "Client A website"], [b, requestB, "Client B website"]]) {
        await client(id);
        const result = await db.query("insert into public.portal_orders(client_id,client_request_id,title,service,package,brief) values ($1,$2,$3,'Website & Experience','growth','A clear website brief with enough useful business context.') returning *", [id, request, title]);
        if (id === a) orderA = result.rows[0].id; else orderB = result.rows[0].id;
        assert.equal(result.rows[0].status, "submitted");
        assert.equal(result.rows[0].progress, 0);
        assert.equal(result.rows[0].quoted_amount_cents, null);
      }
    });

    await t.test("cross-client reads and submissions are denied", async () => {
      await client(b);
      assert.equal((await db.query("select id from public.portal_orders where id=$1", [orderA])).rows.length, 0);
      await denied(() => db.query("insert into public.portal_orders(client_id,client_request_id,title,service,package,brief) values ($1,gen_random_uuid(),'Wrong owner','Website & Experience','starter','A project that must never be submitted for someone else.')", [a]));
    });

    await t.test("clients cannot set status, progress, price or invoice payments", async () => {
      await client(a);
      await denied(() => db.query("update public.portal_orders set progress=100,status='completed',quoted_amount_cents=1 where id=$1", [orderA]));
      await denied(() => db.query("insert into public.portal_orders(client_id,client_request_id,title,service,package,brief,status) values ($1,gen_random_uuid(),'Status bypass','Website & Experience','starter','A brief attempting to bypass the default delivery status.','completed')", [a]));
      await denied(() => db.query("insert into public.portal_invoices(client_id,invoice_number,description,amount_cents,status) values ($1,'FAKE-PAID','Not allowed',1,'paid')", [a]));
    });

    await t.test("initial milestone is created by the trigger, not writable by clients", async () => {
      await client(a);
      const events = await db.query("select * from public.portal_order_events where order_id=$1", [orderA]);
      assert.equal(events.rows.length, 1);
      assert.equal(events.rows[0].title, "Project brief received");
      await denied(() => db.query("insert into public.portal_order_events(order_id,title) values ($1,'Fake completion')", [orderA]));
      await client(b);
      assert.equal((await db.query("select * from public.portal_order_events where order_id=$1", [orderA])).rows.length, 0);
    });

    await t.test("duplicate order requests cannot create duplicate projects", async () => {
      await client(a);
      await assert.rejects(() => db.query("insert into public.portal_orders(client_id,client_request_id,title,service,package,brief) values ($1,$2,'Duplicate website','Website & Experience','growth','The same request must never produce a second project.')", [a, requestA]), error => error.code === "23505");
    });

    await t.test("messages stay with their owner and clients cannot impersonate the studio", async () => {
      await client(a);
      const sent = await db.query("insert into public.portal_messages(client_id,order_id,body) values ($1,$2,'A useful client question') returning sender_role", [a, orderA]);
      assert.equal(sent.rows[0].sender_role, "client");
      await denied(() => db.query("insert into public.portal_messages(client_id,body,sender_role) values ($1,'Fake staff answer','studio')", [a]));
      await assert.rejects(() => db.query("insert into public.portal_messages(client_id,order_id,body) values ($1,$2,'Wrong project')", [a, orderB]), error => error.code === "23503");
      await client(b);
      assert.equal((await db.query("select * from public.portal_messages where client_id=$1", [a])).rows.length, 0);
    });

    await t.test("studio updates are visible only to the intended client", async () => {
      await studio();
      await db.query("update public.portal_orders set status='in_review',progress=72,quoted_amount_cents=100000 where id=$1", [orderA]);
      await db.query("insert into public.portal_messages(client_id,order_id,body,sender_role) values ($1,$2,'Ready for review','studio')", [a, orderA]);
      await db.query("insert into public.portal_invoices(client_id,order_id,invoice_number,description,amount_cents) values ($1,$2,'BE-INV-A','Agreed milestone',50000)", [a, orderA]);
      await client(a);
      assert.equal((await db.query("select progress from public.portal_orders where id=$1", [orderA])).rows[0].progress, 72);
      assert.equal((await db.query("update public.portal_messages set read_at=now() where sender_role='studio' returning id")).rows.length, 1);
      await denied(() => db.query("update public.portal_messages set body='Tampered studio answer'"));
      await denied(() => db.query("update public.portal_invoices set status='paid'"));
      await client(b);
      assert.equal((await db.query("select * from public.portal_invoices")).rows.length, 0);
    });

    await t.test("profiles are private and do not grant account roles", async () => {
      await client(a);
      await db.query("insert into public.portal_profiles(user_id,full_name,company) values ($1,'Client A','Company A')", [a]);
      await db.query("update public.portal_profiles set full_name='Updated Client A' where user_id=$1", [a]);
      await client(b);
      assert.equal((await db.query("select * from public.portal_profiles")).rows.length, 0);
      assert.equal((await db.query("update public.portal_profiles set company='Tampered' where user_id=$1 returning user_id", [a])).rows.length, 0);
    });

    await t.test("private files are isolated by owner and registered objects cannot be deleted", async () => {
      await client(a);
      const path = `${a}/brief.pdf`;
      await db.query("insert into storage.objects(bucket_id,name) values ('portal-files',$1)", [path]);
      await db.query("insert into public.portal_files(client_id,order_id,name,storage_path,size_bytes,mime_type) values ($1,$2,'brief.pdf',$3,1024,'application/pdf')", [a, orderA, path]);
      assert.equal((await db.query("delete from storage.objects where name=$1 returning id", [path])).rows.length, 0);
      assert.equal((await db.query("select * from storage.objects where name=$1", [path])).rows.length, 1);
      await client(b);
      assert.equal((await db.query("select * from storage.objects where name=$1", [path])).rows.length, 0);
      assert.equal((await db.query("select * from public.portal_files where client_id=$1", [a])).rows.length, 0);
      await denied(() => db.query("insert into storage.objects(bucket_id,name) values ('portal-files',$1)", [`${a}/intrusion.pdf`]));
    });

    await t.test("failed unregistered uploads can be cleaned up by their owner", async () => {
      await client(a);
      const path = `${a}/unregistered.pdf`;
      await db.query("insert into storage.objects(bucket_id,name) values ('portal-files',$1)", [path]);
      assert.equal((await db.query("delete from storage.objects where name=$1 returning id", [path])).rows.length, 1);
    });

    await t.test("the storage bucket is private and limited to 10 MB", async () => {
      await studio();
      const bucket = (await db.query("select * from storage.buckets where id='portal-files'")).rows[0];
      assert.equal(bucket.public, false);
      assert.equal(Number(bucket.file_size_limit), 10485760);
      assert.equal(bucket.allowed_mime_types.includes("text/html"), false);
      assert.equal(bucket.allowed_mime_types.includes("image/svg+xml"), false);
    });
  } finally { await db.close(); }
});
