import React from 'react';
import { experience, education } from '../../../content/data';
import Eyebrow from '../../ui/Eyebrow';
import ScrollReveal from '../../ui/ScrollReveal';
import TimelineItem from '../TimelineItem';
import {
  Section,
  Wrapper,
  Title,
  Columns,
  Column,
  ColumnHead,
  TimelineList,
} from './Timeline.styles';

const Timeline = () => {
  return (
    <Section id="experience" aria-labelledby="timeline-title">
      <Wrapper>
        <ScrollReveal>
          <Eyebrow $number="003">JOURNEY</Eyebrow>
          <Title id="timeline-title">Experience & education</Title>

          <Columns>
            <Column>
              <ColumnHead $color="kincha">Experience</ColumnHead>
              <TimelineList>
                {experience.map((role) => (
                  <TimelineItem
                    key={`${role.period}-${role.role}`}
                    period={role.period}
                    role={role.role}
                    org={role.org}
                    color={role.color}
                    desc={role.desc}
                    points={role.points}
                  />
                ))}
              </TimelineList>
            </Column>

            <Column>
              <ColumnHead $color="matcha">Education</ColumnHead>
              <TimelineList>
                {education.map((edu) => (
                  <TimelineItem
                    key={`${edu.period}-${edu.role}`}
                    period={edu.period}
                    role={edu.role}
                    org={edu.org}
                    color={edu.color}
                    desc={edu.desc}
                  />
                ))}
              </TimelineList>
            </Column>
          </Columns>
        </ScrollReveal>
      </Wrapper>
    </Section>
  );
};

export default Timeline;
