import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Clock, DollarSign, Shield, Calendar, Headphones } from 'lucide-react';
import SmoothReveal from './SmoothReveal';
import ElegantHover from './ElegantHover';

interface Benefit {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const Benefits: FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const benefitRefs = useRef<(HTMLDivElement | null)[]>([]);

    const benefits: Benefit[] = [
        {
            title: 'Instant Quotes',
            description: 'Get real-time pricing from multiple verified professionals. Compare rates and choose the best option for your budget and timeline.',
            icon: <Zap size={32} />,
            color: '#FFD700',
        },
        {
            title: 'Same-Day Service',
            description: 'Many services completed on the same day. Book in the morning, get professional service by evening with verified fixers.',
            icon: <Clock size={32} />,
            color: '#00BFFF',
        },
        {
            title: 'Transparent Pricing',
            description: 'No hidden fees or surprises. See the exact cost breakdown before you confirm. All charges are clearly displayed upfront.',
            icon: <DollarSign size={32} />,
            color: '#3CB371',
        },
        {
            title: 'Service Guarantee',
            description: 'All jobs are covered by our comprehensive service guarantee. If something goes wrong, we make it right at no extra cost.',
            icon: <Shield size={32} />,
            color: '#FF6347',
        },
        {
            title: 'Flexible Scheduling',
            description: 'Book services at your convenience. Flexible scheduling that fits your busy lifestyle, with availability around the clock.',
            icon: <Calendar size={32} />,
            color: '#DA70D6',
        },
        {
            title: '24/7 Support',
            description: 'Our dedicated customer support team is always available to help with any questions, concerns, or service requests.',
            icon: <Headphones size={32} />,
            color: '#FFFFFF',
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
            padding: 'clamp(6rem, 15vw, 12rem) clamp(1rem, 5vw, 40px)',
            background: '#1A1A1A',
            position: 'relative',
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: 'clamp(4rem, 10vw, 6rem)',
                }}>
                    <SmoothReveal direction="up" delay={0.1}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 7vw, 4.5rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            letterSpacing: '-0.05em',
                            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                            color: '#FFFFFF',
                            background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.8) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            More Than Just Service
                        </h2>
                    </SmoothReveal>
                    <SmoothReveal direction="up" delay={0.2}>
                        <p style={{
                            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                            color: 'rgba(255, 255, 255, 0.7)',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: 1.8,
                            padding: '0 clamp(1rem, 4vw, 2rem)',
                        }}>
                            Experience the complete SchnellFix advantage with features designed for your convenience and peace of mind
                        </p>
                    </SmoothReveal>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: 'clamp(1.5rem, 4vw, 2.5rem)',
                }}>
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                benefitRefs.current[index] = el;
                            }}
                            style={{
                                padding: 'clamp(2rem, 4vw, 3rem)',
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '24px',
                                backdropFilter: 'blur(10px)',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                                const card = e.currentTarget;
                                const iconEl = card.querySelector('[data-icon]') as HTMLElement;
                                const glowEl = card.querySelector('.card-glow') as HTMLElement;
                                
                                gsap.to(card, {
                                    y: -8,
                                    scale: 1.02,
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    borderColor: `rgba(255, 255, 255, 0.15)`,
                                    boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px ${benefit.color}33`,
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
                            }}
                            onMouseLeave={(e) => {
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
                                    marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
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
                                        fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                                        fontWeight: 700,
                                        marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
                                        color: '#FFFFFF',
                                        letterSpacing: '-0.02em',
                                    }}
                                >
                                    {benefit.title}
                                </h3>
                                <p 
                                    data-description
                                    style={{
                                        color: 'rgba(255, 255, 255, 0.75)',
                                        lineHeight: 1.8,
                                        fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
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

