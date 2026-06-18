import React from 'react';
import { ScrollCueContainer, ScrollText, ScrollLine } from './Hero.styles';

const ScrollCue = () => {
  return (
    <ScrollCueContainer aria-hidden="true">
      <ScrollText>SCROLL</ScrollText>
      <ScrollLine />
    </ScrollCueContainer>
  );
};

export default ScrollCue;
