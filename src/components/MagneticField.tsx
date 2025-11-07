import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import type { ReactNode } from 'react';

interface MagneticFieldProps {
    children: ReactNode;
    strength?: number;
}

const MagneticField: React.FC<MagneticFieldProps> = ({ children, strength = 0.3 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const magneticFieldRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Disable on mobile devices
        if (typeof window !== 'undefined' && window.innerWidth <= 768) return;
        
        const container = containerRef.current;
        const field = magneticFieldRef.current;
        if (!container || !field) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate distance and angle
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = Math.max(rect.width, rect.height) / 2;
            const normalizedDistance = Math.min(distance / maxDistance, 1);
            
            // Create magnetic effect - stronger near center
            const magneticStrength = strength * (1 - normalizedDistance * 0.7);
            
            // Animate all child elements
            const children = container.children;
            Array.from(children).forEach((child, index) => {
                const angle = (index * 360) / children.length;
                const radius = normalizedDistance * 20;
                
                gsap.to(child as HTMLElement, {
                    x: dx * magneticStrength * 0.5 + Math.cos(angle * Math.PI / 180) * radius,
                    y: dy * magneticStrength * 0.5 + Math.sin(angle * Math.PI / 180) * radius,
                    rotation: normalizedDistance * 5,
                    duration: 0.6,
                    ease: 'power2.out',
                });
            });

            // Animate magnetic field visualization
            gsap.to(field, {
                x: dx * 0.3,
                y: dy * 0.3,
                scale: 1 + normalizedDistance * 0.5,
                opacity: 0.1 - normalizedDistance * 0.05,
                duration: 0.6,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            const children = container.children;
            Array.from(children).forEach((child) => {
                gsap.to(child as HTMLElement, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.3)',
                });
            });

            gsap.to(field, {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
            });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                display: 'inline-block',
            }}
        >
            <div
                ref={magneticFieldRef}
                style={{
                    position: 'absolute',
                    inset: '-50%',
                    background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    opacity: 0,
                    transform: 'translate(-50%, -50%)',
                    filter: 'blur(50px)',
                    zIndex: -1,
                }}
            />
            {children}
        </div>
    );
};

export default MagneticField;

