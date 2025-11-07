import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Shield, Clock, MapPin, CreditCard, MessageSquare, Award } from 'lucide-react';
import SmoothReveal from './SmoothReveal';
import ElegantHover from './ElegantHover';
import MagneticField from './MagneticField';
import AdvancedParallax from './AdvancedParallax';

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}

const Features: FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const featuresRef = useRef<(HTMLDivElement | null)[]>([]);

    const features: Feature[] = [
        {
            icon: <Shield size={48} />,
            title: 'Verified Professionals',
            description: 'All our fixers are background-checked and verified with certifications and experience records.',
            color: '#2563EB',
        },
        {
            icon: <Clock size={48} />,
            title: '24/7 Availability',
            description: 'Get service anytime, anywhere. Our platform connects you with available fixers around the clock.',
            color: '#06B6D4',
        },
        {
            icon: <MapPin size={48} />,
            title: 'Location-Based Matching',
            description: 'We find the nearest verified fixers to your location for faster service and lower costs.',
            color: '#F59E0B',
        },
        {
            icon: <CreditCard size={48} />,
            title: 'Secure Payments',
            description: 'Pay securely only after service completion. Your payment is held safely until you confirm satisfaction.',
            color: '#60A5FA',
        },
        {
            icon: <MessageSquare size={48} />,
            title: 'Real-Time Tracking',
            description: 'Track your service request in real-time. Get updates on fixer arrival, work progress, and completion.',
            color: '#3B82F6',
        },
        {
            icon: <Award size={48} />,
            title: 'Quality Guarantee',
            description: 'Not satisfied? Get a full refund or free re-service. We stand behind every job completed.',
            color: '#06B6D4',
        },
    ];

    useGSAP(() => {
        const section = sectionRef.current;
        const featureElements = featuresRef.current.filter(Boolean) as HTMLElement[];

        if (section && featureElements.length > 0) {
            // Advanced parallax and magnetic effects for icons
            featureElements.forEach((element) => {
                const iconEl = element.querySelector('[data-icon]') as HTMLElement;
                if (iconEl) {
                    // Scroll-based parallax
                    gsap.to(iconEl, {
                        y: -30,
                        rotation: 10,
                        scale: 1.1,
                        scrollTrigger: {
                            trigger: element,
                            start: 'top 80%',
                            end: 'top 20%',
                            scrub: 1,
                        },
                    });

                    // Mouse-based magnetic effect
                    element.addEventListener('mousemove', (e: MouseEvent) => {
                        const rect = element.getBoundingClientRect();
                        const x = e.clientX - rect.left - rect.width / 2;
                        const y = e.clientY - rect.top - rect.height / 2;

                        gsap.to(iconEl, {
                            x: x * 0.3,
                            y: y * 0.3,
                            rotation: x * 0.2,
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                    });

                    element.addEventListener('mouseleave', () => {
                        gsap.to(iconEl, {
                            x: 0,
                            y: 0,
                            rotation: 0,
                            duration: 0.5,
                            ease: 'power2.out',
                        });
                    });
                }
            });

            // Stagger entrance animation
            gsap.set(featureElements, { y: 80, opacity: 0, scale: 0.9 });

            gsap.to(featureElements, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: 'power3.out',
                stagger: {
                    amount: 0.8,
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

    return (
        <section ref={sectionRef} id="features" style={{
            padding: 'clamp(4rem, 15vw, 10rem) clamp(1rem, 5vw, 40px)',
            background: '#0F172A',
            position: 'relative',
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
                                Why Choose SchnellFix?
                            </h2>
                        </SmoothReveal>
                    <p style={{
                        fontSize: 'clamp(1.125rem, 3.5vw, 1.375rem)',
                        color: 'rgba(255, 255, 255, 0.85)',
                        maxWidth: '750px',
                        margin: '0 auto',
                        lineHeight: 1.9,
                        padding: '0 clamp(1rem, 4vw, 2rem)',
                        fontWeight: 400,
                        letterSpacing: '-0.01em',
                    }}>
                        Experience the future of home and device services with cutting-edge technology and trusted professionals.
                    </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: 'clamp(1.5rem, 4vw, 2.5rem)',
                    }}>
                    {features.map((feature, index) => (
                        <AdvancedParallax key={index} speed={0.2 + index * 0.05} direction="up">
                            <SmoothReveal direction="up" delay={index * 0.1}>
                                <MagneticField strength={0.15}>
                                    <ElegantHover intensity={0.01}>
                                        <div
                                            ref={(el) => {
                                                featuresRef.current[index] = el;
                                            }}
                                            style={{
                                                padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 3vw, 2rem)',
                                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(37, 99, 235, 0.02) 100%)',
                                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                                borderRadius: '20px',
                                                boxShadow: '0 12px 40px rgba(37, 99, 235, 0.15), 0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                                                transition: 'all 0.3s ease',
                                                cursor: 'pointer',
                                                position: 'relative',
                                                overflow: 'hidden',
                                            }}
                                            onMouseEnter={(e) => {
                                                const card = e.currentTarget;
                                                const gradientEl = card.querySelector('.hover-gradient') as HTMLElement;
                                                
                                                // Creative multi-axis animation
                                                gsap.to(card, {
                                                    y: -12,
                                                    scale: 1.03,
                                                    rotationY: 3,
                                                    rotationX: -2,
                                                    boxShadow: '0 30px 60px rgba(37, 99, 235, 0.3), 0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(96, 165, 250, 0.2)',
                                                    borderColor: `rgba(255, 255, 255, 0.2)`,
                                                    duration: 0.5,
                                                    ease: 'power3.out',
                                                });
                                                
                                                // Show subtle gradient overlay
                                                if (gradientEl) {
                                                    gsap.to(gradientEl, {
                                                        opacity: 0.4,
                                                        scale: 1.1,
                                                        duration: 0.4,
                                                    });
                                                }
                                                
                                                // Creative icon animation with rotation
                                                const iconEl = card.querySelector('[data-icon]') as HTMLElement;
                                                if (iconEl) {
                                                    gsap.to(iconEl, {
                                                        scale: 1.15,
                                                        y: -5,
                                                        rotation: 180,
                                                        filter: 'drop-shadow(0 0 15px currentColor)',
                                                        duration: 0.6,
                                                        ease: 'back.out(2)',
                                                    });
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                const card = e.currentTarget;
                                                const gradientEl = card.querySelector('.hover-gradient') as HTMLElement;
                                                
                                                gsap.to(card, {
                                                    y: 0,
                                                    scale: 1,
                                                    rotationY: 0,
                                                    rotationX: 0,
                                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                                    borderColor: 'rgba(255, 255, 255, 0.08)',
                                                    duration: 0.5,
                                                    ease: 'elastic.out(1, 0.3)',
                                                });
                                                
                                                // Hide gradient overlay
                                                if (gradientEl) {
                                                    gsap.to(gradientEl, {
                                                        opacity: 0,
                                                        scale: 1,
                                                        duration: 0.3,
                                                    });
                                                }
                                                
                                                // Reset icon animation
                                                const iconEl = card.querySelector('[data-icon]') as HTMLElement;
                                                if (iconEl) {
                                                    gsap.to(iconEl, {
                                                        scale: 1,
                                                        y: 0,
                                                        rotation: 0,
                                                        filter: 'none',
                                                        duration: 0.5,
                                                        ease: 'elastic.out(1, 0.3)',
                                                    });
                                                }
                                            }}
                                        >
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '4px',
                                background: `linear-gradient(90deg, ${feature.color}, transparent)`,
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                            }} className="hover-gradient" />
                            
                            <div data-icon style={{
                                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                                color: feature.color,
                                display: 'inline-flex',
                                padding: 'clamp(0.75rem, 2vw, 1rem)',
                                background: `${feature.color}1A`,
                                borderRadius: '12px',
                            }}>
                                {feature.icon}
                            </div>
                            <h3 style={{
                                fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)',
                                fontWeight: 800,
                                marginBottom: 'clamp(0.875rem, 2.5vw, 1.25rem)',
                                color: '#FFFFFF',
                                letterSpacing: '-0.01em',
                            }}>
                                {feature.title}
                            </h3>
                            <p style={{
                                color: 'rgba(255, 255, 255, 0.85)',
                                lineHeight: 1.9,
                                fontSize: 'clamp(0.9375rem, 2.25vw, 1.0625rem)',
                                fontWeight: 400,
                            }}>
                                {feature.description}
                            </p>
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

export default Features;

