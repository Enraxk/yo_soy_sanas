import HeroSection from "@/components/landing/HeroSection";
import ExposicionesSection from "@/components/landing/ExposicionesSection";
import SantrasScrollSection from "@/components/landing/SantrasScrollSection";
import ArteRitualSection from "@/components/landing/ArteRitualSection";
import AboutSection from "@/components/landing/AboutSection";
import ContactSection from "@/components/landing/ContactSection";

export default function Home() {
    return (
        <main>
            <HeroSection />
            <ExposicionesSection />
            <SantrasScrollSection />
            <ArteRitualSection />
            <AboutSection />
            <ContactSection />
        </main>
    );
}
