import type { Meta, StoryObj } from '@storybook/nextjs';
import ContactCard from '@/components/contacts/Contacts/ContactCard';
import type { ContactItem } from '@/lib/types';

const meta: Meta<typeof ContactCard> = {
  title: 'Components/ContactCard',
  component: ContactCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContactCard>;

const emailItem: ContactItem = {
  kind: 'Email',
  color: 'shu',
  glyph: '@',
  value: 'joannamjosep@gmail.com',
  href: 'mailto:joannamjosep@gmail.com',
};

const phoneItem: ContactItem = {
  kind: 'Phone',
  color: 'ai',
  glyph: '☎',
  value: '07388 039256',
  href: 'tel:+447388039256',
};

const linkedinItem: ContactItem = {
  kind: 'LinkedIn',
  color: 'mizu',
  glyph: 'in',
  value: 'joannamjoseph',
  href: 'https://linkedin.com/in/joannamjoseph',
};

const githubItem: ContactItem = {
  kind: 'GitHub',
  color: 'fuji',
  glyph: '</>',
  value: 'CaffeinatedCoder91',
  href: 'https://github.com/CaffeinatedCoder91',
};

export const Email: Story = {
  args: {
    item: emailItem,
  },
};

export const Phone: Story = {
  args: {
    item: phoneItem,
  },
};

export const LinkedIn: Story = {
  args: {
    item: linkedinItem,
  },
};

export const GitHub: Story = {
  args: {
    item: githubItem,
  },
};
