import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface LiquidMorphProps {
    size?: number;
    color?: string;
    position?: { top?: string; bottom?: string; left?: string; right?: string };
}

const LiquidMorph: React.FC<LiquidMorphProps> = ({ 
    size = 400, 
    color = 'rgba(255, 255, 255, 0.02)',
    position = { top: '50%', left: '50%' }
}) => {
    const blobRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const blob = blobRef.current;
        if (!blob) return;

        // Create organic morphing animation
        const morphValue = { value: 0 };
        
        const animateMorph = () => {
            gsap.to(morphValue, {
                value: 1,
                duration: 4 + Math.random() * 2,
                ease: 'sine.inOut',
                onUpdate: () => {
                    if (blob) {
                        const t = morphValue.value;
                        
                        // Create organic blob shape using multiple circles
                        const radius1 = 50 + Math.sin(t * Math.PI * 2) * 20;
                        const radius2 = 50 + Math.cos(t * Math.PI * 2 + Math.PI / 3) * 20;
                        const radius3 = 50 + Math.sin(t * Math.PI * 2 + Math.PI * 2 / 3) * 20;
                        
                        const angle1 = t * Math.PI * 2;
                        const angle2 = t * Math.PI * 2 + Math.PI / 3;
                        const angle3 = t * Math.PI * 2 + Math.PI * 2 / 3;
                        
                        const x1 = Math.cos(angle1) * radius1;
                        const y1 = Math.sin(angle1) * radius1;
                        const x2 = Math.cos(angle2) * radius2;
                        const y2 = Math.sin(angle2) * radius2;
                        const x3 = Math.cos(angle3) * radius3;
                        const y3 = Math.sin(angle3) * radius3;
                        
                        // Use clip-path for organic shape
                        blob.style.clipPath = `polygon(
                            ${50 + x1}% ${50 + y1}%,
                            ${50 + x2}% ${50 + y2}%,
                            ${50 + x3}% ${50 + y3}%
                        )`;
                    }
                },
                onComplete: () => {
                    morphValue.value = 0;
                    animateMorph();
                },
            });
        };

        animateMorph();

        // Additional floating animation
        gsap.to(blob, {
            y: `+=${30 + Math.random() * 20}`,
            x: `+=${20 + Math.random() * 15}`,
            rotation: `+=${360}`,
            duration: 10 + Math.random() * 5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
        });
    }, []);

    return (
        <div
            ref={blobRef}
            style={{
                position: 'absolute',
                width: `${size}px`,
                height: `${size}px`,
                background: color,
                borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                filter: 'blur(60px)',
                pointerEvents: 'none',
                top: position.top,
                bottom: position.bottom,
                left: position.left,
                right: position.right,
                transform: 'translate(-50%, -50%)',
                transition: 'border-radius 4s ease-in-out',
            }}
        />
    );
};

export default LiquidMorph;

