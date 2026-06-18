import React from 'react';
import type { Theme } from '../../../styles/theme';
import { StyledEyebrow } from './Eyebrow.styles';

type EyebrowColor = keyof Theme['colors'];

interface Props {
  $color?: EyebrowColor;
  $number?: string;
  children: React.ReactNode;
}

const Eyebrow = ({ $color = 'kincha', $number, children }: Props) => (
  <StyledEyebrow $color={$color} $hasNumber={Boolean($number)}>
    {$number && `${$number} / `}
    {children}
  </StyledEyebrow>
);

export default Eyebrow;
