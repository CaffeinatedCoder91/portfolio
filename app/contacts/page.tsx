import type { Metadata } from 'next';
import { Contacts } from '@/components/contacts';

export const metadata: Metadata = {
  title: 'Contacts',
  description: 'Get in touch — email, phone, or connect on LinkedIn and GitHub.',
};

const ContactsPage = () => {
  return <Contacts />;
};

export default ContactsPage;
