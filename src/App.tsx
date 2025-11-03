import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import ServiceGrid from './components/ServiceGrid';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import PartnerCTA from './components/PartnerCTA';
import Footer from './components/Footer';
import MagneticCursor from './components/MagneticCursor';
import ScrollProgress from './components/ScrollProgress';
import ParallaxBackground from './components/ParallaxBackground';
import ProfessionalParticles from './components/ProfessionalParticles';
import MorphingGradient from './components/MorphingGradient';

function App() {
    return (
        <>
            <MagneticCursor />
            <ScrollProgress />
            <MorphingGradient />
            <ParallaxBackground />
            <ProfessionalParticles />
            <Header />
            <Hero />
            <Stats />
            <ServiceGrid />
            <Features />
            <HowItWorks />
            <Benefits />
            <Testimonials />
            <PartnerCTA />
            <Footer />
        </>
    );
}

export default App;
