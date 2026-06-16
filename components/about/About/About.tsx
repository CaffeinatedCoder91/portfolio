import React from 'react';
import { about, facts } from '../../../content/data';
import Eyebrow from '../../ui/Eyebrow';
import ScrollReveal from '../../ui/ScrollReveal';
import StatCard from '../../ui/StatCard';
import { Section, Wrapper, Title, AboutGrid, Copy, Facts, FactItem } from './About.styles';

const About = () => {
  return (
    <Section id="about" aria-labelledby="about-title">
      <Wrapper>
        <ScrollReveal>
          <Eyebrow $color="kincha">whoami</Eyebrow>
          <Title id="about-title">A little about me</Title>
          <AboutGrid>
            <Copy>
              {about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Copy>
            <Facts role="list" aria-label="Career facts">
              {facts.map((fact) => (
                <FactItem role="listitem" key={`${fact.num}-${fact.label}`}>
                  <StatCard num={fact.num} label={fact.label} />
                </FactItem>
              ))}
            </Facts>
          </AboutGrid>
        </ScrollReveal>
      </Wrapper>
    </Section>
  );
};

export default About;
