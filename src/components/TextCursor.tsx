import { useEffect } from 'react';

const TextCursor: React.FC = () => {
    useEffect(() => {
        // Add blinking cursor to text elements
        const textElements = document.querySelectorAll('h1, h2, h3, p');
        
        textElements.forEach((element) => {
            const cursor = document.createElement('span');
            cursor.textContent = '|';
            cursor.style.cssText = `
                display: inline-block;
                color: #2563EB;
                animation: blink 1s infinite;
                margin-left: 2px;
            `;

            // Add CSS animation
            if (!document.getElementById('cursor-style')) {
                const style = document.createElement('style');
                style.id = 'cursor-style';
                style.textContent = `
                    @keyframes blink {
                        0%, 50% { opacity: 1; }
                        51%, 100% { opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }

            // Add cursor after text with delay
            setTimeout(() => {
                if (element.lastChild) {
                    element.appendChild(cursor);
                }
            }, 2000);

            // Remove cursor after animation completes
            setTimeout(() => {
                cursor.remove();
            }, 10000);
        });
    }, []);

    return null;
};

export default TextCursor;

