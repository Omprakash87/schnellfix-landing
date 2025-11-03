import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    element: HTMLElement;
}

const ProfessionalParticles: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const particleCount = 20; // Very minimal

        // Create subtle particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const size = 1 + Math.random() * 1;
            
            particle.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.15);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.1);
            `;

            document.body.appendChild(particle);

            particlesRef.current.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                size,
                element: particle,
            });
        }

        // Animation loop
        const animate = () => {
            particlesRef.current.forEach((particle) => {
                // Slow movement
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around
                if (particle.x < 0) particle.x = window.innerWidth;
                if (particle.x > window.innerWidth) particle.x = 0;
                if (particle.y < 0) particle.y = window.innerHeight;
                if (particle.y > window.innerHeight) particle.y = 0;

                // Very gentle damping
                particle.vx *= 0.999;
                particle.vy *= 0.999;

                gsap.set(particle.element, {
                    x: particle.x,
                    y: particle.y,
                });
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            particlesRef.current.forEach((p) => p.element.remove());
            particlesRef.current = [];
            if (animationFrameRef.current !== undefined) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return null;
};

export default ProfessionalParticles;

