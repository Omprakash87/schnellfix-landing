import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

interface TypewriterEffectProps {
    text: string;
    speed?: number;
    className?: string;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ 
    text, 
    speed = 50,
    className = '' 
}) => {
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const element = textRef.current;
        if (!element) return;

        element.textContent = '';
        const chars = text.split('');

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        });

        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            element.appendChild(span);

            timeline.to(span, {
                opacity: 1,
                duration: 0.05,
                ease: 'none',
            }, index * speed / 1000);
        });
    }, { scope: textRef, dependencies: [text, speed] });

    return (
        <div 
            ref={textRef} 
            className={className}
            style={{ 
                display: 'inline-block',
                minHeight: '1.2em',
            }}
        />
    );
};

export default TypewriterEffect;

