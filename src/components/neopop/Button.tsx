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
    
    background: ${props => props.backgroundColor || '#FFFFFF'};
    color: ${props => props.variant === 'primary' ? '#000000' : '#FFFFFF'};
    
    ${props => props.kind === 'elevated' && `
        box-shadow: 
            0 8px 16px rgba(0, 0, 0, 0.3),
            0 4px 8px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
        
        &:hover {
            transform: translateY(-4px);
            box-shadow: 
                0 12px 24px rgba(0, 0, 0, 0.4),
                0 6px 12px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        &:active {
            transform: translateY(0px);
            box-shadow: 
                0 4px 8px rgba(0, 0, 0, 0.2),
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

