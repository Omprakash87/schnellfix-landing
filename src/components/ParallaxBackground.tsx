import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ParallaxBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Create subtle parallax layers
        const layers = [
            { speed: 0.3, opacity: 0.03 },
            { speed: 0.5, opacity: 0.02 },
            { speed: 0.7, opacity: 0.015 },
        ];

        layers.forEach((layer, index) => {
            const layerEl = document.createElement('div');
            layerEl.style.cssText = `
                position: fixed;
                inset: -50%;
                background: radial-gradient(circle at ${30 + index * 20}% ${40 + index * 15}%, 
                    rgba(255, 255, 255, ${layer.opacity}) 0%, 
                    transparent 70%);
                pointer-events: none;
                z-index: 0;
                will-change: transform;
            `;
            container.appendChild(layerEl);

            gsap.to(layerEl, {
                y: `+=${100 * layer.speed}`,
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,
                },
            });
        });

        return () => {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        };
    }, []);

    // ScrollTrigger is used in the gsap.to call above
    return <div ref={containerRef} />;
};

export default ParallaxBackground;

