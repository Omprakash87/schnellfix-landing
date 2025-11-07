import type { ReactNode, FC } from 'react';
import styled from 'styled-components';

interface ButtonProps {
    kind?: 'elevated' | 'flat';
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'big';
    backgroundColor?: string;
    onClick?: () => void;
    children: ReactNode;
    className?: string;
}

const StyledButton = styled.button<ButtonProps>`
    position: relative;
    padding: ${props => 
        props.size === 'big' ? '1.25rem 2.5rem' :
        props.size === 'small' ? '0.75rem 1.5rem' :
        '1rem 2rem'
    };
    font-size: ${props => 
        props.size === 'big' ? '1.125rem' :
        props.size === 'small' ? '0.875rem' :
        '1rem'
    };
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
    
    background: ${props => {
        if (props.backgroundColor === '#2563EB') {
            return 'linear-gradient(135deg, #2563EB 0%, #3B82F6 50%, #60A5FA 100%)';
        }
        return props.backgroundColor || '#FFFFFF';
    }};
    color: ${props => props.variant === 'primary' ? '#FFFFFF' : '#FFFFFF'};
    
    ${props => props.kind === 'elevated' && `
        box-shadow: 
            0 8px 24px ${props.backgroundColor === '#2563EB' ? 'rgba(37, 99, 235, 0.4)' : 'rgba(0, 0, 0, 0.3)'},
            0 4px 12px ${props.backgroundColor === '#2563EB' ? 'rgba(37, 99, 235, 0.3)' : 'rgba(0, 0, 0, 0.2)'},
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
        border: ${props.backgroundColor === '#2563EB' ? '1px solid rgba(96, 165, 250, 0.3)' : 'none'};
        
        &:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: 
                0 16px 32px ${props.backgroundColor === '#2563EB' ? 'rgba(37, 99, 235, 0.6)' : 'rgba(0, 0, 0, 0.4)'},
                0 8px 16px ${props.backgroundColor === '#2563EB' ? 'rgba(37, 99, 235, 0.4)' : 'rgba(0, 0, 0, 0.3)'},
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
            filter: ${props.backgroundColor === '#2563EB' ? 'drop-shadow(0 0 20px rgba(37, 99, 235, 0.8))' : 'none'};
        }
        
        &:active {
            transform: translateY(-2px) scale(0.98);
            box-shadow: 
                0 4px 12px ${props.backgroundColor === '#2563EB' ? 'rgba(37, 99, 235, 0.3)' : 'rgba(0, 0, 0, 0.2)'},
                inset 0 2px 4px rgba(0, 0, 0, 0.3);
        }
    `}
    
    ${props => props.kind === 'flat' && `
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        
        &:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        &:active {
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
        }
    `}
`;

const Button: FC<ButtonProps> = ({ 
    kind = 'elevated', 
    variant = 'primary', 
    size = 'medium',
    backgroundColor,
    onClick,
    children,
    className,
    ...props 
}) => {
    return (
        <StyledButton
            kind={kind}
            variant={variant}
            size={size}
            backgroundColor={backgroundColor}
            onClick={onClick}
            className={className}
            {...props}
        >
            {children}
        </StyledButton>
    );
};

export default Button;

