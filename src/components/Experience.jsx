// src/components/Experience.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Experience.module.css';

// Import certificate images
import swizosoftCert from '../assets/internship/swizosoft.png';
import dhaariniCert from '../assets/internship/dhaarini.png';

// Enhanced experience data with certificates and links
const experienceData = [
  {
    id: 1,
    company: 'Do It For Me',
    role: 'Founder & Full-Stack Developer',
    period: 'June 2025 – Present',
    duration: '6+ Months',
    description: 'Self-initiated startup providing comprehensive development services including full-stack applications, AI integrations, and custom software solutions for clients worldwide.',
    technologies: ['React', 'Node.js', 'Python', 'AI/ML', 'Cloud Services'],
    type: 'startup',
    status: 'active',
    link: 'https://doitformebot.netlify.app/',
    achievements: [
      'Built 15+ client projects',
      'AI integration services',
      'Full-stack development',
      'Client consultation'
    ],
    side: 'left',
    featured: true
  },
  {
    id: 2,
    company: 'Space for Website',
    role: 'Founder & Web Developer',
    period: '2024 – Present',
    duration: '1+ Year',
    description: 'Bespoke website development agency creating professional, responsive websites for diverse clients from concept to deployment with focus on modern design and user experience.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'UI/UX'],
    type: 'startup',
    status: 'active',
    link: 'https://spaceforwebsite.in',
    achievements: [
      '20+ websites delivered',
      'Custom design solutions',
      'SEO optimization',
      'Performance focused'
    ],
    side: 'right',
    featured: true
  },
  {
    id: 3,
    company: 'SwizoSoft',
    role: 'Full Stack Development Intern',
    period: 'Summer 2023',
    duration: '3 Months',
    description: 'Intensive full-stack development internship under expert guidance. Worked on real-world projects using modern web technologies and database management systems.',
    technologies: ['HTML', 'CSS', 'Flask', 'MongoDB', 'MySQL'],
    type: 'internship',
    status: 'completed',
    mentor: 'Aditya M. Bhatt',
    certificate: swizosoftCert,
    achievements: [
      'Full-stack project development',
      'Database design & optimization',
      'REST API development',
      'Agile methodology'
    ],
    side: 'left',
    featured: false
  },
  {
    id: 4,
    company: 'Dharini Academy',
    role: 'Deep Learning Intern',
    period: 'Summer 2023',
    duration: '3 Months',
    description: 'Practical deep learning internship focusing on computer vision and predictive analytics. Contributed to innovative AI projects with real-world applications.',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'CNN', 'RNN'],
    type: 'internship',
    status: 'completed',
    certificate: dhaariniCert,
    projects: [
      'Real-time Mask Detection System',
      'Plant Species Classification',
      'Stock Market Prediction Model'
    ],
    achievements: [
      'Computer vision applications',
      'Neural network architecture',
      'Model training & evaluation',
      'Data preprocessing'
    ],
    side: 'right',
    featured: false
  }
];

