import { useRef, useState, useEffect } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Zap, Clock, DollarSign, Shield, Calendar, Headphones } from 'lucide-react';
import SmoothReveal from './SmoothReveal';
import { isMobile } from '../utils/responsive';

interface Benefit {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const Benefits: FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const benefitRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobileView(isMobile());
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const benefits: Benefit[] = [
        {
            title: 'Instant Quotes',
            description: 'Get real-time pricing from multiple verified professionals. Compare rates and choose the best option for your budget and timeline.',
            icon: <Zap size={32} />,
            color: '#2563EB',
        },
        {
            title: 'Same-Day Service',
            description: 'Many services completed on the same day. Book in the morning, get professional service by evening with verified fixers.',
            icon: <Clock size={32} />,
            color: '#06B6D4',
        },
        {
            title: 'Transparent Pricing',
            description: 'No hidden fees or surprises. See the exact cost breakdown before you confirm. All charges are clearly displayed upfront.',
            icon: <DollarSign size={32} />,
            color: '#60A5FA',
        },
        {
            title: 'Service Guarantee',
            description: 'All jobs are covered by our comprehensive service guarantee. If something goes wrong, we make it right at no extra cost.',
            icon: <Shield size={32} />,
            color: '#F59E0B',
        },
        {
            title: 'Flexible Scheduling',
            description: 'Book services at your convenience. Flexible scheduling that fits your busy lifestyle, with availability around the clock.',
            icon: <Calendar size={32} />,
            color: '#3B82F6',
        },
        {
            title: '24/7 Support',
            description: 'Our dedicated customer support team is always available to help with any questions, concerns, or service requests.',
            icon: <Headphones size={32} />,
            color: '#06B6D4',
        },
    ];

    useGSAP(() => {
        const section = sectionRef.current;
        const benefitElements = benefitRefs.current.filter(Boolean) as HTMLElement[];

        if (section && benefitElements.length > 0) {
            // Set initial positions with consistent values
            gsap.set(benefitElements, {
                y: 60,
                opacity: 0,
                scale: 0.95,
            });

            // Master timeline for consistent animation
            const masterTL = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    end: 'top 50%',
                    toggleActions: 'play none none none',
                },
            });

