// src/components/Projects.jsx — True Bento Grid for desktop, carousel for mobile
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Projects.module.css';
import ProjectCard from './ProjectCard.jsx';

import ayush1 from '../assets/images/project_ayu/ayush-1.png';
import ayush2 from '../assets/images/project_ayu/ayush-2.png';
import ayush3 from '../assets/images/project_ayu/ayush-3.png';

import aegis1 from '../assets/images/project_aegis/aegis-1.jpeg';
import aegis2 from '../assets/images/project_aegis/aegis-2.png';
import aegis3 from '../assets/images/project_aegis/aegis-3.jpeg';
import aegis4 from '../assets/images/project_aegis/aegis-4.jpeg';

import sih1 from '../assets/images/project_sih/sih-1.jpeg';
import sih2 from '../assets/images/project_sih/sih-2.jpeg';
import sih3 from '../assets/images/project_sih/sih-3.jpeg';
import sih4 from '../assets/images/project_sih/sih-4.jpeg';

import smart1 from '../assets/images/project_1/project1.jpg';
import smart11 from '../assets/images/project_1/project11.png';
import smart12 from '../assets/images/project_1/project12.png';
import smart13 from '../assets/images/project_1/project13.png';

import sql1 from '../assets/images/project_sql/project-sql.png';
import sql2 from '../assets/images/project_sql/project-sql1.png';
import sql3 from '../assets/images/project_sql/project-sql2.png';
import sql4 from '../assets/images/project_sql/project-sql3.png';

import focus1 from '../assets/images/project_2/project2.jpg';
import focus2 from '../assets/images/project_2/project21.png';
import focus3 from '../assets/images/project_2/project22.png';
import focus4 from '../assets/images/project_2/project23.png';

import doIt1 from '../assets/images/project_6/project61.png';
import doIt2 from '../assets/images/project_6/project62.png';
import doIt3 from '../assets/images/project_6/project63.png';

const projectsData = [
  {
    id: 1,
    title: 'AYU-EAT: Ayurvedic Vitality Platform',
    description: `AYU-EAT is an award-winning, AI-powered health-tech platform designed to bridge the gap between traditional Ayurvedic medicine and modern computational data science. Recognized with the 2nd Place award at the AYUSH HABBA 2026 IDEA Hackathon out of 70+ competing teams, the platform serves as a "Computable Health Engine" for personalized, preventive wellness.\n\nCore Technical Features:\n• Computable Health Engine: Translates Prakriti and Agni biomarkers into quantifiable metrics (Ojas Vitality Index).\n• Computer Vision (Vaidya Lens): Real-time meal analysis built on YOLOv8.\n• Predictive Safety Logic: Heuristic matrices detect Viruddha Ahara (toxic food combinations) and issue clinical warnings.\n• AI-Driven Therapeutics: Generative AI (Gemini API) processes biomarkers for hyper-personalized, bilingual medicinal recipes.`,
    tech: 'Flutter, FastAPI, MongoDB, YOLOv8, Gemini API',
    githubLink: 'https://github.com/PrajwalGaniga/AYU-EAT',
    liveLink: null,
    images: [ayush1, ayush2, ayush3],
    category: 'health-tech',
    status: 'completed',
    featured: true,
    highlights: ['🏆 2nd Place AYUSH HABBA 2026', 'YOLOv8 Vaidya Lens', 'Ojas Vitality Index'],
  },
  {
    id: 2,
    title: 'Digital Biosecurity Portal',
    description: '🏅 SIH 2025 Top 5 Finalist — National-scale framework for secure management and predictive analysis of biological data. Designing knowledge frameworks to integrate large-scale clinical data with security protocols for national wellness programs.',
    tech: 'React, FastAPI, MongoDB, Python, ML Pipelines',
    githubLink: 'https://github.com/PrajwalGaniga',
    liveLink: null,
    images: [sih1, sih2, sih3, sih4],
    category: 'national-level',
    status: 'active',
    featured: true,
    highlights: ['🏅 SIH 2025 Top 5', 'Team Lead', 'National Biosecurity'],
  },
  {
    id: 3,
    title: 'Aegis.ai – Mental Stress Analytics',
    description: 'AI-powered predictive tool to monitor psychological stress by translating subjective behavioral inputs into structured health markers. Supports long-term wellness tracking and early risk alerts.',
    tech: 'React, FastAPI, Python, MongoDB, Gemini API',
    githubLink: 'https://github.com/PrajwalGaniga',
    liveLink: null,
    images: [aegis1, aegis2, aegis3, aegis4],
    category: 'health-tech',
    status: 'completed',
    featured: true,
    highlights: ['Stress Prediction', 'Behavioral Analytics', 'Early Risk Alerts'],
  },
  {
    id: 4,
    title: 'Smart Classroom',
    description: 'AI-powered personalized student quiz feedback system for the Google Developers Group Hackathon. Features real-time analytics and adaptive learning paths.',
    tech: 'FastAPI, HTML, CSS, JS, MongoDB, Gemini API',
    githubLink: 'https://github.com/PrajwalGaniga/Student-Teacher-Feedback-AI_integrated',
    liveLink: 'https://smart-classroom-x7xs.onrender.com/',
    images: [smart1, smart11, smart13, smart12],
    category: 'ai-ml',
    status: 'completed',
    featured: false,
    highlights: ['AI Integration', 'Real-time Analytics', 'Adaptive Learning'],
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
    highlights: ['Transformer Models', 'Query Optimization', 'Schema Understanding'],
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
    highlights: ['Pomodoro Timer', 'Habit Tracking', 'Analytics Dashboard'],
  },
  {
    id: 7,
    title: 'Do It For Me (Startup)',
    description: 'Self-initiated startup providing comprehensive development services including full-stack applications, AI integrations, and custom software solutions.',
    tech: 'React, Node.js, Python, AI/ML, Cloud',
    githubLink: 'https://github.com/PrajwalGaniga/Do-It-For-Me',
    liveLink: 'https://doitformebot.netlify.app/',
    images: [doIt1, doIt2, doIt3],
    category: 'startup',
    status: 'active',
    featured: false,
    highlights: ['Full-stack Development', 'AI Integration', 'Client Projects'],
  },
];

