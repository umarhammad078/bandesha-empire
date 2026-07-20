export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background font-sans">
      <main className="flex w-full max-w-3xl flex-col items-center gap-8 px-6 py-24 text-center sm:items-start sm:text-left">
        <span className="inline-flex items-center rounded-full border border-border bg-accent-tint px-3 py-1 text-sm font-medium text-accent-dark">
          Bandesha Empire
        </span>

        <h1 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          White foundation confirmed — near-black text, light-gray surfaces.
        </h1>

        <p className="max-w-md text-lg leading-8 text-muted">
          This is a placeholder while the Header and Hero sections are built.
          The panel below demonstrates the light-gray surface token.
        </p>

        <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 text-left shadow-sm">
          <p className="text-sm font-medium text-foreground">Secondary surface</p>
          <p className="mt-1 text-sm text-muted">
            Very light gray background with a thin border, used for cards and
            secondary sections.
          </p>
        </div>

        <a
          href="#"
          className="text-sm font-medium text-accent transition-colors hover:text-accent-dark"
        >
          Example accent link →
        </a>
      </main>
    </div>
  );
}
