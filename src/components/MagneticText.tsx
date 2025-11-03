import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MagneticTextProps {
    children: React.ReactNode;
    strength?: number;
    className?: string;
}

const MagneticText: React.FC<MagneticTextProps> = ({ 
    children, 
    strength = 30,
    className = '' 
}) => {
    const textRef = useRef<HTMLDivElement>(null);
    const lettersRef = useRef<HTMLElement[]>([]);

    useEffect(() => {
        const text = textRef.current;
        if (!text) return;

        // Split text into individual letters
        const textContent = text.textContent || '';
        text.innerHTML = '';
        
        const letters = textContent.split('').map((char) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.cssText = `
                display: inline-block;
                transition: transform 0.3s ease-out;
                cursor: default;
            `;
            text.appendChild(span);
            lettersRef.current.push(span);
            return span;
        });

        const handleMouseMove = (e: MouseEvent) => {
            letters.forEach((letter) => {
                const rect = letter.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const dx = e.clientX - centerX;
                const dy = e.clientY - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const angle = Math.atan2(dy, dx);
                    
                    gsap.to(letter, {
                        x: Math.cos(angle) * strength * force,
                        y: Math.sin(angle) * strength * force,
                        rotation: (Math.random() - 0.5) * 20 * force,
                        scale: 1 + force * 0.2,
                        duration: 0.3,
                        ease: 'power2.out',
                    });
                } else {
                    gsap.to(letter, {
                        x: 0,
                        y: 0,
                        rotation: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                    });
                }
            });
        };

        const handleMouseLeave = () => {
            letters.forEach((letter) => {
                gsap.to(letter, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.3)',
                });
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        text.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            const textEl = textRef.current;
            if (textEl) {
                textEl.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [strength]);

    return (
        <div ref={textRef} className={className}>
            {children}
        </div>
    );
};

export default MagneticText;

