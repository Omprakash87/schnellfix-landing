import { useRef, useState, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Card from './neopop/Card';
import { Monitor, Zap, Wrench, Lightbulb, Calendar, Brush } from 'lucide-react';
import ElegantHover from './ElegantHover';
import SmoothReveal from './SmoothReveal';
import MagneticField from './MagneticField';
import AdvancedParallax from './AdvancedParallax';
import { isMobile } from '../utils/responsive';

interface Service {
    title: string;
    description: string;
    icon: ReactNode;
    color: string;
}

const ServiceGrid: FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobileView(isMobile());
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        const section = sectionRef.current;
        const cards = cardsRef.current;

        if (section && cards) {
            const cardElements = cards.querySelectorAll('[data-card]');

            // Set initial positions with 3D rotation
            gsap.set(cardElements, { 
                y: 50, 
                opacity: 0,
                rotationY: -20,
                rotationX: 10,
                transformPerspective: 1000,
            });

            // ScrollTrigger animation with 3D flip-in
            gsap.to(cardElements, {
                y: 0,
                opacity: 1,
                rotationY: 0,
                rotationX: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
                stagger: {
                    amount: 0.6,
                    from: 'start',
                },
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    end: 'top 50%',
                    toggleActions: 'play none none none',
                },
            });
        }
    }, { scope: sectionRef });

    const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const iconEl = card.querySelector('[data-icon]') as HTMLElement;
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Card elevation with magnetic effect
        gsap.to(card, {
            y: -15,
            scale: 1.05,
            rotationX: (mouseY - rect.height / 2) / 20,
            rotationY: (mouseX - rect.width / 2) / 20,
            boxShadow: '0 30px 60px rgba(37, 99, 235, 0.4), 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 2px rgba(96, 165, 250, 0.3)',
            duration: 0.5,
            ease: 'power2.out',
        });
        
        // Icon magnetic bounce with color pulse
        if (iconEl) {
            gsap.to(iconEl, {
                scale: 1.3,
                rotation: 360,
                y: -10,
                duration: 0.7,
                ease: 'back.out(2)',
            });
            
            // Pulse color effect
            gsap.to(iconEl, {
                filter: 'drop-shadow(0 0 25px currentColor) drop-shadow(0 0 40px currentColor)',
                duration: 0.3,
            });
        }
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
            left: ${mouseX}px;
            top: ${mouseY}px;
            transform: translate(-50%, -50%);
            pointer-events: none;
        `;
        card.style.position = 'relative';
        card.appendChild(ripple);
        
        gsap.to(ripple, {
            width: '200px',
            height: '200px',
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => ripple.remove(),
        });
    };

    const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const iconEl = card.querySelector('[data-icon]') as HTMLElement;
        
        // Card reset with smooth spring
        gsap.to(card, {
            y: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            boxShadow: '0 12px 24px rgba(37, 99, 235, 0.2), 0 8px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            duration: 0.5,
            ease: 'back.out(1.7)',
        });
        
        // Icon reset with bounce
        if (iconEl) {
            gsap.to(iconEl, {
                scale: 1,
                rotation: 0,
                y: 0,
                filter: 'none',
                duration: 0.5,
                ease: 'back.out(1.7)',
            });
        }
    };

    const services: Service[] = [
        {
            title: 'Device Repair',
            description: 'Expert repairs for smartphones, laptops, tablets, gaming consoles, and all electronics. Fast turnaround with warranty-backed service.',
            icon: <Monitor size={48} />,
            color: '#2563EB',
        },
        {
            title: 'AC/TV Installation',
            description: 'Professional installation of AC units, smart TVs, home theater systems, and entertainment setups. Proper wiring and setup guaranteed.',
            icon: <Zap size={48} />,
            color: '#06B6D4',
        },
        {
            title: 'Floor & Glass Cleaning',
            description: 'Deep cleaning services for floors, windows, glass surfaces, and interior spaces. Eco-friendly products and professional equipment.',
            icon: <Brush size={48} />,
            color: '#60A5FA',
        },
        {
            title: 'Plumbing & Electrical',
            description: 'Licensed professionals for all plumbing and electrical needs. From simple repairs to complete installations, done right the first time.',
            icon: <Wrench size={48} />,
            color: '#F59E0B',
        },
        {
            title: 'Home Automation Setup',
            description: 'Transform your home with smart devices, IoT integration, and automated systems. Expert setup and configuration for maximum convenience.',
            icon: <Lightbulb size={48} />,
            color: '#3B82F6',
        },
        {
            title: 'Seasonal Maintenance',
            description: 'Comprehensive seasonal maintenance programs to keep your home or office in perfect condition year-round. Preventive care at its best.',
            icon: <Calendar size={48} />,
            color: '#06B6D4',
        },
    ];

    return (
        <section ref={sectionRef} id="services" style={{
            padding: 'clamp(4rem, 15vw, 10rem) clamp(1rem, 5vw, 40px)',
            background: '#0F172A',
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: 'clamp(3rem, 8vw, 6rem)',
                }}>
                    <SmoothReveal direction="up" delay={0.1}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 9vw, 4.5rem)',
                            fontWeight: 900,
                            lineHeight: 1.05,
                            letterSpacing: '-0.04em',
                            marginBottom: 'clamp(1.25rem, 3.5vw, 2rem)',
                            background: 'linear-gradient(135deg, #FFFFFF 0%, #60A5FA 50%, #2563EB 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            cursor: 'default',
                        }}>
                            <span style={{ display: 'block' }}>all that you</span>
                            <span style={{ display: 'block' }}>deserve. and</span>
                            <span style={{ display: 'block' }}>some more.</span>
                        </h2>
                    </SmoothReveal>
                    <p style={{
                        fontSize: 'clamp(1.125rem, 3.5vw, 1.375rem)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        maxWidth: '750px',
                        margin: '0 auto',
                        lineHeight: 1.9,
                        padding: '0 clamp(1rem, 4vw, 2rem)',
                        fontWeight: 400,
                        letterSpacing: '-0.01em',
                    }}>
                        From device repairs to home installations, we connect you with expert professionals ready to fix it all.
                    </p>
                </div>
                <div ref={cardsRef} style={{
                    display: 'grid',
                    gridTemplateColumns: isMobileView 
                        ? '1fr' 
                        : 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
                    gap: isMobileView ? 'clamp(1.5rem, 4vw, 2rem)' : 'clamp(1.5rem, 4vw, 2rem)',
                    marginBottom: '4rem',
                    width: '100%',
                    padding: isMobileView ? '0 0.5rem' : '0',
                }}>
                    {services.map((service, index) => (
                        <AdvancedParallax key={index} speed={0.3 + index * 0.1} direction="up">
                            <SmoothReveal direction="up" delay={index * 0.1}>
                                <MagneticField strength={0.2}>
                                    <ElegantHover intensity={0.015}>
                                        <div 
                                            data-card 
                                            onMouseEnter={(e) => {
                                                if (!isMobileView) {
                                                    handleCardHover(e);
                                                    const card = e.currentTarget;
                                                    
                                                    // Creative multi-layer animation
                                                    gsap.to(card, {
                                                        scale: 1.05,
                                                        y: -10,
                                                        z: 50,
                                                        rotationY: 5,
                                                        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
                                                        duration: 0.6,
                                                        ease: 'power3.out',
                                                    });
                                                    
                                                    // Icon creative animation
                                                    const icon = card.querySelector('[data-icon]') as HTMLElement;
                                                    if (icon) {
                                                        gsap.to(icon, {
                                                            scale: 1.2,
                                                            rotation: 360,
                                                            y: -8,
                                                            filter: 'drop-shadow(0 0 25px currentColor) drop-shadow(0 0 40px currentColor)',
                                                            duration: 0.8,
                                                            ease: 'back.out(2)',
                                                        });
                                                    }
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isMobileView) {
                                                    handleCardLeave(e);
                                                    const card = e.currentTarget;
                                                    
                                                    gsap.to(card, {
                                                        scale: 1,
                                                        y: 0,
                                                        z: 0,
                                                        rotationY: 0,
                                                        boxShadow: 'none',
                                                        duration: 0.6,
                                                        ease: 'elastic.out(1, 0.3)',
                                                    });
                                                    
                                                    const icon = card.querySelector('[data-icon]') as HTMLElement;
                                                    if (icon) {
                                                        gsap.to(icon, {
                                                            scale: 1,
                                                            rotation: 0,
                                                            y: 0,
                                                            filter: 'none',
                                                            duration: 0.6,
                                                            ease: 'elastic.out(1, 0.3)',
                                                        });
                                                    }
                                                }
                                            }}
                                            onTouchStart={(e) => {
                                                if (isMobileView) {
                                                    const card = e.currentTarget;
                                                    gsap.to(card, {
                                                        scale: 0.98,
                                                        duration: 0.2,
                                                        ease: 'power2.out',
                                                    });
                                                }
                                            }}
                                            onTouchEnd={(e) => {
                                                if (isMobileView) {
                                                    const card = e.currentTarget;
                                                    gsap.to(card, {
                                                        scale: 1,
                                                        duration: 0.3,
                                                        ease: 'back.out(1.7)',
                                                    });
                                                    
                                                    // Mobile tap animation
                                                    const icon = card.querySelector('[data-icon]') as HTMLElement;
                                                    if (icon) {
                                                        gsap.to(icon, {
                                                            scale: 1.15,
                                                            rotation: 180,
                                                            duration: 0.4,
                                                            ease: 'back.out(2)',
                                                            yoyo: true,
                                                            repeat: 1,
                                                        });
                                                    }
                                                }
                                            }}
                                            style={{
                                                transformStyle: 'preserve-3d',
                                                perspective: '1000px',
                                            }}
                                        >
                            <Card>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}>
                                <div 
                                    data-icon
                                    style={{
                                        marginBottom: 'clamp(1rem, 3vw, 2rem)',
                                        color: service.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {service.icon}
                                </div>
                                <h3 style={{
                                    fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)',
                                    fontWeight: 800,
                                    marginBottom: 'clamp(0.875rem, 2.5vw, 1.25rem)',
                                    color: '#FFFFFF',
                                    letterSpacing: '-0.01em',
                                }}>
                                    {service.title}
                                </h3>
                                <p style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    lineHeight: 1.8,
                                    fontSize: 'clamp(0.9375rem, 2.25vw, 1.0625rem)',
                                    fontWeight: 400,
                                }}>
                                    {service.description}
                                </p>
                            </div>
                            </Card>
                                        </div>
                                    </ElegantHover>
                                </MagneticField>
                            </SmoothReveal>
                        </AdvancedParallax>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceGrid;
