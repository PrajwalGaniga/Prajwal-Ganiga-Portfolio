// src/components/Skills.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Skills.module.css';

// Enhanced skills data with categories, levels, and colors
const skillsData = [
  // Technical Skills
  { 
    name: 'React & Next.js', 
    icon: 'fab fa-react',
    category: 'frontend',
    level: 90,
    color: '#61DAFB',
    gradient: 'linear-gradient(135deg, #61DAFB, #21A4C9)',
    description: 'Modern React development with hooks, context, and Next.js for SSR'
  },
  { 
    name: 'Python & FastAPI', 
    icon: 'fab fa-python',
    category: 'backend',
    level: 85,
    color: '#3776AB',
    gradient: 'linear-gradient(135deg, #3776AB, #2D5D7C)',
    description: 'Backend development with Python, Flask, FastAPI, and RESTful APIs'
  },
  { 
    name: 'SQL & NoSQL', 
    icon: 'fas fa-database',
    category: 'database',
    level: 80,
    color: '#336791',
    gradient: 'linear-gradient(135deg, #336791, #274D6B)',
    description: 'Database design with PostgreSQL, MongoDB, and data modeling'
  },
  { 
    name: 'Deep Learning', 
    icon: 'fas fa-brain',
    category: 'ai-ml',
    level: 75,
    color: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #FF6B6B, #EE5A52)',
    description: 'Neural networks, TensorFlow, and machine learning applications'
  },
  
  // Design Skills
  { 
    name: 'UI/UX Design', 
    icon: 'fas fa-paint-brush',
    category: 'design',
    level: 85,
    color: '#9C27B0',
    gradient: 'linear-gradient(135deg, #9C27B0, #7B1FA2)',
    description: 'User interface design, prototyping, and user experience research'
  },
  { 
    name: 'Canvas & Graphics', 
    icon: 'fas fa-palette',
    category: 'design',
    level: 80,
    color: '#E91E63',
    gradient: 'linear-gradient(135deg, #E91E63, #C2185B)',
    description: 'HTML5 Canvas, creative coding, and interactive graphics'
  },
  { 
    name: 'Web Animation', 
    icon: 'fas fa-magic',
    category: 'frontend',
    level: 75,
    color: '#00BCD4',
    gradient: 'linear-gradient(135deg, #00BCD4, #0097A7)',
    description: 'CSS animations, Framer Motion, and interactive web experiences'
  },
  
  // Professional Skills
  { 
    name: 'Technical Communication', 
    icon: 'fas fa-comments',
    category: 'professional',
    level: 90,
    color: '#4CAF50',
    gradient: 'linear-gradient(135deg, #4CAF50, #388E3C)',
    description: 'Clear technical documentation and team communication'
  },
  { 
    name: 'Project Leadership', 
    icon: 'fas fa-user-tie',
    category: 'professional',
    level: 85,
    color: '#FF9800',
    gradient: 'linear-gradient(135deg, #FF9800, #F57C00)',
    description: 'Team leadership, project planning, and agile development'
  },
  { 
    name: 'Event Management', 
    icon: 'fas fa-calendar-alt',
    category: 'professional',
    level: 80,
    color: '#607D8B',
    gradient: 'linear-gradient(135deg, #607D8B, #455A64)',
    description: 'Organizing tech events, workshops, and community meetups'
  },
  { 
    name: 'Problem Solving', 
    icon: 'fas fa-puzzle-piece',
    category: 'professional',
    level: 95,
    color: '#795548',
    gradient: 'linear-gradient(135deg, #795548, #5D4037)',
    description: 'Analytical thinking and creative solution development'
  }
];

// Skill Card Component with 3D effects
const SkillCard = ({ skill, isSelected, onClick, index }) => {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.skillCard} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -15,
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated Background Gradient */}
      <div 
        className={styles.cardGradient}
        style={{ background: skill.gradient }}
      />
      
      {/* Glow Effect */}
      <div className={styles.cardGlow} />
      
      <div className={styles.cardContent}>
        {/* Icon with floating animation */}
        <motion.div 
          className={styles.iconContainer}
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <i className={skill.icon} style={{ color: skill.color }}></i>
        </motion.div>

        {/* Skill Name */}
        <h3 className={styles.skillName}>{skill.name}</h3>
        
        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <motion.div 
            className={styles.progressBar}
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
            style={{ background: skill.gradient }}
          />
          <span className={styles.progressText}>{skill.level}%</span>
        </div>

        {/* Category Badge */}
        <div className={styles.categoryBadge}>
          {skill.category}
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <motion.div 
          className={styles.selectionRing}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
      )}
    </motion.div>
  );
};

// Floating Particles Background
const FloatingParticles = () => {
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

// Main Component
function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  // Unique categories
  const categories = ['all', ...new Set(skillsData.map(skill => skill.category))];

  // Filter skills by category
  const filteredSkills = skillsData.filter(skill => 
    activeCategory === 'all' || skill.category === activeCategory
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.section 
      id="skills" 
      className={styles.skillsSection}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Animated Background */}
      <div className={styles.backgroundElements}>
        <div className={styles.floatingOrb1}></div>
        <div className={styles.floatingOrb2}></div>
        <FloatingParticles />
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
            <span>🚀 Skills & Expertise</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Technical <span className={styles.gradientText}>Proficiency</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            A showcase of my technical skills and professional capabilities
          </p>
          <div className={styles.titleDivider}></div>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className={styles.categoryFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map(category => (
            <motion.button
              key={category}
              className={`${styles.categoryBtn} ${
                activeCategory === category ? styles.active : ''
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === 'all' ? 'All Skills' : category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className={styles.skillsGrid}
          layout
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                isSelected={selectedSkill?.name === skill.name}
                onClick={() => setSelectedSkill(
                  selectedSkill?.name === skill.name ? null : skill
                )}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Skill Detail Panel */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              className={styles.detailPanel}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.detailHeader}>
                <div className={styles.detailIcon}>
                  <i className={selectedSkill.icon}></i>
                </div>
                <div className={styles.detailTitle}>
                  <h3>{selectedSkill.name}</h3>
                  <span className={styles.detailCategory}>
                    {selectedSkill.category}
                  </span>
                </div>
                <button 
                  className={styles.closeBtn}
                  onClick={() => setSelectedSkill(null)}
                >
                  ×
                </button>
              </div>
              
              <div className={styles.detailContent}>
                <p>{selectedSkill.description}</p>
                
                <div className={styles.skillStats}>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{selectedSkill.level}%</span>
                    <span className={styles.statLabel}>Proficiency</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>
                      {selectedSkill.category}
                    </span>
                    <span className={styles.statLabel}>Category</span>
                  </div>
                </div>

                <div className={styles.skillLevel}>
                  <div className={styles.levelBar}>
                    <motion.div 
                      className={styles.levelFill}
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      style={{ background: selectedSkill.gradient }}
                    />
                  </div>
                  <div className={styles.levelLabels}>
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Advanced</span>
                    <span>Expert</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skills Summary */}
        <motion.div 
          className={styles.skillsSummary}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>{skillsData.length}</span>
            <span className={styles.summaryLabel}>Skills</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>
              {categories.length - 1}
            </span>
            <span className={styles.summaryLabel}>Categories</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>
              {Math.round(skillsData.reduce((acc, skill) => acc + skill.level, 0) / skillsData.length)}%
            </span>
            <span className={styles.summaryLabel}>Average Proficiency</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Skills;