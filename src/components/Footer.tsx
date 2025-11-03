import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Linkedin, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: FC = () => {
    const footerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const footer = footerRef.current;

        if (footer) {
            // Set initial position
            gsap.set(footer, { y: 10, opacity: 0 });

            // ScrollTrigger animation
            gsap.to(footer, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: footer,
                    start: 'top 90%',
                    end: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });
        }
    }, { scope: footerRef });

    return (
        <footer ref={footerRef} style={{
            background: '#000000',
            color: '#FFFFFF',
            padding: '6rem 40px 2rem',
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '4rem',
                    marginBottom: '4rem',
                }}>
                    <div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            marginBottom: '1.5rem',
                            color: '#FFFFFF',
                        }}>
                            SchnellFix
                        </h3>
                        <p style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            lineHeight: 1.7,
                            fontSize: '0.95rem',
                            marginBottom: '1.5rem',
                        }}>
                            Your trusted partner for all home and device service needs. Fast, reliable, and professional.
                        </p>
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                        }}>
                            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.7)' }} aria-label="LinkedIn">
                                <Linkedin size={24} />
                            </a>
                            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.7)' }} aria-label="Twitter">
                                <Twitter size={24} />
                            </a>
                            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.7)' }} aria-label="Instagram">
                                <Instagram size={24} />
                            </a>
                            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.7)' }} aria-label="Email">
                                <Mail size={24} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 style={{
                            fontSize: '1.125rem',
                            fontWeight: 700,
                            marginBottom: '1.5rem',
                            color: '#FFFFFF',
                        }}>
                            Company
                        </h4>
                        <ul style={{
                            listStyle: 'none',
                        }}>
                            <li style={{ marginBottom: '1rem' }}>
                                <a href="#about" style={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    textDecoration: 'none',
                                    fontSize: '0.95rem',
                                    transition: 'color 0.3s ease',
                                }}>
                                    About
                                </a>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <a href="#careers" style={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    textDecoration: 'none',
                                    fontSize: '0.95rem',
                                    transition: 'color 0.3s ease',
                                }}>
                                    Careers
                                </a>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <a href="#contact" style={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    textDecoration: 'none',
                                    fontSize: '0.95rem',
                                    transition: 'color 0.3s ease',
                                }}>
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{
                            fontSize: '1.125rem',
                            fontWeight: 700,
                            marginBottom: '1.5rem',
                            color: '#FFFFFF',
                        }}>
                            Legal
                        </h4>
                        <ul style={{
                            listStyle: 'none',
                        }}>
                            <li style={{ marginBottom: '1rem' }}>
                                <a href="#privacy" style={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    textDecoration: 'none',
                                    fontSize: '0.95rem',
                                    transition: 'color 0.3s ease',
                                }}>
                                    Privacy Policy
                                </a>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <a href="#terms" style={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    textDecoration: 'none',
                                    fontSize: '0.95rem',
                                    transition: 'color 0.3s ease',
                                }}>
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style={{
                    textAlign: 'center',
                    paddingTop: '2rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.9rem',
                }}>
                    <p>&copy; 2024 SchnellFix. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
