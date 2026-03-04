// src/App.jsx
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

function App() {
  return (
    <div>
      <CustomCursor />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Research />
      <Projects />
      <Experience />
      <Highlights />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  )
}

export default App