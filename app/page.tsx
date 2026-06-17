import { Hero } from '@/components/hero';
import About from '@/components/about/About';
import Skills from '@/components/skills/Skills';
import Timeline from '@/components/timeline/Timeline';
import Projects from '@/components/projects/Projects';

const Home = () => {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <Projects />
    </main>
  );
};
export default Home;
