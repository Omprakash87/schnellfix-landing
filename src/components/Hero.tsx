import { useRef, useState, useEffect } from 'react';
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
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth > 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

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
                'radial-gradient(circle at 30% 50%, rgba(37, 99, 235, 0.25) 0%, rgba(6, 182, 212, 0.15) 40%, transparent 70%)',
                'radial-gradient(circle at 70% 50%, rgba(6, 182, 212, 0.2) 0%, rgba(37, 99, 235, 0.15) 40%, transparent 70%)',
                'radial-gradient(circle at 50% 30%, rgba(245, 158, 11, 0.15) 0%, rgba(37, 99, 235, 0.1) 40%, transparent 70%)',
                'radial-gradient(circle at 30% 50%, rgba(37, 99, 235, 0.25) 0%, rgba(6, 182, 212, 0.15) 40%, transparent 70%)',
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
                boxShadow: '0 20px 48px rgba(37, 99, 235, 0.6), 0 0 0 1px rgba(96, 165, 250, 0.3)',
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
            background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 40%, #0F172A 100%)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Professional subtle gradient background */}
            <div ref={gradientRef} style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 30% 50%, rgba(37, 99, 235, 0.25) 0%, rgba(6, 182, 212, 0.15) 40%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0,
            }} />
            
            {/* Creative liquid morphing blobs - desktop only for performance */}
            <div className="desktop-only">
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
                    background: 'radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                }} />
            </div>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
                gap: 'clamp(4rem, 8vw, 8rem)',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2,
                width: '100%',
                padding: '0 clamp(1rem, 4vw, 2rem)',
            }}>
                {/* Left side - Text content */}
                <div style={{
                    textAlign: isDesktop ? 'left' : 'center',
                }}>
                <div style={{ 
                    position: 'relative',
                    zIndex: 10,
                    isolation: 'isolate',
                }}>
                <MagneticField strength={0.15}>
                    <CreativeTextReveal direction="up" delay={0.2}>
                        <h1 
                            ref={headlineRef} 
                            className="animated-headline"
                            onMouseEnter={(e) => {
                                if (typeof window !== 'undefined' && window.innerWidth > 768) {
                                    const words = e.currentTarget.querySelectorAll('span');
                                    words.forEach((word) => {
                                        // Enhanced text effect with glow - using scale only to preserve gradient
                                        gsap.to(word, {
                                            scale: 1.1,
                                            y: -10,
                                            duration: 0.4,
                                            ease: 'power2.out',
                                        });
                                        
                                        // Add glow effect behind text (not affecting text itself)
                                        const wordParent = word.parentElement;
                                        if (wordParent && !wordParent.querySelector('.text-glow')) {
                                            const glow = document.createElement('div');
                                            glow.className = 'text-glow';
                                            glow.style.cssText = `
                                                position: absolute;
                                                top: 50%;
                                                left: 50%;
                                                transform: translate(-50%, -50%);
                                                width: 150%;
                                                height: 150%;
                                                background: radial-gradient(circle, rgba(37, 99, 235, 0.4) 0%, rgba(96, 165, 250, 0.2) 50%, transparent 70%);
                                                filter: blur(40px);
                                                pointer-events: none;
                                                z-index: -1;
                                                opacity: 0;
                                            `;
                                            wordParent.style.position = 'relative';
                                            wordParent.appendChild(glow);
                                            
                                            gsap.to(glow, {
                                                opacity: 0.8,
                                                scale: 1.3,
                                                duration: 0.5,
                                                ease: 'power2.out',
                                            });
                                        }
                                    });
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (typeof window !== 'undefined' && window.innerWidth > 768) {
                                    const words = e.currentTarget.querySelectorAll('span');
                                    words.forEach((word) => {
                                        gsap.to(word, {
                                            scale: 1,
                                            y: 0,
                                            duration: 0.4,
                                            ease: 'power2.out',
                                        });
                                        
                                        // Remove glow effect
                                        const wordParent = word.parentElement;
                                        if (wordParent) {
                                            const glow = wordParent.querySelector('.text-glow');
                                            if (glow) {
                                                gsap.to(glow, {
                                                    opacity: 0,
                                                    scale: 1,
                                                    duration: 0.4,
                                                    onComplete: () => glow.remove(),
                                                });
                                            }
                                        }
                                    });
                                }
                            }}
                            style={{
                                fontSize: 'clamp(2.5rem, 11vw, 6.5rem)',
                                fontWeight: 900,
                                lineHeight: 1.05,
                                letterSpacing: '-0.03em',
                                background: 'linear-gradient(135deg, #FFFFFF 0%, #60A5FA 30%, #2563EB 70%, #06B6D4 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
                                fontFamily: 'Inter, sans-serif',
                                cursor: 'default',
                                textShadow: 'none',
                                willChange: 'transform',
                                WebkitFontSmoothing: 'antialiased',
                                MozOsxFontSmoothing: 'grayscale',
                                backfaceVisibility: 'hidden',
                                transform: 'translateZ(0)',
                            }}
                        >
                            <span style={{ display: 'block' }}>Your Fix.</span>
                            <span style={{ display: 'block' }}>On Demand.</span>
                            <span style={{ display: 'block' }}>Done Right.</span>
                        </h1>
                    </CreativeTextReveal>
                </MagneticField>
                </div>
                <p ref={subheadingRef} style={{
                    fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.8,
                    maxWidth: '800px',
                    margin: isDesktop ? '0 0 clamp(2rem, 5vw, 3rem)' : '0 auto clamp(2rem, 5vw, 3rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    textAlign: isDesktop ? 'left' : 'center',
                }}>
                    Seamlessly connect with <strong style={{ color: '#60A5FA', fontWeight: 600 }}>verified local freelancers</strong> for device repair, cleaning, and home installation. Get <strong style={{ color: '#06B6D4', fontWeight: 600 }}>instant quotes</strong>, track your service in <strong style={{ color: '#F59E0B', fontWeight: 600 }}>real-time</strong>, and pay securely only when satisfied.
                </p>
                <div style={{
                    display: 'flex',
                    gap: 'clamp(1rem, 3vw, 1.5rem)',
                    justifyContent: isDesktop ? 'flex-start' : 'center',
                    flexWrap: 'wrap',
                    marginBottom: 'clamp(2.5rem, 6vw, 4rem)',
                }}>
                    {[
                        { icon: '✓', text: '24/7 Availability', color: '#60A5FA', bg: 'rgba(37, 99, 235, 0.2)', border: 'rgba(37, 99, 235, 0.4)' },
                        { icon: '✓', text: 'Verified Professionals', color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.2)', border: 'rgba(6, 182, 212, 0.4)' },
                        { icon: '✓', text: 'Secure Payment', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.2)', border: 'rgba(245, 158, 11, 0.4)' },
                    ].map((badge, index) => (
                        <ElegantHover key={index} intensity={0.02}>
                            <div 
                                style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.875rem', 
                                    color: '#FFFFFF', 
                                    fontSize: 'clamp(0.9375rem, 2.5vw, 1.0625rem)',
                                    padding: 'clamp(1rem, 2.5vw, 1.25rem) clamp(1.5rem, 4vw, 2rem)',
                                    background: `linear-gradient(135deg, ${badge.bg} 0%, rgba(37, 99, 235, 0.1) 100%)`,
                                    borderRadius: '16px',
                                    border: `1px solid ${badge.border}`,
                                    backdropFilter: 'blur(12px)',
                                    boxShadow: `0 6px 20px ${badge.bg}, inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
                                    cursor: 'default',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                                onMouseEnter={(e) => {
                                    if (typeof window !== 'undefined' && window.innerWidth > 768) {
                                        gsap.to(e.currentTarget, {
                                            scale: 1.05,
                                            y: -4,
                                            boxShadow: `0 12px 32px ${badge.bg}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                                            duration: 0.3,
                                            ease: 'power2.out',
                                        });
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (typeof window !== 'undefined' && window.innerWidth > 768) {
                                        gsap.to(e.currentTarget, {
                                            scale: 1,
                                            y: 0,
                                            boxShadow: `0 6px 20px ${badge.bg}, inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
                                            duration: 0.3,
                                            ease: 'power2.out',
                                        });
                                    }
                                }}
                            >
                                <span style={{ 
                                    fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)', 
                                    fontWeight: 700, 
                                    color: badge.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '24px',
                                    height: '24px',
                                    background: `rgba(255, 255, 255, 0.1)`,
                                    borderRadius: '50%',
                                    flexShrink: 0,
                                }}>{badge.icon}</span>
                                <span style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: 600, letterSpacing: '-0.01em' }}>{badge.text}</span>
                            </div>
                        </ElegantHover>
                    ))}
                </div>
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: isDesktop ? 'flex-start' : 'center',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                }}>
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
                                backgroundColor="#2563EB"
                                onClick={() => console.log('Request Service clicked')}
                            >
                                Request a Service Now
                            </Button>
                        </div>
                    </ElegantHover>
                    <ElegantHover intensity={0.015}>
                        <button
                            onClick={() => console.log('Learn More clicked')}
                            style={{
                                padding: 'clamp(1rem, 2.5vw, 1.25rem) clamp(1.75rem, 4vw, 2.5rem)',
                                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                                fontWeight: 600,
                                color: '#FFFFFF',
                                background: 'transparent',
                                border: '2px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                backdropFilter: 'blur(10px)',
                                letterSpacing: '-0.01em',
                            }}
                            onMouseEnter={(e) => {
                                if (typeof window !== 'undefined' && window.innerWidth > 768) {
                                    gsap.to(e.currentTarget, {
                                        borderColor: 'rgba(96, 165, 250, 0.5)',
                                        background: 'rgba(37, 99, 235, 0.1)',
                                        scale: 1.05,
                                        duration: 0.3,
                                        ease: 'power2.out',
                                    });
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (typeof window !== 'undefined' && window.innerWidth > 768) {
                                    gsap.to(e.currentTarget, {
                                        borderColor: 'rgba(255, 255, 255, 0.2)',
                                        background: 'transparent',
                                        scale: 1,
                                        duration: 0.3,
                                        ease: 'power2.out',
                                    });
                                }
                            }}
                        >
                            Learn More
                        </button>
                    </ElegantHover>
                </div>
                </div>

                {/* Right side - Hero Image */}
                <div style={{
                    position: 'relative',
                    display: isDesktop ? 'block' : 'none',
                }}>
                    <div style={{
                        position: 'relative',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 25px 70px rgba(37, 99, 235, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transform: 'perspective(1000px) rotateY(-8deg) rotateX(2deg)',
                        transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => {
                        if (isDesktop) {
                            gsap.to(e.currentTarget, {
                                transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.05)',
                                boxShadow: '0 35px 90px rgba(37, 99, 235, 0.5), 0 0 0 2px rgba(96, 165, 250, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                                duration: 0.6,
                                ease: 'power3.out',
                            });
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (isDesktop) {
                            gsap.to(e.currentTarget, {
                                transform: 'perspective(1000px) rotateY(-8deg) rotateX(2deg) scale(1)',
                                boxShadow: '0 25px 70px rgba(37, 99, 235, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                                duration: 0.6,
                                ease: 'power3.out',
                            });
                        }
                    }}
                    >
                        <img 
                            src="/service-delivery.jpg" 
                            alt="SchnellFix service provider delivering service to customer"
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                objectFit: 'cover',
                            }}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.3) 0%, transparent 30%, transparent 70%, rgba(15, 23, 42, 0.4) 100%)',
                            pointerEvents: 'none',
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: '2rem',
                            left: '2rem',
                            right: '2rem',
                            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(37, 99, 235, 0.15) 100%)',
                            backdropFilter: 'blur(20px)',
                            padding: '1.75rem',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.25rem',
                            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                        }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.3) 0%, rgba(96, 165, 250, 0.2) 100%)',
                                border: '2px solid rgba(37, 99, 235, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#60A5FA',
                                fontWeight: 700,
                                fontSize: '1.75rem',
                                flexShrink: 0,
                                boxShadow: '0 4px 16px rgba(37, 99, 235, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                            }}>
                                ✓
                            </div>
                            <div>
                                <div style={{
                                    color: '#FFFFFF',
                                    fontWeight: 700,
                                    fontSize: '1.25rem',
                                    marginBottom: '0.5rem',
                                    letterSpacing: '-0.02em',
                                }}>
                                    Trusted Service Delivery
                                </div>
                                <div style={{
                                    color: 'rgba(255, 255, 255, 0.85)',
                                    fontSize: '1rem',
                                    lineHeight: 1.6,
                                    letterSpacing: '-0.01em',
                                }}>
                                    Professional service providers at your doorstep
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Image - shown only on mobile */}
                <div style={{
                    position: 'relative',
                    display: isDesktop ? 'none' : 'block',
                    marginTop: '3rem',
                }}>
                    <div style={{
                        position: 'relative',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}>
                        <img 
                            src="/service-delivery.jpg" 
                            alt="SchnellFix service provider delivering service to customer"
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                objectFit: 'cover',
                            }}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.9) 100%)',
                            padding: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'rgba(37, 99, 235, 0.2)',
                                border: '2px solid rgba(37, 99, 235, 0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#60A5FA',
                                fontWeight: 700,
                                fontSize: '1.25rem',
                            }}>
                                ✓
                            </div>
                            <div>
                                <div style={{
                                    color: '#FFFFFF',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    marginBottom: '0.25rem',
                                }}>
                                    Trusted Service Delivery
                                </div>
                                <div style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    fontSize: '0.875rem',
                                }}>
                                    Professional service providers
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
