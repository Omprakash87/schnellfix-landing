import { useEffect } from 'react';
import { gsap } from 'gsap';

const CursorTrail: React.FC = () => {
    useEffect(() => {
        const trail: HTMLElement[] = [];
        const trailLength = 15;

        // Create trail elements
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: fixed;
                width: ${10 - i * 0.5}px;
                height: ${10 - i * 0.5}px;
                border-radius: 50%;
                background: rgba(255, 215, 0, ${1 - i * 0.06});
                pointer-events: none;
                z-index: 9997;
                transform: translate(-50%, -50%);
                mix-blend-mode: difference;
            `;
            document.body.appendChild(dot);
            trail.push(dot);
        }

        let mouseX = 0;
        let mouseY = 0;
        const positions = trail.map(() => ({ x: 0, y: 0 }));

        const updateTrail = () => {
            positions.forEach((pos, i) => {
                if (i === 0) {
                    pos.x = mouseX;
                    pos.y = mouseY;
                } else {
                    pos.x += (positions[i - 1].x - pos.x) * 0.2;
                    pos.y += (positions[i - 1].y - pos.y) * 0.2;
                }

                gsap.set(trail[i], {
                    x: pos.x,
                    y: pos.y,
                });
            });

            requestAnimationFrame(updateTrail);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        updateTrail();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            trail.forEach((dot) => dot.remove());
        };
    }, []);

    return null;
};

export default CursorTrail;

