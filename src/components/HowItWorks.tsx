import { useRef, useState, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ClipboardCheck, Users, CheckCircle } from 'lucide-react';
import SmoothReveal from './SmoothReveal';
import { isMobile } from '../utils/responsive';

interface Step {
    number: string;
    title: string;
    description: string;
    icon: ReactNode;
    color: string;
}

const HowItWorks: FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
    const connectorsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobileView(isMobile());
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        const section = sectionRef.current;
        const steps = stepsRef.current.filter(Boolean) as HTMLElement[];
        const connectors = connectorsRef.current.filter(Boolean) as HTMLElement[];

        if (section && steps.length > 0) {
            // Set initial positions
            gsap.set(steps, { 
                y: 80,
                opacity: 0,
                scale: 0.9,
            });

            // Animate connectors
            gsap.set(connectors, {
                scaleX: 0,
                opacity: 0,
                transformOrigin: 'left center',
            });

            // Create master timeline for consistent animation
            const masterTL = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    end: 'top 50%',
                    toggleActions: 'play none none none',
                },
            });

            // Animate each step with consistent timing
            steps.forEach((step, index) => {
                const stepTL = gsap.timeline();
                
                // Step card animation
                stepTL.to(step, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                });

                // Animate number badge
                const numberEl = step.querySelector('[data-number-badge]') as HTMLElement;
                if (numberEl) {
                    stepTL.from(numberEl, {
                        scale: 0,
                        rotation: -180,
                        duration: 0.6,
                        ease: 'back.out(2)',
                    }, '-=0.4');
                }

                // Animate icon
                const iconEl = step.querySelector('[data-step-icon]') as HTMLElement;
                if (iconEl) {
                    stepTL.from(iconEl, {
                        scale: 0,
                        rotation: -90,
                        opacity: 0,
                        duration: 0.6,
                        ease: 'back.out(1.7)',
                    }, '-=0.3');
                }

                // Animate connector line
                if (index < connectors.length) {
                    const connector = connectors[index];
                    stepTL.to(connector, {
                        scaleX: 1,
                        opacity: 0.3,
                        duration: 0.5,
                        ease: 'power2.out',
                    }, '-=0.2');
                }

                // Add to master timeline with consistent stagger
                masterTL.add(stepTL, index * 0.2);
            });

            // Parallax scroll effect
            steps.forEach((step) => {
                gsap.to(step, {
                    y: -20,
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 85%',
                        end: 'top 30%',
                        scrub: 1,
                    },
                });
            });
        }
    }, { scope: sectionRef });

    const steps: Step[] = [
        {
            number: '1',
            title: 'Request a Service',
            description: 'Submit your service request with details, photos, and preferred timing. Our platform makes it easy to describe exactly what you need.',
            icon: <ClipboardCheck size={36} />,
            color: '#2563EB',
        },
        {
            number: '2',
            title: 'Get Matched',
            description: 'Instantly receive quotes from verified local professionals. Review profiles, ratings, and pricing to choose the best match for your needs.',
            icon: <Users size={36} />,
            color: '#06B6D4',
        },
        {
            number: '3',
            title: 'Complete & Pay',
            description: 'Track your service in real-time. Pay securely only after completion and satisfaction. Your payment is protected until you confirm the work.',
            icon: <CheckCircle size={36} />,
            color: '#F59E0B',
        },
    ];

    return (
        <section ref={sectionRef} id="how-it-works" style={{
            padding: 'clamp(6rem, 15vw, 12rem) clamp(1rem, 5vw, 40px)',
            background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: 'clamp(4rem, 10vw, 6rem)',
                }}>
                    <SmoothReveal direction="up" delay={0.1}>
                        <h2 style={{
                            fontSize: 'clamp(2.25rem, 8vw, 5rem)',
                            fontWeight: 900,
                            lineHeight: 1.05,
                            letterSpacing: '-0.04em',
                            marginBottom: 'clamp(1.25rem, 3.5vw, 2rem)',
                            background: 'linear-gradient(135deg, #FFFFFF 0%, #60A5FA 50%, #2563EB 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            How It Works
                        </h2>
                    </SmoothReveal>
                    <SmoothReveal direction="up" delay={0.2}>
                        <p style={{
                            fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
                            color: 'rgba(255, 255, 255, 0.85)',
                            maxWidth: '750px',
                            margin: '0 auto',
                            lineHeight: 1.9,
                            fontWeight: 400,
                            letterSpacing: '-0.01em',
                        }}>
                            Three simple steps to get your service completed by verified professionals
                        </p>
                    </SmoothReveal>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(2rem, 5vw, 4rem)',
                    position: 'relative',
                }}>
                    {steps.map((step, index) => (
                        <div key={index} style={{ position: 'relative' }}>
                            <div 
                                ref={(el) => {
                                    stepsRef.current[index] = el;
                                }}
                                className="how-it-works-step"
                                style={{
                                    display: 'flex',
                                    flexDirection: isMobileView ? 'column' : 'row',
                                    alignItems: isMobileView ? 'center' : 'flex-start',
                                    gap: isMobileView ? 'clamp(1.5rem, 4vw, 2rem)' : 'clamp(2rem, 4vw, 3rem)',
                                    padding: 'clamp(1.5rem, 4vw, 3rem)',
                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(37, 99, 235, 0.02) 100%)',
                                    border: '1px solid rgba(255, 255, 255, 0.12)',
                                    borderRadius: '24px',
                                    boxShadow: '0 12px 40px rgba(37, 99, 235, 0.15), 0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                                    backdropFilter: 'blur(10px)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    textAlign: isMobileView ? 'center' : 'left',
                                }}
                                onMouseEnter={(e) => {
                                    if (!isMobileView) {
                                        const card = e.currentTarget;
                                        const numberBadge = card.querySelector('[data-number-badge]') as HTMLElement;
                                        const iconContainer = card.querySelector('[data-step-icon]') as HTMLElement;
                                        
                                        gsap.to(card, {
                                            y: -8,
                                            background: 'rgba(255, 255, 255, 0.04)',
                                            borderColor: `rgba(255, 255, 255, 0.15)`,
                                            boxShadow: `0 25px 50px rgba(37, 99, 235, 0.3), 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 2px ${step.color}50`,
                                            duration: 0.4,
                                            ease: 'power2.out',
                                        });
                                        
                                        if (numberBadge) {
                                            gsap.to(numberBadge, {
                                                scale: 1.1,
                                                boxShadow: `0 8px 24px ${step.color}40`,
                                                duration: 0.4,
                                                ease: 'power2.out',
                                            });
                                        }
                                        
                                        if (iconContainer) {
                                            gsap.to(iconContainer, {
                                                scale: 1.1,
                                                y: -5,
                                                boxShadow: `0 8px 20px ${step.color}30`,
                                                duration: 0.4,
                                                ease: 'power2.out',
                                            });
                                        }
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobileView) {
                                        const card = e.currentTarget;
                                        const numberBadge = card.querySelector('[data-number-badge]') as HTMLElement;
                                        const iconContainer = card.querySelector('[data-step-icon]') as HTMLElement;
                                        
                                        gsap.to(card, {
                                            y: 0,
                                            background: 'rgba(255, 255, 255, 0.02)',
                                            borderColor: 'rgba(255, 255, 255, 0.08)',
                                            boxShadow: 'none',
                                            duration: 0.4,
                                            ease: 'power2.out',
                                        });
                                        
                                        if (numberBadge) {
                                            gsap.to(numberBadge, {
                                                scale: 1,
                                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                                                duration: 0.4,
                                                ease: 'power2.out',
                                            });
                                        }
                                        
                                        if (iconContainer) {
                                            gsap.to(iconContainer, {
                                                scale: 1,
                                                y: 0,
                                                boxShadow: 'none',
                                                duration: 0.4,
                                                ease: 'power2.out',
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
                                        const numberBadge = card.querySelector('[data-number-badge]') as HTMLElement;
                                        const iconContainer = card.querySelector('[data-step-icon]') as HTMLElement;
                                        
                                        gsap.to(card, {
                                            scale: 1,
                                            duration: 0.3,
                                            ease: 'back.out(1.7)',
                                        });
                                        
                                        // Mobile tap animation
                                        if (numberBadge) {
                                            gsap.to(numberBadge, {
                                                scale: 1.15,
                                                rotation: 360,
                                                duration: 0.5,
                                                ease: 'back.out(2)',
                                                yoyo: true,
                                                repeat: 1,
                                            });
                                        }
                                        
                                        if (iconContainer) {
                                            gsap.to(iconContainer, {
                                                scale: 1.2,
                                                rotation: 180,
                                                duration: 0.5,
                                                ease: 'back.out(2)',
                                                yoyo: true,
                                                repeat: 1,
                                            });
                                        }
                                    }
                                }}
                            >
                                {/* Professional number badge */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: isMobileView ? 'row' : 'column',
                                    alignItems: 'center',
                                    justifyContent: isMobileView ? 'center' : 'flex-start',
                                    gap: isMobileView ? 'clamp(1rem, 3vw, 1.5rem)' : 'clamp(1rem, 2vw, 1.5rem)',
                                    flexShrink: 0,
                                    width: isMobileView ? '100%' : 'auto',
                                }}>
                                    <div 
                                        data-number-badge
                                        style={{
                                            width: 'clamp(70px, 12vw, 90px)',
                                            height: 'clamp(70px, 12vw, 90px)',
                                            borderRadius: '50%',
                                            background: `linear-gradient(135deg, ${step.color}15, ${step.color}08)`,
                                            border: `2px solid ${step.color}40`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                                            fontWeight: 800,
                                            color: step.color,
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                                            position: 'relative',
                                        }}
                                    >
                                        {step.number}
                                        <div style={{
                                            position: 'absolute',
                                            inset: '-2px',
                                            borderRadius: '50%',
                                            background: `radial-gradient(circle, ${step.color}20 0%, transparent 70%)`,
                                            opacity: 0,
                                            transition: 'opacity 0.3s ease',
                                        }} className="glow-effect" />
                                    </div>
                                    
                                    {/* Icon container */}
                                    <div 
                                        data-step-icon
                                        style={{
                                            width: 'clamp(60px, 10vw, 70px)',
                                            height: 'clamp(60px, 10vw, 70px)',
                                            borderRadius: '16px',
                                            background: `linear-gradient(135deg, ${step.color}15, ${step.color}08)`,
                                            border: `1px solid ${step.color}30`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: step.color,
                                        }}
                                    >
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div style={{
                                    flex: 1,
                                    paddingTop: isMobileView ? '0' : 'clamp(0.5rem, 1.5vw, 1rem)',
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: isMobileView ? '1.5rem' : '2rem',
                                }}>
                                    <div>
                                        <h3 style={{
                                            fontSize: 'clamp(1.625rem, 4.5vw, 2.25rem)',
                                            fontWeight: 800,
                                            marginBottom: 'clamp(0.875rem, 2.5vw, 1.25rem)',
                                            color: '#FFFFFF',
                                            letterSpacing: '-0.02em',
                                        }}>
                                            {step.title}
                                        </h3>
                                        <p style={{
                                            color: 'rgba(255, 255, 255, 0.85)',
                                            lineHeight: 1.9,
                                            fontSize: 'clamp(1.0625rem, 2.75vw, 1.1875rem)',
                                            maxWidth: '600px',
                                            fontWeight: 400,
                                        }}>
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Connector line between steps - responsive positioning */}
                            {index < steps.length - 1 && (
                                <div
                                    ref={(el) => {
                                        connectorsRef.current[index] = el;
                                    }}
                                    style={{
                                        position: 'absolute',
                                        left: isMobileView ? '50%' : 'clamp(35px, 6vw, 45px)',
                                        top: '100%',
                                        width: isMobileView ? '2px' : '2px',
                                        height: 'clamp(2rem, 5vw, 4rem)',
                                        background: `linear-gradient(180deg, ${steps[index].color}60, ${steps[index + 1].color}60)`,
                                        transform: 'translateX(-50%)',
                                        opacity: 0.3,
                                        display: isMobileView ? 'block' : 'block',
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
