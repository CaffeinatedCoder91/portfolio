import React from 'react';
import type { ContactItem } from '@/lib/types';
import { Card, IconWrapper, Glyph, Label, Value } from './ContactCard.styles';

interface Props {
  item: ContactItem;
}

const ContactCard = ({ item }: Props) => {
  const isExternal = item.href.startsWith('http');
  const relProps = isExternal ? { rel: 'noopener noreferrer', target: '_blank' } : {};

  return (
    <Card $color={item.color}>
      <IconWrapper $color={item.color}>
        <Glyph>{item.glyph}</Glyph>
      </IconWrapper>
      <Label>{item.kind}</Label>
      <Value href={item.href} {...relProps}>
        {item.value}
      </Value>
    </Card>
  );
};

export default ContactCard;
