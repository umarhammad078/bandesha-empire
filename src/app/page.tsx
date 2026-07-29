import HeroSection from "@/components/HeroSection";
import HeroStackTicker from "@/components/HeroStackTicker";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import SystemMapSection from "@/components/SystemMapSection";
import PostSliderSection from "@/components/PostSliderSection";
import OutcomesSection from "@/components/OutcomesSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import CtaSection from "@/components/CtaSection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <HeroSection />
        <HeroStackTicker />
        <ServicesSection />
        <PostSliderSection />
        <ProcessSection />
        <AboutSection />
        <SystemMapSection />
        <OutcomesSection />
        <CapabilitiesSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
