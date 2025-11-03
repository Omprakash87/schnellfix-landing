import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import type { ReactNode } from 'react';

interface AdvancedParallaxProps {
    children: ReactNode;
    speed?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    opacity?: boolean;
}

const AdvancedParallax: React.FC<AdvancedParallaxProps> = ({ 
    children, 
    speed = 0.5,
    direction = 'up',
    opacity = false 
}) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const directions = {
            up: { y: speed * 100, x: 0 },
            down: { y: -speed * 100, x: 0 },
            left: { x: speed * 100, y: 0 },
            right: { x: -speed * 100, y: 0 },
        };

        const { x, y } = directions[direction];

        gsap.to(element, {
            y,
            x,
            opacity: opacity ? 0.3 : 1,
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
        });

        // Add rotation for 3D effect
        if (direction === 'up' || direction === 'down') {
            gsap.to(element, {
                rotationX: speed * 10,
                transformPerspective: 1000,
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
        }
    }, [speed, direction, opacity]);

    return (
        <div ref={elementRef} style={{ willChange: 'transform' }}>
            {children}
        </div>
    );
};

export default AdvancedParallax;

