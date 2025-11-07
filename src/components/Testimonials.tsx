import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Star, Quote } from 'lucide-react';
import SmoothReveal from './SmoothReveal';
import ElegantHover from './ElegantHover';

interface Testimonial {
    name: string;
    role: string;
    content: string;
    rating: number;
    color: string;
}

const Testimonials: FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);

    const testimonials: Testimonial[] = [
        {
            name: 'Sarah Mitchell',
            role: 'Homeowner',
            content: 'SchnellFix saved my weekend! My AC broke on Friday evening, and within an hour, I had a professional at my door. The service was excellent, and the pricing was transparent.',
            rating: 5,
            color: '#2563EB',
        },
        {
            name: 'Michael Chen',
            role: 'Business Owner',
            content: 'We use SchnellFix for all our office maintenance needs. The platform is intuitive, the fixers are reliable, and we\'ve never had any issues. Highly recommend!',
            rating: 5,
            color: '#06B6D4',
        },
        {
            name: 'Emily Rodriguez',
            role: 'Tech Enthusiast',
            content: 'I\'ve used SchnellFix multiple times for device repairs. Every experience has been smooth, from booking to completion. The real-time tracking feature is a game-changer.',
            rating: 5,
            color: '#F59E0B',
        },
    ];

    useGSAP(() => {
        const section = sectionRef.current;
        const testimonialElements = testimonialRefs.current.filter(Boolean) as HTMLElement[];

        if (section && testimonialElements.length > 0) {
            // Set initial 3D rotation and position
            gsap.set(testimonialElements, {
                rotationY: 15,
                rotationX: -5,
                opacity: 0,
                z: -100,
            });

            // 3D card reveal animation
            gsap.to(testimonialElements, {
                rotationY: 0,
                rotationX: 0,
                opacity: 1,
                z: 0,
                duration: 1.2,
                ease: 'power3.out',
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

            // Advanced 3D parallax with magnetic effect
            testimonialElements.forEach((element, index) => {
                // Scroll-based parallax
                gsap.to(element, {
                    y: -20 - index * 5,
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        end: 'top 30%',
                        scrub: 1,
                    },
                });

                // Mouse-based 3D tilt with enhanced effects
                element.addEventListener('mousemove', (e) => {
                    const rect = element.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -15;
                    const rotateY = ((x - centerX) / centerX) * 15;

                    gsap.to(element, {
                        rotationX: rotateX,
                        rotationY: rotateY,
                        z: 50,
                        scale: 1.03,
                        transformPerspective: 1000,
                        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
                        duration: 0.3,
                        ease: 'power1.out',
                    });

                    // Moving glow effect
                    const glow = element.querySelector('.testimonial-glow') as HTMLElement;
                    if (!glow) {
                        const newGlow = document.createElement('div');
                        newGlow.className = 'testimonial-glow';
                        newGlow.style.cssText = `
                            position: absolute;
                            width: 300px;
                            height: 300px;
                            background: radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%);
                            pointer-events: none;
                            filter: blur(40px);
                            opacity: 0;
                        `;
                        element.appendChild(newGlow);
                    }

                    const glowEl = element.querySelector('.testimonial-glow') as HTMLElement;
                    if (glowEl) {
                        gsap.to(glowEl, {
                            left: x - 150,
                            top: y - 150,
                            opacity: 0.8,
                            duration: 0.3,
                        });
                    }
                });

                element.addEventListener('mouseleave', () => {
                    gsap.to(element, {
                        rotationX: 0,
                        rotationY: 0,
                        z: 0,
                        scale: 1,
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        duration: 0.6,
                        ease: 'back.out(1.7)',
                    });

                    const glow = element.querySelector('.testimonial-glow') as HTMLElement;
                    if (glow) {
                        gsap.to(glow, {
                            opacity: 0,
                            duration: 0.3,
                        });
                    }
                });
            });
        }
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="testimonials" style={{
            padding: '10rem 40px',
            background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
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
                                fontSize: 'clamp(1.75rem, 8vw, 4rem)',
                                fontWeight: 800,
                                lineHeight: 1.1,
                                letterSpacing: '-0.05em',
                                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                                color: '#FFFFFF',
                                cursor: 'default',
                            }}>
                                Loved by Thousands
                            </h2>
                        </SmoothReveal>
                    <p style={{
                        fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                        color: '#999999',
                        maxWidth: '700px',
                        margin: '0 auto',
                        lineHeight: 1.8,
                        padding: '0 clamp(1rem, 4vw, 2rem)',
                    }}>
                        See what our customers have to say about their SchnellFix experience
                    </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: 'clamp(2rem, 5vw, 3rem)',
                        perspective: '1000px',
                    }}>
                    {testimonials.map((testimonial, index) => (
                        <SmoothReveal key={index} direction="up" delay={index * 0.15}>
                            <ElegantHover intensity={0.012}>
                                <div
                                    ref={(el) => {
                                        testimonialRefs.current[index] = el;
                                    }}
                                    style={{
                                        padding: 'clamp(1.5rem, 4vw, 3rem)',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '24px',
                                        position: 'relative',
                                        transformStyle: 'preserve-3d',
                                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={(e) => {
                                        const card = e.currentTarget;
                                        gsap.to(card, {
                                            y: -8,
                                            scale: 1.02,
                                            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
                                            duration: 0.4,
                                            ease: 'power2.out',
                                        });
                                    }}
                                    onMouseLeave={(e) => {
                                        const card = e.currentTarget;
                                        gsap.to(card, {
                                            y: 0,
                                            scale: 1,
                                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                                            duration: 0.4,
                                            ease: 'power2.out',
                                        });
                                    }}
                                >
                            <div style={{
                                position: 'absolute',
                                top: '2rem',
                                right: '2rem',
                                opacity: 0.1,
                            }}>
                                <Quote size={64} color={testimonial.color} />
                            </div>
                            
                            <div style={{
                                display: 'flex',
                                gap: '0.5rem',
                                marginBottom: '1.5rem',
                            }}>
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <Star key={i} size={20} color={testimonial.color} fill={testimonial.color} />
                                ))}
                            </div>

                            <p style={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                lineHeight: 1.8,
                                fontSize: '1.125rem',
                                marginBottom: '2rem',
                                fontStyle: 'italic',
                                position: 'relative',
                                zIndex: 1,
                            }}>
                                "{testimonial.content}"
                            </p>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                paddingTop: '1.5rem',
                                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                            }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}dd)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#FFFFFF',
                                    fontWeight: 700,
                                    fontSize: '1.25rem',
                                }}>
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <div style={{
                                        color: '#FFFFFF',
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        marginBottom: '0.25rem',
                                    }}>
                                        {testimonial.name}
                                    </div>
                                    <div style={{
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        fontSize: '0.875rem',
                                    }}>
                                        {testimonial.role}
                                    </div>
                                </div>
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

export default Testimonials;

