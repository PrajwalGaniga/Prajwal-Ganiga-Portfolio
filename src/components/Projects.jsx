// src/components/Projects.jsx - COMPLETELY REDESIGNED FOR MOBILE
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Projects.module.css';
import ProjectCard from './ProjectCard.jsx';

// AYU-EAT images
import ayush1 from '../assets/images/project_ayu/ayush-1.png';
import ayush2 from '../assets/images/project_ayu/ayush-2.png';
import ayush3 from '../assets/images/project_ayu/ayush-3.png';

// Aegis.ai images
import aegis1 from '../assets/images/project_aegis/aegis-1.jpeg';
import aegis2 from '../assets/images/project_aegis/aegis-2.png';
import aegis3 from '../assets/images/project_aegis/aegis-3.jpeg';
import aegis4 from '../assets/images/project_aegis/aegis-4.jpeg';

// Digital Biosecurity Portal (SIH) images
import sih1 from '../assets/images/project_sih/sih-1.jpeg';
import sih2 from '../assets/images/project_sih/sih-2.jpeg';
import sih3 from '../assets/images/project_sih/sih-3.jpeg';
import sih4 from '../assets/images/project_sih/sih-4.jpeg';

// Smart Classroom images
import smart1 from '../assets/images/project_1/project1.jpg';
import smart11 from '../assets/images/project_1/project11.png';
import smart12 from '../assets/images/project_1/project12.png';
import smart13 from '../assets/images/project_1/project13.png';

// NL2SQL images
import sql1 from '../assets/images/project_sql/project-sql.png';
import sql2 from '../assets/images/project_sql/project-sql1.png';
import sql3 from '../assets/images/project_sql/project-sql2.png';
import sql4 from '../assets/images/project_sql/project-sql3.png';

// FocusLy images
import focus1 from '../assets/images/project_2/project2.jpg';
import focus2 from '../assets/images/project_2/project21.png';
import focus3 from '../assets/images/project_2/project22.png';
import focus4 from '../assets/images/project_2/project23.png';

// Do It For Me images
import doIt1 from '../assets/images/project_6/project61.png';
import doIt2 from '../assets/images/project_6/project62.png';
import doIt3 from '../assets/images/project_6/project63.png';

// Enhanced project data
const projectsData = [
  {
    id: 1,
    title: 'AYU-EAT: Ayurvedic Vitality Platform',
    description: '🏆 2nd Place – AYUSH HABBA 2026 (70+ teams). Ayurvedic health platform that computes an Ojas Vitality Index from Prakriti/Agni biomarkers. Features a Vaidya Lens (YOLOv8) for real-time food analysis, Viruddha Ahara detection, and Gemini-powered bilingual medicinal recipes.',
    tech: 'Flutter, FastAPI, MongoDB, YOLOv8, Gemini API',
    githubLink: 'https://github.com/PrajwalGaniga/AYU-EAT',
    liveLink: null,
    images: [ayush1, ayush2, ayush3],
    category: 'health-tech',
    status: 'completed',
    featured: true,
    highlights: ['🏆 2nd Place AYUSH HABBA 2026', 'YOLOv8 Vaidya Lens', 'Ojas Vitality Index']
  },
  {
    id: 2,
    title: 'Digital Biosecurity Portal',
    description: 'SIH 2025 Top 5 Finalist – National-scale framework for secure management and predictive analysis of biological data. Designing knowledge frameworks to integrate large-scale clinical data with security protocols for national wellness programs.',
    tech: 'React, FastAPI, MongoDB, Python, ML Pipelines',
    githubLink: 'https://github.com/PrajwalGaniga',
    liveLink: null,
    images: [sih1, sih2, sih3, sih4],
    category: 'national-level',
    status: 'active',
    featured: true,
    highlights: ['SIH 2025 Top 5', 'Team Lead', 'National Biosecurity']
  },
  {
    id: 3,
    title: 'Smart Classroom',
    description: 'AI-powered personalized student quiz feedback system developed for Google Developers Group Hackathon. Features real-time analytics and adaptive learning paths.',
    tech: 'FastAPI, HTML, CSS, JS, MongoDB, Gemini API',
    githubLink: 'https://github.com/PrajwalGaniga/Student-Teacher-Feedback-AI_integrated',
    liveLink: 'https://smart-classroom-x7xs.onrender.com/',
    images: [smart1, smart11, smart13, smart12],
    category: 'ai-ml',
    status: 'completed',
    featured: false,
    highlights: ['AI Integration', 'Real-time Analytics', 'Adaptive Learning']
  },
  {
    id: 4,
    title: 'Aegis.ai – Mental Stress Analytics',
    description: 'AI-powered predictive tool to monitor psychological stress by translating subjective behavioral inputs into structured health markers. Supports long-term wellness tracking and early risk alerts for mental health optimization.',
    tech: 'React, FastAPI, Python, MongoDB, Gemini API',
    githubLink: 'https://github.com/PrajwalGaniga',
    liveLink: null,
    images: [aegis1, aegis2, aegis3, aegis4],
    category: 'health-tech',
    status: 'completed',
    featured: true,
    highlights: ['Stress Prediction', 'Behavioral Analytics', 'Early Risk Alerts']
  },
  {
    id: 5,
    title: 'Natural Language to SQL',
    description: 'Advanced AI tool that translates natural English queries into optimized SQL commands using transformer models. Features query validation and database schema understanding.',
    tech: 'Deep Learning, Transformers, Python, FastAPI, React',
    githubLink: 'https://github.com/PrajwalGaniga/NL2SQL',
    liveLink: null,
    images: [sql1, sql2, sql3, sql4],
    category: 'ai-ml',
    status: 'development',
    featured: false,
    highlights: ['Transformer Models', 'Query Optimization', 'Schema Understanding']
  },
  {
    id: 6,
    title: 'FocusLy – ToDo App',
    description: 'Productivity application with advanced features including smart alerts, Pomodoro timers, habit tracking, and comprehensive analytics dashboard.',
    tech: 'Flask, HTML, CSS, JS, MongoDB',
    githubLink: 'https://github.com/PrajwalGaniga/FocusLy-todo-flask-app',
    liveLink: 'https://focusly-todo-flask-app.onrender.com/',
    images: [focus1, focus2, focus3, focus4],
    category: 'web-app',
    status: 'completed',
    featured: false,
    highlights: ['Pomodoro Timer', 'Habit Tracking', 'Analytics Dashboard']
  },
  {
    id: 7,
    title: 'Do It For Me (Startup)',
    description: 'Self-initiated startup providing comprehensive development services including full-stack applications, AI integrations, and custom software solutions for clients.',
    tech: 'Varies (React, Node.js, Python, AI/ML, Cloud)',
    githubLink: 'https://github.com/PrajwalGaniga/Do-It-For-Me',
    liveLink: 'https://doitformebot.netlify.app/',
    images: [doIt1, doIt2, doIt3],
    category: 'startup',
    status: 'active',
    featured: false,
    highlights: ['Full-stack Development', 'AI Integration', 'Client Projects']
  }
];

