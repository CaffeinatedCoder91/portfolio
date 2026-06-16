import React from 'react';
import type { TokenColor } from '../../../lib/types';
import {
  TimelineItemWrapper,
  DatePill,
  Role as RoleHeading,
  Org,
  Description,
  PointsList,
} from '../Timeline/Timeline.styles';

interface TimelineItemProps {
  period: string;
  role: string;
  org: string;
  color: TokenColor;
  desc?: string;
  points?: string[];
}

const TimelineItem = ({
  period,
  role,
  org,
  color,
  desc,
  points,
}: TimelineItemProps) => {
  return (
    <TimelineItemWrapper $color={color}>
      <DatePill>{period}</DatePill>
      <RoleHeading>{role}</RoleHeading>
      <Org>{org}</Org>

      {desc && !points && <Description>{desc}</Description>}

      {points && (
        <PointsList $color={color}>
          {points.map((point: string) => (
            <li key={point}>{point}</li>
          ))}
        </PointsList>
      )}
    </TimelineItemWrapper>
  );
};

export default TimelineItem;
