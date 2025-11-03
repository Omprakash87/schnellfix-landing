import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Button from './neopop/Button';
import ElegantHover from './ElegantHover';
import CreativeTextReveal from './CreativeTextReveal';
import MagneticField from './MagneticField';
import LiquidMorph from './LiquidMorph';
import GlowOrb from './GlowOrb';

const Hero: FC = () => {
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subheadingRef = useRef<HTMLParagraphElement>(null);
    const buttonContainerRef = useRef<HTMLDivElement>(null);

    const gradientRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const headline = headlineRef.current;
        const subheading = subheadingRef.current;
        const buttonContainer = buttonContainerRef.current;
        const gradient = gradientRef.current;

        // Made With GSAP style character-by-character reveal
        if (headline) {
            const words = headline.querySelectorAll('span');
            let totalDelay = 0;
            
            words.forEach((word) => {
                const text = word.textContent || '';
                const chars = text.split('');
                word.innerHTML = '';
                
                chars.forEach((char) => {
                    const span = document.createElement('span');
                    span.style.display = 'inline-block';
                    span.style.overflow = 'hidden';
                    span.style.verticalAlign = 'bottom';
                    
                    // Create inner span for the character (only one copy)
                    const innerSpan = document.createElement('span');
                    innerSpan.textContent = char === ' ' ? '\u00A0' : char;
                    innerSpan.style.display = 'inline-block';
                    innerSpan.style.transform = 'translateY(100%)';
                    innerSpan.style.opacity = '0';
                    
                    span.appendChild(innerSpan);
                    word.appendChild(span);
                    
                    // Animate each character with stagger
                    gsap.to(innerSpan, {
                        y: '0%',
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power3.out',
                        delay: totalDelay * 0.02, // 0.02s delay between each character
                    });
                    
                    totalDelay++;
                });
                
                // Add small delay after each word
                totalDelay += 3;
            });
        }

        if (subheading && buttonContainer) {
            // Set initial positions
            gsap.set([subheading, buttonContainer], { y: 30, opacity: 0 });

            // Stagger animation
            gsap.to([subheading, buttonContainer], {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.2,
                delay: 0.6,
            });
        }

        // Subtle morphing gradient animation
        if (gradient) {
            const gradients = [
                'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)',
                'radial-gradient(circle at 70% 50%, rgba(255, 255, 255, 0.015) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.018) 0%, transparent 50%)',
                'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)',
            ];
            
            const tl = gsap.timeline({ repeat: -1 });
            gradients.forEach((bg) => {
                tl.to(gradient, {
                    background: bg,
                    duration: 8,
                    ease: 'sine.inOut',
                });
            });
        }
    });

    const handleButtonHover = () => {
        if (buttonContainerRef.current) {
            gsap.to(buttonContainerRef.current, {
                scale: 1.05,
                boxShadow: '0 16px 32px rgba(255, 215, 0, 0.4)',
                duration: 0.3,
                ease: 'power2.out',
            });
        }
    };

    const handleButtonLeave = () => {
        if (buttonContainerRef.current) {
            gsap.to(buttonContainerRef.current, {
                scale: 1,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                duration: 0.3,
                ease: 'power2.out',
            });
        }
    };

    const floatingElementsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Subtle floating elements animation
        const floatingElements = floatingElementsRef.current?.children;
        if (floatingElements && floatingElements.length > 0) {
            Array.from(floatingElements).forEach((el, index) => {
                const element = el as HTMLElement;
                
                // Very gentle floating animation
                const floatSpeed = 8 + index * 2;
                const floatAmount = 20 + index * 10;
                
                gsap.to(element, {
                    y: `+=${floatAmount}`,
                    x: `+=${floatAmount * 0.5}`,
                    opacity: 0.5,
                    duration: floatSpeed,
                    ease: 'sine.inOut',
                    yoyo: true,
                    repeat: -1,
                });
            });
        }
    }, { scope: floatingElementsRef });

    return (
        <section id="home" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(80px, 15vh, 120px) clamp(1rem, 5vw, 40px) clamp(40px, 10vh, 80px)',
            background: 'linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 100%)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Professional subtle gradient background */}
            <div ref={gradientRef} style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)',
                pointerEvents: 'none',
                zIndex: 0,
            }} />
            
            {/* Creative liquid morphing blobs - reduced on mobile */}
            <div style={{ display: window.innerWidth > 768 ? 'block' : 'none' }}>
                <LiquidMorph size={500} color="rgba(255, 255, 255, 0.015)" position={{ top: '20%', left: '15%' }} />
                <LiquidMorph size={600} color="rgba(255, 255, 255, 0.012)" position={{ bottom: '25%', right: '20%' }} />
                <LiquidMorph size={400} color="rgba(255, 255, 255, 0.01)" position={{ top: '60%', left: '50%' }} />
                
                {/* Glowing orbs */}
                <GlowOrb x={25} y={30} size={250} />
                <GlowOrb x={75} y={70} size={300} />
                <GlowOrb x={50} y={50} size={200} />
            </div>
            
            {/* Minimal subtle background elements */}
            <div ref={floatingElementsRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '15%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.015) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                }} />
            </div>
            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                textAlign: 'center',
                position: 'relative',
                zIndex: 2,
                width: '100%',
                padding: '0 clamp(1rem, 4vw, 2rem)',
            }}>
                <MagneticField strength={0.2}>
                    <CreativeTextReveal direction="up" delay={0.2}>
                        <h1 
                            ref={headlineRef} 
                            className="animated-headline"
                            onMouseEnter={(e) => {
                                if (typeof window !== 'undefined' && window.innerWidth > 768) {
                                    const words = e.currentTarget.querySelectorAll('span');
                                    words.forEach((word) => {
                                        // Creative text effect with magnetic response
                                        gsap.to(word, {
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            textShadow: '0 0 30px rgba(255, 255, 255, 0.4)',
                                            scale: 1.05,
                                            y: -5,
                                            duration: 0.5,
                                            ease: 'power2.out',
                                        });
                                    });
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (typeof window !== 'undefined' && window.innerWidth > 768) {
                                    const words = e.currentTarget.querySelectorAll('span');
                                    words.forEach((word) => {
                                        gsap.to(word, {
                                            color: '#FFFFFF',
                                            textShadow: 'none',
                                            scale: 1,
                                            y: 0,
                                            duration: 0.5,
                                            ease: 'power2.out',
                                        });
                                    });
                                }
                            }}
                            style={{
                                fontSize: 'clamp(2rem, 10vw, 6rem)',
                                fontWeight: 800,
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em',
                                color: '#FFFFFF',
                                marginBottom: 'clamp(1rem, 3vw, 2rem)',
                                fontFamily: 'Inter, sans-serif',
                                cursor: 'default',
                            }}
                        >
                            <span style={{ display: 'block' }}>Your Fix.</span>
                            <span style={{ display: 'block' }}>On Demand.</span>
                            <span style={{ display: 'block' }}>Done Right.</span>
                        </h1>
                    </CreativeTextReveal>
                </MagneticField>
                <p ref={subheadingRef} style={{
                    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                    color: '#999999',
                    lineHeight: 1.8,
                    maxWidth: '700px',
                    margin: '0 auto clamp(1.5rem, 4vw, 2rem)',
                }}>
                    Seamlessly connect with verified local freelancers for device repair, cleaning, and home installation. Get instant quotes, track your service in real-time, and pay securely only when satisfied.
                </p>
                <div style={{
                    display: 'flex',
                    gap: 'clamp(1rem, 3vw, 2rem)',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    marginBottom: 'clamp(2rem, 6vw, 4rem)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFFFFF', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                        <span style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', fontWeight: 600 }}>✓</span>
                        <span style={{ color: '#CCCCCC' }}>24/7 Availability</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFFFFF', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                        <span style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', fontWeight: 600 }}>✓</span>
                        <span style={{ color: '#CCCCCC' }}>Verified Professionals</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFFFFF', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                        <span style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', fontWeight: 600 }}>✓</span>
                        <span style={{ color: '#CCCCCC' }}>Secure Payment</span>
                    </div>
                </div>
                <ElegantHover intensity={0.02}>
                    <div 
                        ref={buttonContainerRef}
                        data-hover
                        onMouseEnter={handleButtonHover}
                        onMouseLeave={handleButtonLeave}
                        style={{ position: 'relative', display: 'inline-block' }}
                    >
                        <Button 
                            kind="elevated"
                            variant="primary"
                            size="big"
                            backgroundColor="#FFD700"
                            onClick={() => console.log('Request Service clicked')}
                        >
                            Request a Service Now
                        </Button>
                    </div>
                </ElegantHover>
            </div>
        </section>
    );
};

export default Hero;