// Floating Shapes Background Component
const FloatingShapes = () => {
  const shapes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    type: i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'square' : 'triangle',
    size: Math.random() * 30 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className={styles.floatingShapes}>
      {shapes.map(shape => (
        <motion.div
          key={shape.id}
          className={`${styles.shape} ${styles[shape.type]}`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            y: [0, -40, 0],
            rotate: shape.type === 'circle' ? [0, 180] : [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay
          }}
        />
      ))}
    </div>
  );
};

function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeProject, setActiveProject] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projectsData.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  return (
    <motion.section
      id="projects"
      className={styles.projectsSection}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Animated Background */}
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <FloatingShapes />
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.sectionBadge}>
            <span>🚀 My Creations</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Featured <span className={styles.gradientText}>Projects</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Explore my portfolio of innovative solutions and creative applications
          </p>
          <div className={styles.projectsCounter}>
            <span className={styles.counterCurrent}>{activeProject + 1}</span>
            <span className={styles.counterTotal}>/{projectsData.length}</span>
          </div>
        </motion.div>

        {/* Mobile Carousel */}
        <div className={styles.mobileCarousel}>
          <div className={styles.carouselContainer}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                className={styles.carouselSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
              >
                <ProjectCard
                  project={projectsData[activeProject]}
                  featured={projectsData[activeProject].featured}
                />
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className={styles.carouselControls}>
              <button
                className={styles.carouselBtn}
                onClick={prevProject}
                aria-label="Previous project"
              >
                <i className="fas fa-chevron-left"></i>
              </button>

              <div className={styles.carouselDots}>
                {projectsData.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.dot} ${activeProject === index ? styles.active : ''}`}
                    onClick={() => setActiveProject(index)}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>

              <button
                className={styles.carouselBtn}
                onClick={nextProject}
                aria-label="Next project"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className={styles.desktopGrid}>
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={project.featured}
              index={index}
            />
          ))}
        </div>

        {/* Projects Stats */}
        <motion.div
          className={styles.projectsStats}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className={styles.statItem}>
            <div className={styles.statIcon}>💼</div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>{projectsData.length}+</span>
              <span className={styles.statLabel}>Projects Completed</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statIcon}>⚡</div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>
                {projectsData.filter(p => p.status === 'completed').length}
              </span>
              <span className={styles.statLabel}>Live Projects</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statIcon}>🌟</div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>
                {projectsData.filter(p => p.featured).length}
              </span>
              <span className={styles.statLabel}>Featured Works</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Projects;