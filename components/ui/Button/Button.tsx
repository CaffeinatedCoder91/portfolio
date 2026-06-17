import React from 'react';
import { StyledButton, StyledLink } from './Button.styles';

interface Props {
  $variant?: 'primary' | 'ghost' | 'cv';
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

const Button = ({
  $variant = 'ghost',
  href,
  children,
  onClick,
  target,
  rel,
}: Props) => {
  if (href) {
    return (
      <StyledLink $variant={$variant} href={href} target={target} rel={rel}>
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
