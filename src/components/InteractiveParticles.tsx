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

const InteractiveParticles: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const particleCount = 30;
        const mouse = { x: 0, y: 0 };

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 2;
            
            particle.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                box-shadow: 0 0 ${size * 2}px rgba(255, 215, 0, 0.5);
            `;

            document.body.appendChild(particle);

            particlesRef.current.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size,
                element: particle,
            });
        }

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            particlesRef.current.forEach((particle) => {
                // Repel from mouse
                const dx = particle.x - mouse.x;
                const dy = particle.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = 100;

                if (distance < minDistance) {
                    const force = (minDistance - distance) / minDistance;
                    particle.vx += (dx / distance) * force * 0.1;
                    particle.vy += (dy / distance) * force * 0.1;
                }

                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Damping
                particle.vx *= 0.98;
                particle.vy *= 0.98;

                // Boundary check
                if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
                if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
                particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
                particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));

                // Update element
                gsap.set(particle.element, {
                    x: particle.x,
                    y: particle.y,
                });
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            particlesRef.current.forEach((p) => p.element.remove());
            particlesRef.current = [];
        };
    }, []);

    return null;
};

export default InteractiveParticles;

