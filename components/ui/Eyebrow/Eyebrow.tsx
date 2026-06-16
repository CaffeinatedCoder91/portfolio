import React from 'react';
import type { Theme } from '../../../styles/theme';
import { StyledEyebrow } from './Eyebrow.styles';

type EyebrowColor = keyof Theme['colors'];

interface Props {
  $color?: EyebrowColor;
  children: React.ReactNode;
}

const Eyebrow = ({ $color = 'kincha', children }: Props) => (
  <StyledEyebrow $color={$color}>{children}</StyledEyebrow>
);

export default Eyebrow;
