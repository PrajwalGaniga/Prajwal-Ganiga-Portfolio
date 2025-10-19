// src/components/Education.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Education.module.css';

// Enhanced education data with icons and colors
const educationData = [
  {
    id: 1,
    institution: 'Srinivas Institute of Technology',
    degree: 'BE in Computer Science & Design',
    period: '2022 – Present',
    duration: '3rd Year (5th Semester)',
    description: 'Pursuing my BE with focus on full-stack development, AI/ML, and design thinking. Actively participating in tech communities and building innovative projects.',
    icon: '🎓',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
    achievements: ['CGPA: 8.5+', 'Tech Club Member', 'Project Lead'],
    status: 'current'
  },
  {
    id: 2,
    institution: 'Capitanio PU Composite',
    degree: 'Pre-University College',
    period: '2020 – 2022',
    duration: '2 Years',
    description: 'Completed PUC with focus on Science stream. Built strong foundation in mathematics and computer science fundamentals.',
    icon: '📚',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981, #047857)',
    achievements: ['Science Stream', 'Mathematics Focus', 'Computer Basics'],
    status: 'completed'
  },
  {
    id: 3,
    institution: 'St. Joseph\'s English Medium School',
    degree: 'Secondary Education',
    period: '2015 – 2020',
    duration: '5 Years (6th–10th)',
    description: 'Completed secondary education with excellence in academics and extracurricular activities. Developed interest in technology and programming.',
    icon: '🏫',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    achievements: ['SSLC Completed', 'Tech Club', 'Sports Activities'],
    status: 'completed'
  },
  {
    id: 4,
    institution: 'Holy Family School',
    degree: 'Primary Education',
    period: '2010 – 2015',
    duration: '5 Years (1st–5th)',
    description: 'Primary education that laid the foundation for academic journey. Developed curiosity for technology and creative problem-solving.',
    icon: '👶',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
    achievements: ['Foundation Years', 'Creative Learning', 'Basic Computing'],
    status: 'completed'
  }
];

// 3D Card Component
const EducationCard = ({ education, isActive, onClick, index }) => {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.educationCard} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div 
        className={styles.cardGradient}
        style={{ background: education.gradient }}
      />
      
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div className={styles.iconContainer}>
            <span className={styles.icon}>{education.icon}</span>
          </div>
          <div className={styles.headerText}>
            <h3 className={styles.institution}>{education.institution}</h3>
            <p className={styles.degree}>{education.degree}</p>
          </div>
          {education.status === 'current' && (
            <div className={styles.currentBadge}>
              <span>Current</span>
            </div>
          )}
        </div>

        <div className={styles.cardBody}>
          <div className={styles.timelineInfo}>
            <div className={styles.period}>
              <span className={styles.calendarIcon}>📅</span>
              {education.period}
            </div>
            <div className={styles.duration}>
              <span className={styles.clockIcon}>⏱️</span>
              {education.duration}
            </div>
          </div>

          <p className={styles.description}>{education.description}</p>

          <div className={styles.achievements}>
            {education.achievements.map((achievement, idx) => (
              <span key={idx} className={styles.achievementTag}>
                {achievement}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.cardFooter}>
          <motion.div 
            className={styles.progressIndicator}
            initial={{ width: 0 }}
            animate={{ width: isActive ? '100%' : '0%' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <div className={styles.exploreBtn}>
            <span>View Details</span>
            <motion.span
              animate={{ x: isActive ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Component
function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCard, setActiveCard] = useState(1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.section 
      id="education" 
      className={styles.educationSection}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Animated Background */}
      <div className={styles.backgroundElements}>
        <div className={styles.floatingOrb1}></div>
        <div className={styles.floatingOrb2}></div>
        <div className={styles.gridPattern}></div>
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
            <span>📚 Education Journey</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Academic <span className={styles.gradientText}>Pathway</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            From foundational learning to specialized expertise - my educational evolution
          </p>
          <div className={styles.titleDivider}></div>
        </motion.div>

        {/* Interactive Timeline */}
        <div className={styles.timelineContainer}>
          {/* Progress Line */}
          <div className={styles.progressLine}>
            <motion.div 
              className={styles.progressFill}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {/* Education Cards */}
          <div className={styles.cardsContainer}>
            {educationData.map((education, index) => (
              <EducationCard
                key={education.id}
                education={education}
                isActive={activeCard === education.id}
                onClick={() => setActiveCard(education.id)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Detailed View */}
        <AnimatePresence mode="wait">
          {educationData.filter(edu => edu.id === activeCard).map((activeEducation) => (
            <motion.div
              key={activeEducation.id}
              className={styles.detailView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.detailHeader}>
                <h3>About {activeEducation.institution}</h3>
                <div className={styles.detailStats}>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{activeEducation.period}</span>
                    <span className={styles.statLabel}>Duration</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{activeEducation.duration}</span>
                    <span className={styles.statLabel}>Period</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{activeEducation.achievements.length}</span>
                    <span className={styles.statLabel}>Key Points</span>
                  </div>
                </div>
              </div>
              <div className={styles.detailContent}>
                <p>{activeEducation.description}</p>
                <div className={styles.skillsGained}>
                  <h4>Key Focus Areas</h4>
                  <div className={styles.skillsList}>
                    {activeEducation.achievements.map((skill, index) => (
                      <motion.span
                        key={index}
                        className={styles.skillTag}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export default Education;