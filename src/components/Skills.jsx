// src/components/Skills.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Skills.module.css';

// Enhanced skills data with specialist categories
const skillsData = [
  // AI & Deep Learning
  {
    name: 'Transformers & BERT',
    icon: 'fas fa-brain',
    category: 'ai-research',
    level: 88,
    color: '#A855F7',
    gradient: 'linear-gradient(135deg, #A855F7, #7C3AED)',
    description: 'Neural Machine Translation, BERT-based architectures, achieving 0.7747 BLEU score in Medical NMT'
  },
  {
    name: 'YOLOv8 & Computer Vision',
    icon: 'fas fa-eye',
    category: 'ai-research',
    level: 82,
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899, #BE185D)',
    description: 'Real-time object detection for Vaidya Lens food analysis in the AYU-EAT platform'
  },
  {
    name: 'TensorFlow & Keras',
    icon: 'fas fa-network-wired',
    category: 'ai-research',
    level: 85,
    color: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #FF6B6B, #EE5A52)',
    description: 'Deep learning model training, CNNs, RNNs, and predictive health models'
  },
  {
    name: 'Neural Machine Translation',
    icon: 'fas fa-language',
    category: 'ai-research',
    level: 80,
    color: '#6366F1',
    gradient: 'linear-gradient(135deg, #6366F1, #4338CA)',
    description: 'English-to-Kannada Medical NMT, published in IEEE Xplore 2025'
  },

  // Health-Tech & Ayurvedic Computing
  {
    name: 'Computable Health Modeling',
    icon: 'fas fa-heartbeat',
    category: 'health-tech',
    level: 85,
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981, #047857)',
    description: 'Prakriti, Agni, Dosha modeling, and Ojas Vitality Indexing for Ayurvedic platforms'
  },
  {
    name: 'Clinical Decision Support',
    icon: 'fas fa-stethoscope',
    category: 'health-tech',
    level: 78,
    color: '#34D399',
    gradient: 'linear-gradient(135deg, #34D399, #059669)',
    description: 'CDSS design, Viruddha Ahara (toxic combination) detection heuristics'
  },
  {
    name: 'Ayurvedic Data Architecture',
    icon: 'fas fa-leaf',
    category: 'health-tech',
    level: 80,
    color: '#6EE7B7',
    gradient: 'linear-gradient(135deg, #6EE7B7, #10B981)',
    description: 'Structuring ancient Ayurvedic principles into computable, queryable data models'
  },

  // Full-Stack Engineering
  {
    name: 'React & Next.js',
    icon: 'fab fa-react',
    category: 'full-stack',
    level: 90,
    color: '#61DAFB',
    gradient: 'linear-gradient(135deg, #61DAFB, #21A4C9)',
    description: 'Modern React 19 development with hooks, Framer Motion, and Next.js for SSR'
  },
  {
    name: 'FastAPI & Python',
    icon: 'fab fa-python',
    category: 'full-stack',
    level: 88,
    color: '#3776AB',
    gradient: 'linear-gradient(135deg, #3776AB, #2D5D7C)',
    description: 'Asynchronous backend APIs, REST design, and ML model deployment'
  },
  {
    name: 'Flutter (Mobile UI/UX)',
    icon: 'fas fa-mobile-alt',
    category: 'full-stack',
    level: 82,
    color: '#54C5F8',
    gradient: 'linear-gradient(135deg, #54C5F8, #0175C2)',
    description: 'Advanced Flutter UI for health-tech mobile apps like AYU-EAT'
  },
  {
    name: 'MongoDB & NoSQL',
    icon: 'fas fa-database',
    category: 'full-stack',
    level: 85,
    color: '#47A248',
    gradient: 'linear-gradient(135deg, #47A248, #2D6A2D)',
    description: 'Scalable NoSQL database design, aggregation pipelines, and schema modeling'
  },

  // DevOps & Professional Tools
  {
    name: 'Git & Version Control',
    icon: 'fab fa-git-alt',
    category: 'devops',
    level: 90,
    color: '#F05032',
    gradient: 'linear-gradient(135deg, #F05032, #C93D1B)',
    description: 'Git workflows, branching strategies, and team collaboration'
  },
  {
    name: 'Docker',
    icon: 'fab fa-docker',
    category: 'devops',
    level: 72,
    color: '#2496ED',
    gradient: 'linear-gradient(135deg, #2496ED, #1366C0)',
    description: 'Container-based deployment and environment standardization'
  },
  {
    name: 'SCRUM / Agile PM',
    icon: 'fas fa-tasks',
    category: 'devops',
    level: 85,
    color: '#FF9800',
    gradient: 'linear-gradient(135deg, #FF9800, #F57C00)',
    description: 'SCRUM sprints, technical project management, and SIH 2025 team leadership'
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
              className={`${styles.categoryBtn} ${activeCategory === category ? styles.active : ''
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