import React from 'react';
import { StyledCard, Number, Label } from './StatCard.styles';

interface Props {
  num: string;
  label: string;
}

const StatCard = ({ num, label }: Props) => (
  <StyledCard>
    <Number>{num}</Number>
    <Label>{label}</Label>
  </StyledCard>
);

export default StatCard;
