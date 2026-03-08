import HeroSection from "@/components/landing/HeroSection";
import ExposicionesSection from "@/components/landing/ExposicionesSection";
import SantrasScrollSection from "@/components/landing/SantrasScrollSection";
import LaUnionSection from "@/components/landing/LaUnionSection";
import ArteRitualSection from "@/components/landing/ArteRitualSection";
import OtrasObrasSection from "@/components/landing/OtrasObrasSection";
import AboutSection from "@/components/landing/AboutSection";
import ContactSection from "@/components/landing/ContactSection";

export default function Home() {
    return (
        <main>
            <HeroSection />
            <ExposicionesSection />
            <SantrasScrollSection />
            <LaUnionSection />
            <ArteRitualSection />
            <OtrasObrasSection />
            <AboutSection />
            <ContactSection />
        </main>
    );
}
