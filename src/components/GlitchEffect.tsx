import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

interface GlitchEffectProps {
    children: React.ReactNode;
    className?: string;
}

const GlitchEffect: React.FC<GlitchEffectProps> = ({ children, className = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;

        const glitch = () => {
            gsap.to(container, {
                x: (Math.random() - 0.5) * 10,
                y: (Math.random() - 0.5) * 10,
                duration: 0.05,
                repeat: 5,
                yoyo: true,
                ease: 'power1.inOut',
                onComplete: () => {
                    gsap.set(container, { x: 0, y: 0 });
                },
            });

            // Color shift effect
            gsap.to(container, {
                filter: 'hue-rotate(90deg) saturate(1.5)',
                duration: 0.1,
                repeat: 3,
                yoyo: true,
                ease: 'power1.inOut',
                onComplete: () => {
                    gsap.set(container, { filter: 'none' });
                },
            });
        };

        container.addEventListener('mouseenter', glitch);

        return () => {
            container.removeEventListener('mouseenter', glitch);
        };
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
};

export default GlitchEffect;

