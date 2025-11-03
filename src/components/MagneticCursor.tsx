import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MagneticCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Disable on mobile devices
        if (typeof window !== 'undefined' && window.innerWidth <= 768) return;
        
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;

        const updateCursor = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const updateFollower = () => {
            const dx = mouseX - followerX;
            const dy = mouseY - followerY;

            followerX += dx * 0.1;
            followerY += dy * 0.1;

            gsap.set(follower, {
                x: followerX,
                y: followerY,
            });

            requestAnimationFrame(updateFollower);
        };

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'BUTTON' || target.closest('button') || target.closest('[data-hover]')) {
                gsap.to(cursor, { scale: 2, duration: 0.3 });
                gsap.to(follower, { scale: 1.5, duration: 0.3 });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
            gsap.to(follower, { scale: 1, duration: 0.3 });
        };

        window.addEventListener('mousemove', updateCursor);
        updateFollower();

        // Magnetic effect for buttons
        const buttons = document.querySelectorAll('button, [data-hover]');
        buttons.forEach((btn) => {
            btn.addEventListener('mouseenter', handleMouseEnter as any);
            btn.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', updateCursor);
            buttons.forEach((btn) => {
                btn.removeEventListener('mouseenter', handleMouseEnter as any);
                btn.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    // Hide on mobile
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        return null;
    }

    return (
        <>
            <div
                ref={cursorRef}
                style={{
                    position: 'fixed',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#FFD700',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'difference',
                    transform: 'translate(-50%, -50%)',
                }}
            />
            <div
                ref={followerRef}
                style={{
                    position: 'fixed',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 215, 0, 0.5)',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    transform: 'translate(-50%, -50%)',
                }}
            />
        </>
    );
};

export default MagneticCursor;

