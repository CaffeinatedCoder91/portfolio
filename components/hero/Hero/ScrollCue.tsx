import React from 'react';
import { ScrollCueContainer } from './Hero.styles';

const ScrollCue = () => {
  return (
    <ScrollCueContainer aria-hidden="true">
      <span>scroll</span>
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 10 13 14 9" />
      </svg>
    </ScrollCueContainer>
  );
};

export default ScrollCue;
