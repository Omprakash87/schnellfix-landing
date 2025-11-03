import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { CheckCircle2 } from 'lucide-react';
import SmoothReveal from './SmoothReveal';
import ElegantHover from './ElegantHover';

interface Benefit {
    title: string;
    description: string;
}

const Benefits: FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const benefitRefs = useRef<(HTMLDivElement | null)[]>([]);

    const benefits: Benefit[] = [
        {
            title: 'Instant Quotes',
            description: 'Get real-time pricing from multiple verified fixers. Compare rates and choose the best option for your budget.',
        },
        {
            title: 'Same-Day Service',
            description: 'Most services completed on the same day. Book in the morning, get it fixed by evening.',
        },
        {
            title: 'Transparent Pricing',
            description: 'No hidden fees or surprises. See the exact cost breakdown before you confirm any service.',
        },
        {
            title: 'Insurance Coverage',
            description: 'All jobs are covered by our service guarantee. If something goes wrong, we make it right.',
        },
        {
            title: 'Easy Scheduling',
            description: 'Book services at your convenience. Flexible scheduling that fits your busy lifestyle.',
        },
        {
            title: '24/7 Support',
            description: 'Our customer support team is always available to help with any questions or concerns.',
        },
    ];

    useGSAP(() => {
        const section = sectionRef.current;
        const benefitElements = benefitRefs.current.filter(Boolean) as HTMLElement[];

        if (section && benefitElements.length > 0) {
            // Set initial positions with parallax
            gsap.set(benefitElements, {
                x: -100,
                opacity: 0,
                rotationZ: -5,
            });

            // Parallax scroll effect
            benefitElements.forEach((element) => {
                gsap.to(element, {
                    x: 30,
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        end: 'top 20%',
                        scrub: 1,
                    },
                });
            });

            // Staggered reveal animation with rotation
            gsap.to(benefitElements, {
                x: 0,
                opacity: 1,
                rotationZ: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
                stagger: {
                    amount: 1,
                    from: 'start',
                },
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    end: 'top 50%',
                    toggleActions: 'play none none none',
                },
            });

            // Animate check icons
            benefitElements.forEach((element) => {
                const iconEl = element.querySelector('[data-icon]') as HTMLElement;
                if (iconEl) {
                    gsap.from(iconEl, {
                        scale: 0,
                        rotation: -180,
                        duration: 0.6,
                        ease: 'back.out(2)',
                        scrollTrigger: {
                            trigger: element,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                        delay: 0.2,
                    });
                }
            });
        }
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="benefits" style={{
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
                                lineHeight: 1.1,
                                letterSpacing: '-0.05em',
                                marginBottom: '1.5rem',
                                color: '#FFFFFF',
                                cursor: 'default',
                            }}>
                                More Than Just Service
                            </h2>
                        </SmoothReveal>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#999999',
                        maxWidth: '700px',
                        margin: '0 auto',
                        lineHeight: 1.8,
                    }}>
                        Experience the complete SchnellFix advantage with features designed for your convenience
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '2rem',
                }}>
                    {benefits.map((benefit, index) => (
                        <SmoothReveal key={index} direction="left" delay={index * 0.1}>
                            <ElegantHover intensity={0.01}>
                                <div
                                    ref={(el) => {
                                        benefitRefs.current[index] = el;
                                    }}
                                    style={{
                                        display: 'flex',
                                        gap: '1.5rem',
                                        padding: '2rem',
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        borderRadius: '16px',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        const card = e.currentTarget;
                                        const iconEl = card.querySelector('[data-icon]') as HTMLElement;
                                        
                                        gsap.to(card, {
                                            x: 10,
                                            scale: 1.02,
                                            background: 'rgba(255, 255, 255, 0.04)',
                                            borderColor: 'rgba(255, 255, 255, 0.15)',
                                            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                                            duration: 0.4,
                                            ease: 'power2.out',
                                        });
                                        
                                        // Professional icon animation
                                        if (iconEl) {
                                            gsap.to(iconEl, {
                                                scale: 1.15,
                                                y: -3,
                                                duration: 0.4,
                                                ease: 'power2.out',
                                            });
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        const card = e.currentTarget;
                                        const iconEl = card.querySelector('[data-icon]') as HTMLElement;
                                        
                                        gsap.to(card, {
                                            x: 0,
                                            scale: 1,
                                            background: 'rgba(255, 255, 255, 0.02)',
                                            borderColor: 'rgba(255, 255, 255, 0.08)',
                                            boxShadow: 'none',
                                            duration: 0.4,
                                            ease: 'power2.out',
                                        });
                                        
                                        // Reset icon
                                        if (iconEl) {
                                            gsap.to(iconEl, {
                                                scale: 1,
                                                y: 0,
                                                duration: 0.4,
                                                ease: 'power2.out',
                                            });
                                        }
                                    }}
                                >
                            <div data-icon style={{
                                flexShrink: 0,
                                color: '#FFD700',
                                marginTop: '0.25rem',
                            }}>
                                <CheckCircle2 size={32} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 700,
                                    marginBottom: '0.75rem',
                                    color: '#FFFFFF',
                                }}>
                                    {benefit.title}
                                </h3>
                                <p style={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    lineHeight: 1.7,
                                    fontSize: '1rem',
                                }}>
                                    {benefit.description}
                                </p>
                            </div>
                                </div>
                            </ElegantHover>
                        </SmoothReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;

