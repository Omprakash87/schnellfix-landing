import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = '' }) => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const section = sectionRef.current;
        if (!section) return;

        const children = section.children;
        
        // Staggered reveal for child elements
        gsap.set(children, { opacity: 0, y: 40 });

        gsap.to(children, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none none',
            },
        });

        // Subtle scale on scroll
        gsap.to(section, {
            scale: 0.98,
            scrollTrigger: {
                trigger: section,
                start: 'top 50%',
                end: 'bottom 50%',
                scrub: 1,
            },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className={className}>
            {children}
        </section>
    );
};

export default AnimatedSection;

