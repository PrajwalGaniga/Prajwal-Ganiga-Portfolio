// src/App.jsx
import Hero from './components/Hero.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import About from './components/About.jsx';
import Education from './components/Education.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import Highlights from './components/Highlights.jsx';
import Achievements from './components/Achievements.jsx';
import Contact from './components/Contact.jsx'; // 1. Import
import Footer from './components/Footer.jsx';   // 2. Import

function App() {
  return (
    <div>
      <CustomCursor />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Experience />
      <Highlights />
      <Achievements />
      <Contact /> {/* 3. Add it here */}
      <Footer />  {/* 4. Add it here */}
    </div>
  )
}

export default App