import React from 'react';
import { contact } from '@/content/data';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Eyebrow from '@/components/ui/Eyebrow';
import ContactCard from './ContactCard';
import {
  Main,
  TitleScreen,
  TitleWrapper,
  Breadcrumb,
  ContentSection,
  Title,
  Subtitle,
  ContactsGrid,
  CVButton,
} from './Contacts.styles';

const Contacts = () => {
  return (
    <Main id="main-content">
      <TitleScreen>
        <TitleWrapper>
          CONTACTS
          <span className="ghost" aria-hidden="true">CONTACTS</span>
        </TitleWrapper>
        <Breadcrumb>
          Home / <strong>Contacts</strong>
        </Breadcrumb>
      </TitleScreen>

      <ContentSection>
        <ScrollReveal>
          <Eyebrow $number="005">CONTACT</Eyebrow>
          <Title>{contact.head}</Title>
          <Subtitle>{contact.sub}</Subtitle>
          <ContactsGrid>
            {contact.items.map((item) => (
              <ContactCard key={item.kind} item={item} />
            ))}
          </ContactsGrid>
          <CVButton href="/cv.pdf" target="_blank" rel="noopener noreferrer">
            Download CV ↓
          </CVButton>
        </ScrollReveal>
      </ContentSection>
    </Main>
  );
};

export default Contacts;
