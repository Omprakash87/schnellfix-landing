import type { ReactNode, FC } from 'react';
import styled from 'styled-components';

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

const StyledCard = styled.div<CardProps>`
    position: relative;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 2.5rem 2rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: ${props => props.onClick ? 'pointer' : 'default'};
    backdrop-filter: blur(10px);
    
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.3),
        0 4px 16px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    
    &:hover {
        transform: translateY(-8px) scale(1.02);
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(37, 99, 235, 0.3);
        box-shadow: 
            0 20px 48px rgba(37, 99, 235, 0.2),
            0 12px 24px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
    
    &:active {
        transform: translateY(-4px) scale(1.01);
        box-shadow: 
            0 12px 24px rgba(37, 99, 235, 0.15),
            inset 0 2px 4px rgba(0, 0, 0, 0.3);
    }
`;

const Card: FC<CardProps> = ({ children, className, onClick, ...props }) => {
    return (
        <StyledCard className={className} onClick={onClick} {...props}>
            {children}
        </StyledCard>
    );
};

export default Card;

