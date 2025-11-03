import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

interface LiquidBlobProps {
    color?: string;
    size?: number;
    position?: { top?: string; bottom?: string; left?: string; right?: string };
}

const LiquidBlob: React.FC<LiquidBlobProps> = ({ 
    color = 'rgba(255, 215, 0, 0.1)', 
    size = 300,
    position = { top: '20%', right: '10%' }
}) => {
    const blobRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const blob = blobRef.current;
        if (!blob) return;

        // Create morphing animation
        const animate = () => {
            const random1 = Math.random() * 50;
            const random2 = Math.random() * 50;
            const random3 = Math.random() * 50;
            const random4 = Math.random() * 50;

            gsap.to(blob, {
                borderRadius: `
                    ${30 + random1}% ${70 - random1}% ${60 + random2}% ${40 - random2}% / 
                    ${50 + random3}% ${40 - random3}% ${60 + random4}% ${50 - random4}%
                `,
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                rotation: Math.random() * 360,
                scale: 1 + Math.random() * 0.3,
                duration: 8 + Math.random() * 4,
                ease: 'sine.inOut',
                onComplete: animate,
            });
        };

        animate();
    }, { scope: blobRef });

    return (
        <div
            ref={blobRef}
            style={{
                position: 'absolute',
                width: `${size}px`,
                height: `${size}px`,
                background: color,
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                filter: 'blur(60px)',
                pointerEvents: 'none',
                ...position,
            }}
        />
    );
};

export default LiquidBlob;

