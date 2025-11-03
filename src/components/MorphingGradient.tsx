import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const MorphingGradient: React.FC = () => {
    const gradientRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const gradient = gradientRef.current;
        if (!gradient) return;

        // Create morphing gradient with multiple control points
        const points = [
            { x: 20, y: 30 },
            { x: 80, y: 70 },
            { x: 50, y: 50 },
            { x: 30, y: 70 },
            { x: 70, y: 30 },
        ];

        let currentIndex = 0;
        const colors = [
            'rgba(255, 255, 255, 0.03)',
            'rgba(255, 255, 255, 0.025)',
            'rgba(255, 255, 255, 0.02)',
            'rgba(255, 255, 255, 0.015)',
        ];

        const animateGradient = () => {
            const nextIndex = (currentIndex + 1) % points.length;
            const currentPoint = points[currentIndex];
            const nextPoint = points[nextIndex];
            const color1 = colors[currentIndex % colors.length];
            const color2 = colors[nextIndex % colors.length];

            gsap.to(currentPoint, {
                x: nextPoint.x,
                y: nextPoint.y,
                duration: 8,
                ease: 'sine.inOut',
                onUpdate: () => {
                    if (gradient) {
                        gradient.style.background = `
                            radial-gradient(circle at ${currentPoint.x}% ${currentPoint.y}%, 
                                ${color1} 0%, 
                                transparent 50%),
                            radial-gradient(circle at ${nextPoint.x}% ${nextPoint.y}%, 
                                ${color2} 0%, 
                                transparent 50%)
                        `;
                    }
                },
                onComplete: () => {
                    currentIndex = nextIndex;
                    animateGradient();
                },
            });
        };

        animateGradient();
    }, []);

    return (
        <div
            ref={gradientRef}
            style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)',
            }}
        />
    );
};

export default MorphingGradient;

