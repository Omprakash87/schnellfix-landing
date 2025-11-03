import { useEffect } from 'react';
import { gsap } from 'gsap';

const RippleEffect: React.FC = () => {
    useEffect(() => {
        const createRipple = (e: MouseEvent) => {
            const ripple = document.createElement('div');
            const size = Math.max(window.innerWidth, window.innerHeight) * 2;
            
            ripple.style.cssText = `
                position: fixed;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
                pointer-events: none;
                z-index: 9996;
                transform: translate(-50%, -50%);
                left: ${e.clientX}px;
                top: ${e.clientY}px;
            `;

            document.body.appendChild(ripple);

            gsap.to(ripple, {
                width: size,
                height: size,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => ripple.remove(),
            });
        };

        // Create ripple on click
        document.addEventListener('click', createRipple);

        return () => {
            document.removeEventListener('click', createRipple);
        };
    }, []);

    return null;
};

export default RippleEffect;

