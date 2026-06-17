import type { Metadata } from 'next';
import { Hero } from '@/components/hero';
import About from '@/components/about/About';
import Skills from '@/components/skills/Skills';
import Timeline from '@/components/timeline/Timeline';
import Projects from '@/components/projects/Projects';
import { CTA } from '@/components/cta';

export const metadata: Metadata = {
  title: 'Frontend Engineer',
  description: 'AI-native frontend engineer building LLM-powered products. React, TypeScript, Next.js.',
};

const Home = () => {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <Projects />
      <CTA />
    </main>
  );
};
export default Home;
