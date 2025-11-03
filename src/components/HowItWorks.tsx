import { useRef } from 'react';
import type { FC, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ClipboardCheck, Users, CheckCircle } from 'lucide-react';
import SmoothReveal from './SmoothReveal';
import ElegantHover from './ElegantHover';

interface Step {
    number: string;
    title: string;
    description: string;
    icon: ReactNode;
}

const HowItWorks: FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        const section = sectionRef.current;
        const steps = stepsRef.current.filter(Boolean) as HTMLElement[];

        if (section && steps.length > 0) {
            // Set initial positions with parallax effect
            gsap.set(steps, { 
                x: -100, 
                opacity: 0,
                rotationY: -15,
                transformPerspective: 1000,
            });

            // Parallax scroll effect
            steps.forEach((step) => {
                gsap.to(step, {
                    x: 50,
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 80%',
                        end: 'top 20%',
                        scrub: 1,
                    },
                });
            });

            // Create timeline sequence
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    end: 'top 50%',
                    toggleActions: 'play none none none',
                },
            });

            // Animate each step sequentially with pause and 3D rotation
            steps.forEach((step, index) => {
                tl.to(step, {
                    x: 0,
                    opacity: 1,
                    rotationY: 0,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                });
                
                // Add pause between steps (except for the last one)
                if (index < steps.length - 1) {
                    tl.to({}, { duration: 0.2 }); // Small pause
                }
            });
        }
    }, { scope: sectionRef });

    const steps: Step[] = [
        {
            number: '1',
            title: 'Request',
            description: 'Tell us what you need. Submit your request with details, photos, and your location.',
            icon: <ClipboardCheck size={40} color="#FFD700" />,
        },
        {
            number: '2',
            title: 'Match',
            description: 'Instant Match. Get notified as verified local freelancers accept your request.',
            icon: <Users size={40} color="#00BFFF" />,
        },
        {
            number: '3',
            title: 'Done',
            description: 'Fix & Pay. The job is done right. Pay securely only upon completion.',
            icon: <CheckCircle size={40} color="#3CB371" />,
        },
    ];

    return (
        <section ref={sectionRef} id="how-it-works" style={{
            padding: '10rem 40px',
            background: '#1A1A1A',
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '5rem',
                }}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 6vw, 5rem)',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        letterSpacing: '-0.04em',
                        marginBottom: '1.5rem',
                        color: '#FFFFFF',
                    }}>
                        How It Works
                    </h2>
                    <p style={{
                        fontSize: '1.125rem',
                        color: '#999999',
                        maxWidth: '700px',
                        margin: '0 auto',
                    }}>
                        Get your service done in three simple steps
                    </p>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3rem',
                    maxWidth: '900px',
                    margin: '0 auto',
                }}>
                    {steps.map((step, index) => (
                        <SmoothReveal key={index} direction="left" delay={index * 0.2}>
                            <div
                                ref={(el) => {
                                    stepsRef.current[index] = el;
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '3rem',
                                }}
                            >
                            <ElegantHover intensity={0.015}>
                                <div 
                                    data-step-number
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '1.5rem',
                                        flexShrink: 0,
                                    }}
                                    onMouseEnter={(e) => {
                                        const numberEl = e.currentTarget.querySelector('[data-number]') as HTMLElement;
                                        const iconEl = e.currentTarget.querySelector('[data-step-icon]') as HTMLElement;
                                        
                                        if (numberEl) {
                                            gsap.to(numberEl, {
                                                scale: 1.1,
                                                background: 'rgba(255, 255, 255, 0.08)',
                                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                                                duration: 0.4,
                                                ease: 'power2.out',
                                            });
                                        }
                                        
                                        if (iconEl) {
                                            gsap.to(iconEl, {
                                                scale: 1.15,
                                                y: -5,
                                                duration: 0.4,
                                                ease: 'power2.out',
                                            });
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        const numberEl = e.currentTarget.querySelector('[data-number]') as HTMLElement;
                                        const iconEl = e.currentTarget.querySelector('[data-step-icon]') as HTMLElement;
                                        
                                        if (numberEl) {
                                            gsap.to(numberEl, {
                                                scale: 1,
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                borderColor: 'rgba(255, 255, 255, 0.1)',
                                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                                                duration: 0.4,
                                                ease: 'power2.out',
                                            });
                                        }
                                        
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
                                <div 
                                    data-number
                                    style={{
                                        fontSize: '4rem',
                                        fontWeight: 800,
                                        color: '#FFFFFF',
                                        lineHeight: 1,
                                        letterSpacing: '-0.02em',
                                        minWidth: '100px',
                                        textAlign: 'center',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        padding: '1rem',
                                        border: '2px solid rgba(255, 255, 255, 0.1)',
                                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {step.number}
                                </div>
                                <div 
                                    data-step-icon
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '80px',
                                        height: '80px',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        borderRadius: '50%',
                                        border: '2px solid rgba(255, 255, 255, 0.1)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {step.icon}
                                </div>
                                </div>
                            </ElegantHover>
                            <div style={{
                                flex: 1,
                                paddingTop: '1rem',
                            }}>
                                <h3 style={{
                                    fontSize: '1.75rem',
                                    fontWeight: 700,
                                    marginBottom: '0.75rem',
                                    color: '#FFFFFF',
                                }}>
                                    {step.title}
                                </h3>
                                <p style={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    lineHeight: 1.8,
                                    fontSize: '1.125rem',
                                }}>
                                    {step.description}
                                </p>
                            </div>
                            </div>
                        </SmoothReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
