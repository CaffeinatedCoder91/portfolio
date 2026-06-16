import React from 'react';
import { StyledChip } from './Chip.styles';

interface Props {
  $style?: 'default' | 'hot' | 'cool';
  children: React.ReactNode;
}

const Chip = ({ $style = 'default', children }: Props) => (
  <StyledChip $style={$style}>{children}</StyledChip>
);

export default Chip;
