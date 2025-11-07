import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import SmoothReveal from './SmoothReveal';
import ElegantHover from './ElegantHover';

interface Stat {
    value: string;
    label: string;
    suffix: string;
}

const Stats: FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const statRefs = useRef<(HTMLDivElement | null)[]>([]);

    const stats: Stat[] = [
        { value: '50', suffix: 'K+', label: 'Happy Customers' },
        { value: '10', suffix: 'K+', label: 'Verified Fixers' },
        { value: '98', suffix: '%', label: 'Satisfaction Rate' },
        { value: '15', suffix: 'min', label: 'Avg Response Time' },
    ];

    useGSAP(() => {
        const section = sectionRef.current;
        const statElements = statRefs.current.filter(Boolean) as HTMLElement[];

        if (section && statElements.length > 0) {
            // Set initial positions with 3D rotation
            gsap.set(statElements, { 
                y: 80, 
                opacity: 0, 
                scale: 0.5,
                rotationY: -90,
                transformPerspective: 1000,
            });

            // Parallax scroll effect
            statElements.forEach((element, index) => {
                gsap.to(element, {
                    y: -20 - index * 5,
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        end: 'top 30%',
                        scrub: 1,
                    },
                });
            });

            // ScrollTrigger animation with 3D flip-in and stagger
            gsap.to(statElements, {
                y: 0,
                opacity: 1,
                scale: 1,
                rotationY: 0,
                duration: 1.2,
                ease: 'back.out(1.7)',
                stagger: {
                    amount: 0.8,
                    from: 'center',
                },
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 60%',
                    toggleActions: 'play none none none',
                },
            });

            // Animate numbers counting up
            statElements.forEach((element, index) => {
                const stat = stats[index];
                const valueEl = element.querySelector('[data-value]') as HTMLElement;
                if (valueEl && stat) {
                    const targetValue = parseInt(stat.value);
                    if (!isNaN(targetValue)) {
                        const obj = { value: 0 };
                        gsap.to(obj, {
                            value: targetValue,
                            duration: 2,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: element,
                                start: 'top 80%',
                                toggleActions: 'play none none none',
                            },
                            onUpdate: () => {
                                valueEl.textContent = Math.floor(obj.value).toString();
                            },
                        });
                    }
                }
            });
        }
    }, { scope: sectionRef });

    const gradientBgRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const gradientBg = gradientBgRef.current;
        if (gradientBg) {
            // Morphing gradient animation
            const gradients = [
                'radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.2) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)',
                'radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.2) 0%, rgba(245, 158, 11, 0.1) 50%, transparent 100%)',
                'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.2) 0%, rgba(37, 99, 235, 0.1) 50%, transparent 100%)',
                'radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.2) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)',
            ];
            
            const tl = gsap.timeline({ repeat: -1 });
            gradients.forEach((bg) => {
                tl.to(gradientBg, {
                    background: bg,
                    duration: 2,
                    ease: 'sine.inOut',
                });
            });
        }
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} style={{
            padding: '8rem 40px',
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Morphing gradient background */}
            <div 
                ref={gradientBgRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.2) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }} />
            
            {/* Animated floating background elements */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 0,
            }} />
            
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1,
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'clamp(2rem, 5vw, 4rem)',
                    textAlign: 'center',
                }}>
                    {stats.map((stat, index) => (
                        <SmoothReveal key={index} direction="up" delay={index * 0.1}>
                            <ElegantHover intensity={0.01}>
                                <div
                                    ref={(el) => {
                                        statRefs.current[index] = el;
                                    }}
                                    style={{
                                        padding: 'clamp(1.5rem, 3vw, 2rem)',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '16px',
                                        backdropFilter: 'blur(10px)',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                    onMouseEnter={(e) => {
                                        const card = e.currentTarget;
                                        const valueEl = card.querySelector('[data-value]') as HTMLElement;
                                        
                                        gsap.to(card, {
                                            scale: 1.05,
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            borderColor: 'rgba(255, 255, 255, 0.2)',
                                            boxShadow: '0 25px 50px rgba(37, 99, 235, 0.3), 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(96, 165, 250, 0.2)',
                                            duration: 0.4,
                                            ease: 'power2.out',
                                        });
                                        
                                        if (valueEl) {
                                            gsap.to(valueEl, {
                                                scale: 1.1,
                                                duration: 0.4,
                                                ease: 'power2.out',
                                            });
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        const card = e.currentTarget;
                                        const valueEl = card.querySelector('[data-value]') as HTMLElement;
                                        
                                        gsap.to(card, {
                                            scale: 1,
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            borderColor: 'rgba(255, 255, 255, 0.1)',
                                            boxShadow: 'none',
                                            duration: 0.4,
                                            ease: 'power2.out',
                                        });
                                        
                                        if (valueEl) {
                                            gsap.to(valueEl, {
                                                scale: 1,
                                                duration: 0.4,
                                                ease: 'power2.out',
                                            });
                                        }
                                    }}
                                >
                            <div style={{
                                fontSize: 'clamp(2rem, 6vw, 4rem)',
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 50%, #06B6D4 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                filter: 'drop-shadow(0 0 20px rgba(37, 99, 235, 0.5))',
                                lineHeight: 1,
                                marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
                                display: 'flex',
                                alignItems: 'baseline',
                                justifyContent: 'center',
                                gap: '0.25rem',
                            }}>
                                <span data-value>{stat.value}</span>
                                <span style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', color: '#FFFFFF' }}>{stat.suffix}</span>
                            </div>
                            <div style={{
                                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontWeight: 600,
                            }}>
                                {stat.label}
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

export default Stats;

