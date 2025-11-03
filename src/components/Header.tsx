import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Button from './neopop/Button';
import ElegantHover from './ElegantHover';

const Header: FC = () => {
    const logoRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const logo = logoRef.current;
        const button = buttonRef.current;
        const header = document.querySelector('header');

        if (logo && button) {
            // Set initial positions
            gsap.set([logo, button], { y: -30, opacity: 0 });

            // Animate to final positions
            gsap.to([logo, button], {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.15,
            });
        }

        // Professional header scroll effect
        if (header) {
            gsap.to(header, {
                background: 'rgba(26, 26, 26, 0.98)',
                backdropFilter: 'blur(20px)',
                scrollTrigger: {
                    trigger: header,
                    start: 'top -100',
                    end: 'top 0',
                    scrub: true,
                },
            });
        }
    });

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            background: 'rgba(26, 26, 26, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            zIndex: 1000,
            padding: '1.5rem 0',
        }}>
            <nav style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
            }}>
                    <ElegantHover intensity={0.02}>
                        <div 
                            ref={logoRef} 
                            data-hover
                            onMouseEnter={(e) => {
                                const letters = e.currentTarget.querySelectorAll('span');
                                gsap.to(letters, {
                                    y: -3,
                                    scale: 1.05,
                                    duration: 0.4,
                                    stagger: 0.03,
                                    ease: 'power2.out',
                                });
                            }}
                            onMouseLeave={(e) => {
                                const letters = e.currentTarget.querySelectorAll('span');
                                gsap.to(letters, {
                                    y: 0,
                                    scale: 1,
                                    duration: 0.4,
                                    stagger: 0.02,
                                    ease: 'power2.out',
                                });
                            }}
                            style={{
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: '#FFFFFF',
                                letterSpacing: '-0.01em',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                gap: '0.1em',
                            }}
                        >
                            {'SchnellFix'.split('').map((char, i) => (
                                <span key={i} style={{ display: 'inline-block' }}>
                                    {char === ' ' ? '\u00A0' : char}
                                </span>
                            ))}
                        </div>
                    </ElegantHover>
                <div 
                    ref={buttonRef}
                    data-hover
                    onMouseMove={(e) => {
                        const button = e.currentTarget.querySelector('button');
                        if (button) {
                            const rect = button.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            
                            gsap.to(button, {
                                x: (x - rect.width / 2) * 0.1,
                                y: (y - rect.height / 2) * 0.1,
                                duration: 0.3,
                                ease: 'power2.out',
                            });
                        }
                    }}
                    onMouseLeave={(e) => {
                        const button = e.currentTarget.querySelector('button');
                        if (button) {
                            gsap.to(button, {
                                x: 0,
                                y: 0,
                                duration: 0.5,
                                ease: 'power2.out',
                            });
                        }
                    }}
                >
                    <Button 
                        kind="elevated"
                        variant="secondary"
                        size="medium"
                        backgroundColor="#6B7280"
                        onClick={() => console.log('Partner Login clicked')}
                    >
                        Partner Login
                    </Button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
