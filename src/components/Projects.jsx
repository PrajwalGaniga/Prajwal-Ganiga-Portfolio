// src/components/Projects.jsx - FIXED FOR MOBILE
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Projects.module.css';
import ProjectCard from './ProjectCard.jsx';

// Enhanced project data with categories, status, and features
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

// Particle Background Component
const ParticleBackground = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10
  }));

  return (
    <div className={styles.particlesContainer}>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={styles.particle}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
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

  const [activeFilter, setActiveFilter] = useState('all');

  // Unique categories
  const categories = ['all', ...new Set(projectsData.map(project => project.category))];

  // Filter projects
  const filteredProjects = projectsData.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  // Featured projects
  const featuredProjects = projectsData.filter(project => project.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
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
        <div className={styles.floatingOrb1}></div>
        <div className={styles.floatingOrb2}></div>
        <ParticleBackground />
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
            <span>🚀 Portfolio Showcase</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Innovative <span className={styles.gradientText}>Projects</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            A collection of my technical creations, from AI-powered solutions to full-stack applications
          </p>
          <div className={styles.titleDivider}></div>
        </motion.div>

        {/* Featured Projects */}
        {activeFilter === 'all' && (
          <motion.div 
            className={styles.featuredSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className={styles.featuredTitle}>Featured Projects</h3>
            <div className={styles.featuredGrid}>
              {featuredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  featured={true}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Controls */}
        <motion.div 
          className={styles.controls}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Category Filter */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Filter by:</span>
            <div className={styles.filterButtons}>
              {categories.map(category => (
                <motion.button
                  key={category}
                  className={`${styles.filterBtn} ${
                    activeFilter === category ? styles.active : ''
                  }`}
                  onClick={() => setActiveFilter(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category === 'all' ? 'All Projects' : category}
                  {category !== 'all' && (
                    <span className={styles.projectCount}>
                      {projectsData.filter(p => p.category === category).length}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className={styles.projectsGrid}
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={project.featured}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Projects Summary */}
        <motion.div 
          className={styles.projectsSummary}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>{projectsData.length}</span>
            <span className={styles.summaryLabel}>Total Projects</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>
              {projectsData.filter(p => p.status === 'completed').length}
            </span>
            <span className={styles.summaryLabel}>Completed</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>
              {categories.length - 1}
            </span>
            <span className={styles.summaryLabel}>Categories</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>
              {featuredProjects.length}
            </span>
            <span className={styles.summaryLabel}>Featured</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Projects;