// 3D Experience Card Component
const ExperienceCard = ({ experience, isActive, onClick, index }) => {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.experienceCard} ${styles[experience.side]} ${isActive ? styles.active : ''} ${experience.featured ? styles.featured : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Timeline Connector */}
      <div className={styles.timelineConnector}>
        <div className={styles.timelineDot} />
        <div className={styles.timelineLine} />
      </div>

      {/* Card Gradient Border */}
      <div 
        className={styles.cardGradient}
        style={{ 
          background: experience.type === 'startup' 
            ? 'linear-gradient(135deg, #8B5CF6, #EC4899)' 
            : 'linear-gradient(135deg, #3B82F6, #06B6D4)'
        }}
      />
      
      <div className={styles.cardContent}>
        {/* Card Header */}
        <div className={styles.cardHeader}>
          <div className={styles.companyInfo}>
            <h3 className={styles.company}>{experience.company}</h3>
            <p className={styles.role}>{experience.role}</p>
          </div>
          <div className={styles.typeBadge}>
            {experience.type === 'startup' ? '🚀 Startup' : '🎓 Internship'}
          </div>
        </div>

        {/* Timeline Info */}
        <div className={styles.timelineInfo}>
          <div className={styles.period}>
            <i className="fas fa-calendar"></i>
            {experience.period}
          </div>
          <div className={styles.duration}>
            <i className="fas fa-clock"></i>
            {experience.duration}
          </div>
        </div>

        {/* Description */}
        <p className={styles.description}>{experience.description}</p>

        {/* Technologies */}
        <div className={styles.technologies}>
          {experience.technologies.map((tech, idx) => (
            <span key={idx} className={styles.techTag}>
              {tech}
            </span>
          ))}
        </div>

        {/* Achievements */}
        <div className={styles.achievements}>
          <h4>Key Achievements:</h4>
          <ul>
            {experience.achievements.map((achievement, idx) => (
              <li key={idx}>{achievement}</li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          {experience.link && (
            <motion.a
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.visitBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-external-link-alt"></i>
              Visit Website
            </motion.a>
          )}
          
          {experience.certificate && (
            <motion.button
              className={styles.certificateBtn}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-award"></i>
              View Certificate
            </motion.button>
          )}

          {experience.mentor && (
            <div className={styles.mentorInfo}>
              <i className="fas fa-user-graduate"></i>
              Mentor: {experience.mentor}
            </div>
          )}
        </div>
      </div>

      {/* Active Indicator */}
      {isActive && (
        <motion.div 
          className={styles.activeIndicator}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
      )}
    </motion.div>
  );
};

// Certificate Modal Component
const CertificateModal = ({ experience, isOpen, onClose }) => {
  if (!isOpen || !experience.certificate) return null;

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modalContent}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3>{experience.company} - Certificate</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className={styles.certificateImage}>
          <img 
            src={experience.certificate} 
            alt={`${experience.company} Certificate`}
          />
        </div>
        <div className={styles.certificateInfo}>
          <p><strong>Role:</strong> {experience.role}</p>
          <p><strong>Period:</strong> {experience.period}</p>
          <p><strong>Duration:</strong> {experience.duration}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Particle Background
const ParticleBackground = () => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
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
function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeExperience, setActiveExperience] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const handleCardClick = (experience) => {
    if (activeExperience === experience.id) {
      setActiveExperience(null);
    } else {
      setActiveExperience(experience.id);
      if (experience.certificate) {
        setSelectedCertificate(experience);
      }
    }
  };

  const closeCertificate = () => {
    setSelectedCertificate(null);
  };

  return (
    <motion.section 
      id="experience" 
      className={styles.experienceSection}
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
            <span>💼 Professional Journey</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Experience & <span className={styles.gradientText}>Internships</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            My professional growth through startups and technical internships
          </p>
          <div className={styles.titleDivider}></div>
        </motion.div>

        {/* Timeline */}
        <div className={styles.timelineContainer}>
          {/* Central Timeline */}
          <div className={styles.centralTimeline}>
            <motion.div 
              className={styles.timelineProgress}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {/* Experience Cards */}
          <div className={styles.cardsContainer}>
            {experienceData.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                isActive={activeExperience === experience.id}
                onClick={() => handleCardClick(experience)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Experience Summary */}
        <motion.div 
          className={styles.experienceSummary}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>{experienceData.length}</span>
            <span className={styles.summaryLabel}>Total Experiences</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>
              {experienceData.filter(exp => exp.type === 'startup').length}
            </span>
            <span className={styles.summaryLabel}>Startups</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>
              {experienceData.filter(exp => exp.type === 'internship').length}
            </span>
            <span className={styles.summaryLabel}>Internships</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>2</span>
            <span className={styles.summaryLabel}>Certificates</span>
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <CertificateModal
            experience={selectedCertificate}
            isOpen={!!selectedCertificate}
            onClose={closeCertificate}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export default Experience;