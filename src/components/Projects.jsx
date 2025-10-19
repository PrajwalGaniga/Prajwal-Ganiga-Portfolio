// src/components/Projects.jsx - COMPLETELY REDESIGNED FOR MOBILE
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Projects.module.css';
import ProjectCard from './ProjectCard.jsx';

// Enhanced project data
const projectsData = [
  {
    id: 1,
    title: 'Smart Classroom',
    description: 'AI-powered personalized student quiz feedback system developed for Google Developers Group Hackathon. Features real-time analytics and adaptive learning paths.',
    tech: 'FastAPI, HTML, CSS, JS, MongoDB, Gemini API',
    githubLink: 'https://github.com/PrajwalGaniga/Student-Teacher-Feedback-AI_integrated',
    liveLink: 'https://smart-classroom-x7xs.onrender.com/',
    images: ['project1.jpg', 'project11.png', 'project13.png', 'project12.png'],
    category: 'ai-ml',
    status: 'completed',
    featured: true,
    highlights: ['AI Integration', 'Real-time Analytics', 'Adaptive Learning']
  },
  {
    id: 2,
    title: 'Natural Language to SQL',
    description: 'Advanced AI tool that translates natural English queries into optimized SQL commands using transformer models. Features query validation and database schema understanding.',
    tech: 'Deep Learning, Transformers, Python, FastAPI, React',
    githubLink: 'https://github.com/PrajwalGaniga/NL2SQL',
    liveLink: null,
    images: ['project-sql.png','project-sql1.png','project-sql2.png','project-sql3.png'],
    category: 'ai-ml',
    status: 'development',
    featured: true,
    highlights: ['Transformer Models', 'Query Optimization', 'Schema Understanding']
  },
  {
    id: 3,
    title: 'FocusLy – ToDo App',
    description: 'Productivity application with advanced features including smart alerts, Pomodoro timers, habit tracking, and comprehensive analytics dashboard.',
    tech: 'Flask, HTML, CSS, JS, MongoDB',
    githubLink: 'https://github.com/PrajwalGaniga/FocusLy-todo-flask-app',
    liveLink: 'https://focusly-todo-flask-app.onrender.com/',
    images: ['project2.jpg', 'project21.png', 'project22.png', 'project23.png'],
    category: 'web-app',
    status: 'completed',
    featured: false,
    highlights: ['Pomodoro Timer', 'Habit Tracking', 'Analytics Dashboard']
  },
  {
    id: 4,
    title: 'Doctor-Patient Translator',
    description: 'Real-time multilingual medical communication assistant using deep learning for accurate translation and text-to-speech capabilities.',
    tech: 'RNNs, Transformers, Deep Learning, Python',
    githubLink: 'https://github.com/PrajwalGaniga',
    liveLink: null,
    images: ['project5.jpg', 'project51.png','project52.png','project53.png'],
    category: 'ai-ml',
    status: 'development',
    featured: false,
    highlights: ['Real-time Translation', 'Medical Terminology', 'Text-to-Speech']
  },
  {
    id: 5,
    title: 'Do It For Me (Startup)',
    description: 'Self-initiated startup providing comprehensive development services including full-stack applications, AI integrations, and custom software solutions for clients.',
    tech: 'Varies (React, Node.js, Python, AI/ML, Cloud)',
    githubLink: 'https://github.com/PrajwalGaniga/Do-It-For-Me',
    liveLink: 'https://doitformebot.netlify.app/',
    images: ['project61.png', 'project62.png', 'project63.png'],
    category: 'startup',
    status: 'active',
    featured: true,
    highlights: ['Full-stack Development', 'AI Integration', 'Client Projects']
  },
  {
    id: 6,
    title: 'Volunteer Connection Hub',
    description: 'Modern volunteer coordination platform with intuitive UX, real-time matching, and comprehensive management tools for organizations.',
    tech: 'HTML, CSS, JS (Frontend)',
    githubLink: 'https://github.com/PrajwalGaniga/Public-Volunteer-HUB',
    liveLink: null,
    images: ['project3.jpg', 'project31.png', 'project32.png', 'project33.png'],
    category: 'web-app',
    status: 'completed',
    featured: false,
    highlights: ['Volunteer Matching', 'Event Management', 'Real-time Updates']
  },
  {
    id: 7,
    title: 'JobCycle (All-in-One Help System)',
    description: 'Comprehensive job management ecosystem with multi-role access, automated workflows, and integrated communication systems.',
    tech: 'HTML, CSS, JS, Minimal PHP',
    githubLink: 'https://github.com/PrajwalGaniga/code-forge',
    liveLink: null,
    images: ['project4.jpg', 'project41.png', 'project42.png', 'project43.png'],
    category: 'web-app',
    status: 'completed',
    featured: false,
    highlights: ['Multi-role System', 'Workflow Automation', 'Integrated Communication']
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