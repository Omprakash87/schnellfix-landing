import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ReactNode } from 'react';

interface CreativeTextRevealProps {
    children: ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}

const CreativeTextReveal: React.FC<CreativeTextRevealProps> = ({ 
    children, 
    delay = 0,
    direction = 'up' 
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const words = container.querySelectorAll('span, div');
        const directions = {
            up: { y: 100, x: 0 },
            down: { y: -100, x: 0 },
            left: { x: 100, y: 0 },
            right: { x: -100, y: 0 },
        };

        const { x, y } = directions[direction];

        words.forEach((word, index) => {
            const wordEl = word as HTMLElement;
            
            // Split words into characters if it's a span
            if (wordEl.tagName === 'SPAN') {
                const text = wordEl.textContent || '';
                wordEl.innerHTML = '';
                
                text.split('').forEach((char) => {
                    const charSpan = document.createElement('span');
                    charSpan.textContent = char === ' ' ? '\u00A0' : char;
                    charSpan.style.display = 'inline-block';
                    wordEl.appendChild(charSpan);
                });
            }

            gsap.set(word, {
                opacity: 0,
                x: wordEl.tagName === 'SPAN' ? x * 0.5 : x,
                y: wordEl.tagName === 'SPAN' ? y * 0.5 : y,
                rotationX: direction === 'up' ? 90 : direction === 'down' ? -90 : 0,
                rotationY: direction === 'left' ? 90 : direction === 'right' ? -90 : 0,
                transformPerspective: 1000,
            });

            const chars = word.querySelectorAll('span');
            
            ScrollTrigger.create({
                trigger: container,
                start: 'top 85%',
                animation: gsap.to(word, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotationX: 0,
                    rotationY: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    delay: delay + index * 0.1,
                }),
                toggleActions: 'play none none none',
            });

            // Animate characters within words
            if (chars.length > 0) {
                chars.forEach((char, charIndex) => {
                    ScrollTrigger.create({
                        trigger: container,
                        start: 'top 85%',
                        animation: gsap.fromTo(
                            char,
                            {
                                opacity: 0,
                                y: 50,
                                rotationX: 90,
                            },
                            {
                                opacity: 1,
                                y: 0,
                                rotationX: 0,
                                duration: 0.6,
                                ease: 'back.out(2)',
                                delay: delay + index * 0.1 + charIndex * 0.03,
                            }
                        ),
                        toggleActions: 'play none none none',
                    });
                });
            }
        });
    }, [delay, direction]);

    return (
        <div ref={containerRef} style={{ display: 'inline-block' }}>
            {children}
        </div>
    );
};

export default CreativeTextReveal;

