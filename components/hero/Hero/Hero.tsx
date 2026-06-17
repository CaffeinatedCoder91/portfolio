import React from 'react';
import {
  HeroSection,
  GlyphsLayer,
  HeroInner,
  TextColumn,
  HeroName,
  RoleLine,
  Mark,
  LocationLine,
  LocationDot,
  LocationSeparator,
  Tagline,
  ButtonGroup,
  PhotoColumn,
  PhotoAccent,
  PhotoWrapper,
  PhotoImage,
} from './Hero.styles';
import InkCanvas from './InkCanvas';
import InkCanvasErrorBoundary from './InkCanvasErrorBoundary';
import HeroClient from './HeroClient';
import GlyphMarks from './GlyphMarks';
import ScrollCue from './ScrollCue';
import Button from '@/components/ui/Button';
import { name, role, tagline, location, timezone } from '@/content/data';

interface Props {
  inkCanvas?: React.ReactNode;
}

const parseRole = (text: string): (string | React.ReactNode)[] => {
  const parts = text.split(/(\{\{[^}]+\}\})/);

  return parts.map((part) => {
    if (part.startsWith('{{') && part.endsWith('}}')) {
      const content = part.slice(2, -2);
      return <Mark key={part}>{content}</Mark>;
    }
    return part;
  });
};

const Hero = ({ inkCanvas }: Props) => {
  const parsedRole = parseRole(role);
  const canvasLayer = inkCanvas === undefined ? <InkCanvas /> : inkCanvas;

  return (
    <HeroSection>
      <GlyphsLayer aria-hidden="true">
        <GlyphMarks />
      </GlyphsLayer>

      <InkCanvasErrorBoundary>
        {canvasLayer}
      </InkCanvasErrorBoundary>

      <HeroInner>
        <TextColumn>
          <HeroName>{name}</HeroName>

          <RoleLine>{parsedRole}</RoleLine>

          <LocationLine>
            <LocationDot />
            <span>{location}</span>
            <LocationSeparator>·</LocationSeparator>
            <HeroClient timezone={timezone} />
          </LocationLine>

          <Tagline>{tagline}</Tagline>

          <ButtonGroup>
            <Button $variant="primary" href="/#projects">
              See my projects →
            </Button>
            <Button $variant="ghost" href="/contacts">
              Get in touch
            </Button>
            <Button
              $variant="cv"
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              CV ↓
            </Button>
          </ButtonGroup>
        </TextColumn>

        <PhotoColumn>
          <PhotoAccent />
          <PhotoWrapper>
            <PhotoImage
              src="/joanna-photo.jpg"
              alt="Joanna Joseph"
              width={600}
              height={600}
              priority
            />
          </PhotoWrapper>
        </PhotoColumn>
      </HeroInner>

      <ScrollCue />
    </HeroSection>
  );
};

export default Hero;
