import React from 'react';
import type { TokenColor } from '@/lib/types';
import { StyledButton, StyledLink } from './Button.styles';

interface Props {
  $variant?: 'primary' | 'ghost' | 'cv';
  $color?: TokenColor;
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

const Button = ({
  $variant = 'ghost',
  $color,
  href,
  children,
  onClick,
  target,
  rel,
}: Props) => {
  if (href) {
    return (
      <StyledLink $variant={$variant} $color={$color} href={href} target={target} rel={rel}>
        {children}
      </StyledLink>
    );
  }

  return (
    <StyledButton $variant={$variant} $color={$color} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
