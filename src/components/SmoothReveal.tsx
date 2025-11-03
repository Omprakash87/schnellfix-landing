import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SmoothRevealProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    duration?: number;
    className?: string;
}

const SmoothReveal: React.FC<SmoothRevealProps> = ({ 
    children, 
    direction = 'up',
    delay = 0,
    duration = 1,
    className = '' 
}) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const directions = {
            up: { y: 60, x: 0 },
            down: { y: -60, x: 0 },
            left: { x: 60, y: 0 },
            right: { x: -60, y: 0 },
        };

        const { x, y } = directions[direction];

        gsap.set(element, { 
            opacity: 0, 
            x, 
            y,
        });

        const scrollTrigger = ScrollTrigger.create({
            trigger: element,
            start: 'top 85%',
            animation: gsap.to(element, {
                opacity: 1,
                x: 0,
                y: 0,
                duration,
                delay,
                ease: 'power3.out',
            }),
            toggleActions: 'play none none none',
        });

        return () => {
            scrollTrigger.kill();
        };
    }, [direction, delay, duration]);

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
};

export default SmoothReveal;