            // Animate each benefit card with consistent timing
            benefitElements.forEach((element, index) => {
                const cardTL = gsap.timeline();
                
                // Card entrance animation
                cardTL.to(element, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                });

                // Icon animation
                const iconEl = element.querySelector('[data-icon]') as HTMLElement;
                if (iconEl) {
                    cardTL.from(iconEl, {
                        scale: 0,
                        rotation: -180,
                        opacity: 0,
                        duration: 0.6,
                        ease: 'back.out(2)',
                    }, '-=0.4');
                }

                // Title animation
                const titleEl = element.querySelector('[data-title]') as HTMLElement;
                if (titleEl) {
                    cardTL.from(titleEl, {
                        y: 20,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power2.out',
                    }, '-=0.3');
                }

                // Description animation
                const descEl = element.querySelector('[data-description]') as HTMLElement;
                if (descEl) {
                    cardTL.from(descEl, {
                        y: 15,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power2.out',
                    }, '-=0.2');
                }

                // Add to master timeline with consistent stagger
                masterTL.add(cardTL, index * 0.1);
            });

            // Subtle parallax on scroll
            benefitElements.forEach((element) => {
                gsap.to(element, {
                    y: -15,
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        end: 'top 30%',
                        scrub: 1,
                    },
                });
            });
        }
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="benefits" style={{
            padding: isMobileView 
                ? 'clamp(3rem, 8vw, 4rem) clamp(1rem, 4vw, 1.5rem)' 
                : 'clamp(6rem, 15vw, 12rem) clamp(1rem, 5vw, 40px)',
            background: '#0F172A',
            position: 'relative',
            overflow: 'visible',
            minHeight: isMobileView ? 'auto' : '100vh',
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: isMobileView ? 'clamp(2rem, 6vw, 3rem)' : 'clamp(4rem, 10vw, 6rem)',
                    padding: isMobileView ? '0 0.5rem' : '0',
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
                            More Than Just Service
                        </h2>
                    </SmoothReveal>
                    <SmoothReveal direction="up" delay={0.2}>
                        <p style={{
                            fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
                            color: 'rgba(255, 255, 255, 0.85)',
                            maxWidth: '750px',
                            margin: '0 auto',
                            lineHeight: 1.9,
                            padding: '0 clamp(1rem, 4vw, 2rem)',
                            fontWeight: 400,
                            letterSpacing: '-0.01em',
                        }}>
                            Experience the complete SchnellFix advantage with features designed for your convenience and peace of mind
                        </p>
                    </SmoothReveal>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobileView 
                        ? '1fr' 
                        : 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
                    gap: isMobileView ? 'clamp(1rem, 3vw, 1.5rem)' : 'clamp(1.5rem, 4vw, 2.5rem)',
                    padding: isMobileView ? '0 0.25rem' : '0',
                    width: '100%',
                    maxWidth: '100%',
                }}>
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                benefitRefs.current[index] = el;
                            }}
                            style={{
                                padding: isMobileView ? 'clamp(1.5rem, 3vw, 2rem)' : 'clamp(2rem, 4vw, 3rem)',
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(37, 99, 235, 0.02) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: '24px',
                                boxShadow: '0 12px 40px rgba(37, 99, 235, 0.15), 0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                                backdropFilter: 'blur(10px)',
                                position: 'relative',
                                overflow: 'visible',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                width: '100%',
                                maxWidth: '100%',
                            }}
                            onMouseEnter={(e) => {
                                if (!isMobileView) {
                                    const card = e.currentTarget;
                                    const iconEl = card.querySelector('[data-icon]') as HTMLElement;
                                    const glowEl = card.querySelector('.card-glow') as HTMLElement;
                                    
                                    gsap.to(card, {
                                        y: -8,
                                        scale: 1.02,
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        borderColor: `rgba(255, 255, 255, 0.15)`,
                                        boxShadow: `0 25px 50px rgba(37, 99, 235, 0.3), 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 2px ${benefit.color}50`,
                                        duration: 0.4,
                                        ease: 'power2.out',
                                    });
                                    
                                    if (iconEl) {
                                        gsap.to(iconEl, {
                                            scale: 1.15,
                                            y: -5,
                                            rotation: 5,
                                            boxShadow: `0 8px 20px ${benefit.color}40`,
                                            duration: 0.4,
                                            ease: 'power2.out',
                                        });
                                    }
                                    
                                    if (glowEl) {
                                        gsap.to(glowEl, {
                                            opacity: 0.4,
                                            scale: 1.2,
                                            duration: 0.4,
                                        });
                                    }
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isMobileView) {
                                    const card = e.currentTarget;
                                    const iconEl = card.querySelector('[data-icon]') as HTMLElement;
                                    const glowEl = card.querySelector('.card-glow') as HTMLElement;
                                    
                                    gsap.to(card, {
                                        y: 0,
                                        scale: 1,
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        borderColor: 'rgba(255, 255, 255, 0.08)',
                                        boxShadow: 'none',
                                        duration: 0.4,
                                        ease: 'power2.out',
                                    });
                                    
                                    if (iconEl) {
                                        gsap.to(iconEl, {
                                            scale: 1,
                                            y: 0,
                                            rotation: 0,
                                            boxShadow: 'none',
                                            duration: 0.4,
                                            ease: 'power2.out',
                                        });
                                    }
                                    
                                    if (glowEl) {
                                        gsap.to(glowEl, {
                                            opacity: 0,
                                            scale: 1,
                                            duration: 0.4,
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
                                    const iconEl = card.querySelector('[data-icon]') as HTMLElement;
                                    
                                    gsap.to(card, {
                                        scale: 1,
                                        duration: 0.3,
                                        ease: 'back.out(1.7)',
                                    });
                                    
                                    // Mobile tap animation
                                    if (iconEl) {
                                        gsap.to(iconEl, {
                                            scale: 1.2,
                                            rotation: 360,
                                            duration: 0.5,
                                            ease: 'back.out(2)',
                                            yoyo: true,
                                            repeat: 1,
                                        });
                                    }
                                }
                            }}
                        >
                            {/* Subtle glow effect */}
                            <div 
                                className="card-glow"
                                style={{
                                    position: 'absolute',
                                    top: '-50%',
                                    right: '-50%',
                                    width: '200%',
                                    height: '200%',
                                    background: `radial-gradient(circle, ${benefit.color}15 0%, transparent 70%)`,
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease',
                                    pointerEvents: 'none',
                                }}
                            />
                            
                            {/* Icon */}
                            <div 
                                data-icon
                                style={{
                                    width: 'clamp(60px, 10vw, 72px)',
                                    height: 'clamp(60px, 10vw, 72px)',
                                    borderRadius: '18px',
                                    background: `linear-gradient(135deg, ${benefit.color}15, ${benefit.color}08)`,
                                    border: `1px solid ${benefit.color}30`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: benefit.color,
                                    marginBottom: isMobileView ? 'clamp(1rem, 2.5vw, 1.5rem)' : 'clamp(1.5rem, 3vw, 2rem)',
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                            >
                                {benefit.icon}
                            </div>
                            
                            {/* Content */}
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <h3 
                                    data-title
                                    style={{
                                        fontSize: isMobileView ? 'clamp(1.25rem, 3vw, 1.5rem)' : 'clamp(1.375rem, 3.5vw, 1.75rem)',
                                        fontWeight: 800,
                                        marginBottom: isMobileView ? 'clamp(0.75rem, 2vw, 1rem)' : 'clamp(0.875rem, 2.5vw, 1.25rem)',
                                        color: '#FFFFFF',
                                        letterSpacing: '-0.02em',
                                        width: '100%',
                                    }}
                                >
                                    {benefit.title}
                                </h3>
                                <p 
                                    data-description
                                    style={{
                                        color: 'rgba(255, 255, 255, 0.85)',
                                        lineHeight: isMobileView ? 1.8 : 1.9,
                                        fontSize: isMobileView ? 'clamp(0.9375rem, 2vw, 1.0625rem)' : 'clamp(1rem, 2.25vw, 1.125rem)',
                                        fontWeight: 400,
                                        width: '100%',
                                    }}
                                >
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;

