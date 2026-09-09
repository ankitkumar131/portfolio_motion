import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScroll, getLenis } from './lib/scroll.js';
import { profile } from './data/profile.js';
import Preloader from './components/Preloader.jsx';
import Cursor from './components/Cursor.jsx';
import Effects from './components/Effects.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initScroll();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    console.log(
      `%c★ YOU OPENED THE CONSOLE. NICE.%c\n\nCuriosity like that gets people hired.\nDrop a line → ${profile.email}`,
      'color:#ff2d95;font-size:18px;font-weight:bold;font-family:monospace',
      'color:#00e5ff;font-size:12px;font-family:monospace'
    );
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (loading) {
      lenis.stop();
    } else {
      lenis.start();
      ScrollTrigger.refresh();
    }
  }, [loading]);

  return (
    <>
      <Effects />
      <Cursor />
      <ProgressBar />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Nav ready={!loading} />
      <main>
        <Hero started={!loading} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
