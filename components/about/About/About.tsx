import React from 'react';
import { about, aboutMetadata, aboutStatement, facts } from '../../../content/data';
import Eyebrow from '../../ui/Eyebrow';
import ScrollReveal from '../../ui/ScrollReveal';
import StatCard from '../../ui/StatCard';
import {
  Section,
  Wrapper,
  Statement,
  SupportingText,
  MetadataRow,
  MetadataCol,
  MetadataLabel,
  MetadataValue,
  StatsRow,
  StatItem,
} from './About.styles';

const About = () => {
  return (
    <Section id="about" aria-labelledby="about-title">
      <Wrapper>
        <ScrollReveal>
          <Eyebrow $number="001">ABOUT</Eyebrow>

          <Statement id="about-title">{aboutStatement}</Statement>

          <SupportingText>
            {about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </SupportingText>

          <MetadataRow>
            {aboutMetadata.map((item) => (
              <MetadataCol key={item.label}>
                <MetadataLabel>{item.label}</MetadataLabel>
                <MetadataValue>{item.value}</MetadataValue>
              </MetadataCol>
            ))}
          </MetadataRow>

          <StatsRow role="list" aria-label="Career facts">
            {facts.map((fact) => (
              <StatItem role="listitem" key={`${fact.num}-${fact.label}`}>
                <StatCard num={fact.num} label={fact.label} />
              </StatItem>
            ))}
          </StatsRow>
        </ScrollReveal>
      </Wrapper>
    </Section>
  );
};

export default About;
