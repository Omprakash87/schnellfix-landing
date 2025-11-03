import { useRef } from 'react';
import type { FC, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Card from './neopop/Card';
import { Monitor, Zap, Wrench, Lightbulb, Calendar, Brush } from 'lucide-react';
import ElegantHover from './ElegantHover';
import SmoothReveal from './SmoothReveal';
import MagneticField from './MagneticField';
import AdvancedParallax from './AdvancedParallax';

interface Service {
    title: string;
    description: string;
    icon: ReactNode;
    color: string;
}

const ServiceGrid: FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

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
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6), 0 15px 30px rgba(0, 0, 0, 0.5)',
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
                filter: 'drop-shadow(0 0 20px currentColor)',
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
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)',
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
            color: '#FFA500',
        },
        {
            title: 'AC/TV Installation',
            description: 'Professional installation of AC units, smart TVs, home theater systems, and entertainment setups. Proper wiring and setup guaranteed.',
            icon: <Zap size={48} />,
            color: '#00BFFF',
        },
        {
            title: 'Floor & Glass Cleaning',
            description: 'Deep cleaning services for floors, windows, glass surfaces, and interior spaces. Eco-friendly products and professional equipment.',
            icon: <Brush size={48} />,
            color: '#3CB371',
        },
        {
            title: 'Plumbing & Electrical',
            description: 'Licensed professionals for all plumbing and electrical needs. From simple repairs to complete installations, done right the first time.',
            icon: <Wrench size={48} />,
            color: '#FF6347',
        },
        {
            title: 'Home Automation Setup',
            description: 'Transform your home with smart devices, IoT integration, and automated systems. Expert setup and configuration for maximum convenience.',
            icon: <Lightbulb size={48} />,
            color: '#DA70D6',
        },
        {
            title: 'Seasonal Maintenance',
            description: 'Comprehensive seasonal maintenance programs to keep your home or office in perfect condition year-round. Preventive care at its best.',
            icon: <Calendar size={48} />,
            color: '#FFFFFF',
        },
    ];

    return (
        <section ref={sectionRef} id="services" style={{
            padding: '10rem 40px',
            background: '#1A1A1A',
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '6rem',
                }}>
                    <SmoothReveal direction="up" delay={0.1}>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                            fontWeight: 800,
                            lineHeight: 1.05,
                            letterSpacing: '-0.05em',
                            marginBottom: '1.5rem',
                            color: '#FFFFFF',
                            cursor: 'default',
                        }}>
                            <span style={{ display: 'block' }}>all that you</span>
                            <span style={{ display: 'block' }}>deserve. and</span>
                            <span style={{ display: 'block' }}>some more.</span>
                        </h2>
                    </SmoothReveal>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#999999',
                        maxWidth: '700px',
                        margin: '0 auto',
                        lineHeight: 1.8,
                    }}>
                        From device repairs to home installations, we connect you with expert professionals ready to fix it all.
                    </p>
                </div>
                <div ref={cardsRef} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem',
                    width: '100%',
                }}>
                    {services.map((service, index) => (
                        <AdvancedParallax key={index} speed={0.3 + index * 0.1} direction="up">
                            <SmoothReveal direction="up" delay={index * 0.1}>
                                <MagneticField strength={0.2}>
                                    <ElegantHover intensity={0.015}>
                                        <div 
                                            data-card 
                                            onMouseEnter={(e) => {
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
                                                        filter: 'drop-shadow(0 0 20px currentColor)',
                                                        duration: 0.8,
                                                        ease: 'back.out(2)',
                                                    });
                                                }
                                            }}
                                            onMouseLeave={(e) => {
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
                                        marginBottom: '2rem',
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
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    marginBottom: '1rem',
                                    color: '#FFFFFF',
                                }}>
                                    {service.title}
                                </h3>
                                <p style={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    lineHeight: 1.7,
                                    fontSize: '1rem',
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
