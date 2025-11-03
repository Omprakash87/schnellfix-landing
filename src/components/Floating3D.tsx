import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface Floating3DProps {
    count?: number;
}

const Floating3D: React.FC<Floating3DProps> = ({ count = 8 }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const elements: HTMLElement[] = [];

        for (let i = 0; i < count; i++) {
            const element = document.createElement('div');
            const size = Math.random() * 60 + 20;
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            element.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(0, 191, 255, 0.1) 100%);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                pointer-events: none;
                z-index: 9995;
                backdrop-filter: blur(10px);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            `;

            document.body.appendChild(element);
            elements.push(element);

            // Initial position
            gsap.set(element, {
                x,
                y,
                rotationX: Math.random() * 360,
                rotationY: Math.random() * 360,
                rotationZ: Math.random() * 360,
            });

            // Floating animation
            const timeline = gsap.timeline({ repeat: -1 });
            timeline
                .to(element, {
                    y: y + (Math.random() - 0.5) * 200,
                    x: x + (Math.random() - 0.5) * 200,
                    rotationX: `+=${Math.random() * 360}`,
                    rotationY: `+=${Math.random() * 360}`,
                    rotationZ: `+=${Math.random() * 360}`,
                    duration: 10 + Math.random() * 10,
                    ease: 'sine.inOut',
                })
                .to(element, {
                    y,
                    x,
                    rotationX: `+=${Math.random() * 360}`,
                    rotationY: `+=${Math.random() * 360}`,
                    rotationZ: `+=${Math.random() * 360}`,
                    duration: 10 + Math.random() * 10,
                    ease: 'sine.inOut',
                });
        }

        return () => {
            elements.forEach((el) => el.remove());
        };
    }, [count]);

    return null;
};

export default Floating3D;

