// src/App.jsx — Orchestrates loader → terminal → main portfolio
import React, { useState, useEffect } from 'react';
import PageLoader from './components/PageLoader.jsx';
import TerminalColorPicker from './components/TerminalColorPicker.jsx';
import ContactModal from './components/ContactModal.jsx';
import Hero from './components/Hero.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import About from './components/About.jsx';
import Education from './components/Education.jsx';
import Skills from './components/Skills.jsx';
import Research from './components/Research.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import Highlights from './components/Highlights.jsx';
import Achievements from './components/Achievements.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import SmoothScrollProvider from './components/SmoothScrollProvider.jsx';

// ── Expose openContactModal globally so any CTA can trigger it ──
export let openContactModal = null;

function App() {
  // Phases: 'loading' → 'terminal' → 'ready'
  const [phase, setPhase] = useState('loading');
  const [theme, setTheme] = useState('dark');
  const [contactOpen, setContactOpen] = useState(false);

  // Register global opener
  useEffect(() => {
    openContactModal = () => setContactOpen(true);
    return () => { openContactModal = null; };
  }, []);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleLoaderDone = () => {
    // Check if already chose theme before (sessionStorage)
    const savedTheme = sessionStorage.getItem('pg-theme');
    if (savedTheme) {
      setTheme(savedTheme);
      setPhase('ready');
    } else {
      setPhase('terminal');
    }
  };

  const handleThemeSelect = (chosen) => {
    setTheme(chosen);
    sessionStorage.setItem('pg-theme', chosen);
    setPhase('ready');
  };

  return (
    <>
      {/* Page loader — always shows first */}
      {phase === 'loading' && (
        <PageLoader onDone={handleLoaderDone} />
      )}

      {/* Terminal theme picker */}
      {phase === 'terminal' && (
        <TerminalColorPicker onSelect={handleThemeSelect} />
      )}

      {/* Main portfolio */}
      {phase === 'ready' && (
        <SmoothScrollProvider>
          <CustomCursor />
          <Hero onContactClick={() => setContactOpen(true)} />
          <About />
          <Education />
          <Skills />
          <Research />
          <Projects />
          <Experience />
          <Highlights />
          <Achievements />
          <Contact onContactClick={() => setContactOpen(true)} />
          <Footer />
        </SmoothScrollProvider>
      )}

      {/* Contact modal — renders on top of everything */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

export default App;