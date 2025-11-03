import { useRef } from 'react';

const WaveAnimation: React.FC = () => {
    const waveRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={waveRef}
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                height: '200px',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: 0.1,
            }}
        >
            <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1000 100">
                <path
                    fill="url(#waveGradient)"
                    d="M0,50 Q250,50 500,50 T1000,50 L1000,100 L0,100 Z"
                >
                    <animate
                        attributeName="d"
                        dur="6s"
                        repeatCount="indefinite"
                        values="M0,50 Q250,30 500,50 T1000,50 L1000,100 L0,100 Z;M0,50 Q250,70 500,50 T1000,50 L1000,100 L0,100 Z;M0,50 Q250,30 500,50 T1000,50 L1000,100 L0,100 Z"
                    />
                </path>
                <defs>
                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#00BFFF" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#FFD700" stopOpacity="0.3" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default WaveAnimation;

