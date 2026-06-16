import React from 'react';
import { StyledTag } from './Tag.styles';

interface Props {
  children: React.ReactNode;
}

const Tag = ({ children }: Props) => <StyledTag>{children}</StyledTag>;

export default Tag;
