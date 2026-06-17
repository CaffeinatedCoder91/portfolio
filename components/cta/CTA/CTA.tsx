import React from 'react';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Section, Wrapper, Title, ButtonGroup } from './CTA.styles';

const CTA = () => {
  return (
    <Section id="cta" aria-labelledby="cta-title">
      <Wrapper>
        <ScrollReveal>
          <Title id="cta-title">Like what you see? Let&apos;s build something.</Title>
          <ButtonGroup>
            <Button $variant="primary" href="/#projects">
              Browse projects →
            </Button>
            <Button $variant="ghost" href="/contacts">
              Say hello
            </Button>
          </ButtonGroup>
        </ScrollReveal>
      </Wrapper>
    </Section>
  );
};

export default CTA;
