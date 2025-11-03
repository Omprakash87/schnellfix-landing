import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface GlowOrbProps {
    x: number;
    y: number;
    color?: string;
    size?: number;
}

const GlowOrb: React.FC<GlowOrbProps> = ({ x, y, color = 'rgba(255, 255, 255, 0.15)', size = 200 }) => {
    const orbRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const orb = orbRef.current;
        if (!orb) return;

        // Pulsing animation
        gsap.to(orb, {
            scale: 1.2,
            opacity: 0.3,
            duration: 2 + Math.random(),
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
        });

        // Floating animation
        gsap.to(orb, {
            y: `+=${30 + Math.random() * 20}`,
            x: `+=${20 + Math.random() * 15}`,
            duration: 4 + Math.random() * 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
        });

        // Color shift
        const colors = [
            'rgba(255, 255, 255, 0.15)',
            'rgba(255, 255, 255, 0.1)',
            'rgba(255, 255, 255, 0.12)',
        ];

        let colorIndex = 0;
        const colorCycle = () => {
            gsap.to(orb, {
                background: colors[colorIndex % colors.length],
                duration: 3,
                ease: 'sine.inOut',
                onComplete: () => {
                    colorIndex++;
                    colorCycle();
                },
            });
        };

        colorCycle();
    }, []);

    return (
        <div
            ref={orbRef}
            style={{
                position: 'fixed',
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: color,
                borderRadius: '50%',
                filter: 'blur(40px)',
                pointerEvents: 'none',
                zIndex: 0,
                transform: 'translate(-50%, -50%)',
            }}
        />
    );
};

export default GlowOrb;

