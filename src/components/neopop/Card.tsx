import type { ReactNode, FC } from 'react';
import styled from 'styled-components';

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

const StyledCard = styled.div<CardProps>`
    position: relative;
    background: #282828;
    border-radius: 0;
    padding: 2.5rem 2rem;
    transition: all 0.3s ease;
    cursor: ${props => props.onClick ? 'pointer' : 'default'};
    
    box-shadow: 
        0 8px 16px rgba(0, 0, 0, 0.4),
        0 4px 8px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 
            0 12px 24px rgba(0, 0, 0, 0.5),
            0 6px 12px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }
    
    &:active {
        transform: translateY(-2px);
        box-shadow: 
            0 6px 12px rgba(0, 0, 0, 0.4),
            inset 0 2px 4px rgba(0, 0, 0, 0.4);
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

