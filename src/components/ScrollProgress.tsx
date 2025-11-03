import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const ScrollProgress: React.FC = () => {
    const progressRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<SVGCircleElement>(null);

    useGSAP(() => {
        const progress = progressRef.current;
        const circle = circleRef.current;
        const textEl = document.getElementById('progress-text');
        if (!progress || !circle) return;

        const circumference = 2 * Math.PI * 45; // radius = 45
        circle.style.strokeDasharray = `${circumference}`;
        circle.style.strokeDashoffset = `${circumference}`;

        const updateProgress = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progressValue = (scrollTop / docHeight) * 100;

            gsap.to(progress, {
                scale: progressValue > 0 ? 1 : 0,
                opacity: progressValue > 0 ? 1 : 0,
                duration: 0.3,
                ease: 'power2.out',
            });

            gsap.to(circle, {
                strokeDashoffset: circumference - (progressValue / 100) * circumference,
                duration: 0.1,
                ease: 'none',
            });
            
            if (textEl) {
                textEl.textContent = `${Math.round(progressValue)}%`;
            }
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress();

        return () => window.removeEventListener('scroll', updateProgress);
    });

    return (
        <div
            ref={progressRef}
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                width: '100px',
                height: '100px',
                zIndex: 1000,
                opacity: 0,
                transform: 'scale(0)',
            }}
        >
            <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="4"
                />
                <circle
                    ref={circleRef}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
            </svg>
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                }}
                id="progress-text"
            >
                0%
            </div>
        </div>
    );
};

export default ScrollProgress;

