import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import SystemMapSection from "@/components/SystemMapSection";
import OutcomesSection from "@/components/OutcomesSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import CtaSection from "@/components/CtaSection";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <AboutSection />
        <SystemMapSection />
        <OutcomesSection />
        <CapabilitiesSection />
        <CtaSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
