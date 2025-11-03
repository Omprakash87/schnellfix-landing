import { useRef, useEffect } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
}

const InteractiveHeroCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const mouseRef = useRef({ x: 0, y: 0 });
    const particlesRef = useRef<Particle[]>([]);
    const blobsRef = useRef<Array<{ x: number; y: number; radius: number; vx: number; vy: number }>>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Professional color palette - muted and elegant
        const colors = [
            'rgba(255, 215, 0, 0.15)',    // Subtle Gold
            'rgba(30, 144, 255, 0.15)',   // Deep Sky Blue (subtle)
            'rgba(255, 255, 255, 0.1)',   // White (very subtle)
            'rgba(200, 200, 210, 0.12)',  // Cool Gray
            'rgba(70, 130, 180, 0.15)',   // Steel Blue
        ];

        // Create subtle, elegant blobs - fewer and larger
        for (let i = 0; i < 3; i++) {
            blobsRef.current.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: 150 + Math.random() * 200,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
            });
        }

        // Create fewer, more refined particles
        for (let i = 0; i < 80; i++) {
            particlesRef.current.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: 1.5 + Math.random() * 2.5,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw blobs
            blobsRef.current.forEach((blob, index) => {
                // Move blob
                blob.x += blob.vx;
                blob.y += blob.vy;

                // Bounce off edges
                if (blob.x < 0 || blob.x > canvas.width) blob.vx *= -1;
                if (blob.y < 0 || blob.y > canvas.height) blob.vy *= -1;

                // Subtle attraction to mouse - more refined
                const dx = mouseRef.current.x - blob.x;
                const dy = mouseRef.current.y - blob.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 400) {
                    const force = (400 - distance) / 400;
                    blob.vx += (dx / distance) * force * 0.08;
                    blob.vy += (dy / distance) * force * 0.08;
                }
                
                // Slow down movement for elegance
                blob.vx *= 0.995;
                blob.vy *= 0.995;

                // Draw elegant blob with subtle morphing
                ctx.beginPath();
                const time = Date.now() * 0.0008; // Slower, more elegant
                const numPoints = 24; // Smoother shape
                for (let i = 0; i < numPoints; i++) {
                    const angle = (i / numPoints) * Math.PI * 2;
                    const radiusVariation = Math.sin(time + i * 0.3) * 20; // Smaller variation
                    const x = blob.x + Math.cos(angle) * (blob.radius + radiusVariation);
                    const y = blob.y + Math.sin(angle) * (blob.radius + radiusVariation);
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.closePath();

                // Subtle gradient fill - very transparent
                const gradient = ctx.createRadialGradient(
                    blob.x, blob.y, 0,
                    blob.x, blob.y, blob.radius + 100
                );
                gradient.addColorStop(0, colors[index % colors.length]);
                gradient.addColorStop(0.5, colors[index % colors.length].replace('0.15', '0.08'));
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Very subtle stroke
                ctx.globalAlpha = 0.2;
                ctx.strokeStyle = colors[index % colors.length];
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.globalAlpha = 1;
            });

            // Update and draw particles
            particlesRef.current.forEach((particle) => {
                // Move particle
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Subtle attraction to mouse - very refined
                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 200) {
                    const force = (200 - distance) / 200;
                    particle.vx += (dx / distance) * force * 0.15;
                    particle.vy += (dy / distance) * force * 0.15;
                }

                // Gentle damping for smooth movement
                particle.vx *= 0.99;
                particle.vy *= 0.99;

                // Draw subtle particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
                // Subtle glow - much softer
                ctx.shadowBlur = 8;
                ctx.shadowColor = particle.color;
            });

            // Draw subtle connections between nearby particles - more refined
            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const p1 = particlesRef.current[i];
                    const p2 = particlesRef.current[j];
                    const dx = p2.x - p1.x;
                    const dy = p2.y - p1.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        // Very subtle white connections
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - distance / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // Elegant subtle grid effect - very minimal
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
            ctx.lineWidth = 0.5;
            const time = Date.now() * 0.0005; // Much slower, more elegant
            for (let i = 0; i < canvas.width; i += 80) {
                const wave = Math.sin(time + i * 0.005) * 10; // Smaller wave
                ctx.moveTo(i, 0);
                ctx.lineTo(i + wave, canvas.height);
            }
            ctx.stroke();

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Start animation loop
        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current !== undefined) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
};

export default InteractiveHeroCanvas;

