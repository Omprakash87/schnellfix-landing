import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Button from './neopop/Button';
import SmoothReveal from './SmoothReveal';
import ElegantHover from './ElegantHover';

const PartnerCTA: FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const bannerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const section = sectionRef.current;
        const banner = bannerRef.current;
        const headline = headlineRef.current;
        const button = buttonRef.current;

        if (section && banner && headline && button) {
            // Set initial positions
            gsap.set(banner, { scaleX: 0.9, opacity: 0 });
            gsap.set(headline, { x: -50, opacity: 0 });
            gsap.set(button, { x: 50, opacity: 0 });

            // Create timeline with slight overlap
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    end: 'top 50%',
                    toggleActions: 'play none none none',
                },
            });

            // Animate banner first
            tl.to(banner, {
                scaleX: 1,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
            });

            // Then animate headline and button together with slight delay
            tl.to([headline, button], {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
            }, '-=0.4'); // Start 0.4s before banner animation ends (overlap)
        }
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} style={{
            padding: 'clamp(4rem, 15vw, 10rem) clamp(1rem, 5vw, 40px)',
            background: '#3A3A3A',
            color: '#FFFFFF',
            textAlign: 'center',
        }}>
            <div ref={bannerRef} style={{
                maxWidth: '1000px',
                margin: '0 auto',
            }}>
                <SmoothReveal direction="up" delay={0.1}>
                    <h2 
                        ref={headlineRef} 
                        onMouseEnter={(e) => {
                            const words = e.currentTarget.querySelectorAll('span');
                            words.forEach((word) => {
                                gsap.to(word, {
                                    y: -5,
                                    textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                                    duration: 0.4,
                                    ease: 'power2.out',
                                });
                            });
                        }}
                        onMouseLeave={(e) => {
                            const words = e.currentTarget.querySelectorAll('span');
                            words.forEach((word) => {
                                gsap.to(word, {
                                    y: 0,
                                    textShadow: 'none',
                                    duration: 0.4,
                                    ease: 'power2.out',
                                });
                            });
                        }}
                        style={{
                            fontSize: 'clamp(1.75rem, 7vw, 4rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.04em',
                            marginBottom: 'clamp(1rem, 3vw, 2rem)',
                            color: '#FFFFFF',
                            cursor: 'default',
                            padding: '0 clamp(1rem, 4vw, 2rem)',
                        }}
                    >
                        <span style={{ display: 'block' }}>Join the Elite</span>
                        <span style={{ display: 'block' }}>Fixers Club.</span>
                        <span style={{ display: 'block' }}>Empower Your Skills.</span>
                    </h2>
                </SmoothReveal>
                <p style={{
                    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.8,
                    marginBottom: 'clamp(2rem, 5vw, 3rem)',
                    maxWidth: '700px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    padding: '0 clamp(1rem, 4vw, 2rem)',
                }}>
                    Join thousands of skilled professionals who trust SchnellFix to connect them with quality service requests.
                </p>
                <SmoothReveal direction="up" delay={0.3}>
                    <ElegantHover intensity={0.02}>
                        <div 
                            ref={buttonRef}
                            data-hover
                            onMouseEnter={(e) => {
                                const button = e.currentTarget.querySelector('button');
                                if (button) {
                                    gsap.to(button, {
                                        scale: 1.05,
                                        y: -5,
                                        duration: 0.4,
                                        ease: 'power2.out',
                                    });
                                }
                            }}
                            onMouseLeave={(e) => {
                                const button = e.currentTarget.querySelector('button');
                                if (button) {
                                    gsap.to(button, {
                                        scale: 1,
                                        y: 0,
                                        duration: 0.4,
                                        ease: 'power2.out',
                                    });
                                }
                            }}
                            style={{ position: 'relative', display: 'inline-block' }}
                        >
                            <Button 
                                kind="elevated"
                                variant="primary"
                                size="big"
                                backgroundColor="#1E90FF"
                                onClick={() => console.log('Become a Partner clicked')}
                            >
                                Become a SchnellFix Partner
                            </Button>
                        </div>
                    </ElegantHover>
                </SmoothReveal>
            </div>
        </section>
    );
};

export default PartnerCTA;
