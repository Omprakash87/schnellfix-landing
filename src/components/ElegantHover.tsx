import { useRef } from 'react';
import type { ReactNode, MouseEvent } from 'react';
import { gsap } from 'gsap';

interface ElegantHoverProps {
    children: ReactNode;
    intensity?: number;
    className?: string;
}

const ElegantHover: React.FC<ElegantHoverProps> = ({ 
    children, 
    intensity = 0.03,
    className = '' 
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotateX = (y - 0.5) * intensity * 180;
        const rotateY = (x - 0.5) * intensity * -180;

        gsap.to(container, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.6,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = () => {
        const container = containerRef.current;
        if (!container) return;

        gsap.to(container, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.3)',
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
            }}
        >
            {children}
        </div>
    );
};

export default ElegantHover;