const CATEGORIES = ['all', 'health-tech', 'ai-ml', 'national-level', 'startup', 'web-app'];

function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSlide, setActiveSlide] = useState(0);

  const filtered = activeFilter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className={styles.section} ref={ref}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.sectionBadge}>🚀 My Creations</div>
          <h2 className={styles.sectionTitle}>
            Featured <span className={styles.gradientText}>Projects</span>
          </h2>
          <p className={styles.sectionSub}>
            {projectsData.length} projects building the frontier of AI-powered health technology
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterBtnActive : ''}`}
              onClick={() => { setActiveFilter(cat); setActiveSlide(0); }}
            >
              {cat === 'all' ? 'All Projects' : cat}
            </button>
          ))}
        </motion.div>

        {/* Desktop Bento Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className={styles.bentoGrid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className={`${styles.bentoCell} ${project.featured && i === 0 ? styles.bentoCellHero : ''}`}
              >
                <ProjectCard project={project} featured={project.featured && i === 0} index={i} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Mobile Carousel */}
        <div className={styles.mobileCarousel}>
          <div className={styles.carouselSlide}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.35 }}
              >
                <ProjectCard project={filtered[activeSlide % filtered.length]} featured={filtered[activeSlide % filtered.length]?.featured} index={0} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className={styles.carouselNav}>
            <button
              className={styles.navBtn}
              onClick={() => setActiveSlide((s) => (s - 1 + filtered.length) % filtered.length)}
              aria-label="Previous"
            >
              <i className="fas fa-chevron-left" />
            </button>
            <div className={styles.dots}>
              {filtered.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === activeSlide % filtered.length ? styles.dotActive : ''}`}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Project ${i + 1}`}
                />
              ))}
            </div>
            <button
              className={styles.navBtn}
              onClick={() => setActiveSlide((s) => (s + 1) % filtered.length)}
              aria-label="Next"
            >
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className={styles.statsRow}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {[
            { icon: '💼', val: `${projectsData.length}+`, label: 'Projects Built' },
            { icon: '⚡', val: `${projectsData.filter(p => p.liveLink).length}`, label: 'Live Apps' },
            { icon: '🌟', val: `${projectsData.filter(p => p.featured).length}`, label: 'Featured Works' },
          ].map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statIcon}>{s.icon}</span>
              <span className={styles.statVal}>{s.val}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;