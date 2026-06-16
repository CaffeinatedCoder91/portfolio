import React from 'react';
import { StyledButton, StyledLink } from './Button.styles';

interface Props {
  $variant?: 'primary' | 'ghost' | 'cv';
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ $variant = 'ghost', href, children, onClick }: Props) => {
  if (href) {
    return (
      <StyledLink $variant={$variant} href={href}>
        {children}
      </StyledLink>
    );
  }

  return (
    <StyledButton $variant={$variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
