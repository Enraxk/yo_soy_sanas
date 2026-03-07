import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AnimatedTiles from "@/components/landing/AnimatedTiles";
import PortfolioGrid from "@/components/landing/PortfolioGrid";
import AboutSection from "@/components/landing/AboutSection";
import ContactSection from "@/components/landing/ContactSection";
import "../animated-sections.css";

export default function Home() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <AnimatedTiles />
            <PortfolioGrid />
            <AboutSection />
            <ContactSection />
        </>
    );
}
