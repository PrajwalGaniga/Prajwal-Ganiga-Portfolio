// src/components/Highlights.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Highlights.module.css';

// Enhanced events data with categories, stats, and images
const eventsData = [
  {
    id: 1,
    icon: 'fas fa-users-gear',
    title: 'Altius Technical Fest',
    text: 'Organized multiple successful events for Altius (1st & 2nd year) — a flagship technical event at Srinivas Institute of Technology.',
    category: 'technical',
    stats: { participants: '500+', events: '15+', duration: '2 Days' },
    achievements: ['Flagship Event', 'Multi-track', '500+ Participants'],
    featured: true
  },
  {
    id: 2,
    icon: 'fas fa-puzzle-piece',
    title: 'Technical Treasure Hunt',
    text: 'Spearheaded a "Technical Treasure Hunt" event, designed to challenge problem-solving and technical knowledge with coding puzzles and logic challenges.',
    category: 'technical',
    stats: { participants: '150+', teams: '30+', puzzles: '8 Rounds' },
    achievements: ['Interactive Game', 'Team Building', 'Tech Puzzles']
  },
  {
    id: 3,
    icon: 'fas fa-laptop-code',
    title: 'Websurf - Website Revamp',
    text: 'Managed Websurf – Website Revamp, a college event under Envision, where participants redesigned an e-commerce platform with modern UI/UX principles.',
    category: 'design',
    stats: { participants: '80+', projects: '25+', hours: '48 Hours' },
    achievements: ['UI/UX Focus', 'Real-world Project', 'Design Competition']
  }
];

// Enhanced workshops data
const workshopsData = [
  {
    id: 1,
    icon: 'fas fa-chalkboard-teacher',
    title: 'No-Code/Low-Code Workshop',
    text: 'Conducted a "No-Code, Low-Code" workshop for 2nd-year BE students, introducing them to rapid application development and modern development tools.',
    category: 'development',
    stats: { attendees: '60+', duration: '3 Hours', tools: '5+ Platforms' },
    achievements: ['Rapid Development', 'Modern Tools', 'Hands-on Session']
  },
  {
    id: 2,
    icon: 'fab fa-html5',
    title: 'Frontend Development',
    text: 'Led a comprehensive workshop on "Frontend Development using HTML, CSS, & JavaScript" covering responsive design and interactive web development.',
    category: 'development',
    stats: { attendees: '45+', duration: '4 Hours', projects: '15+' },
    achievements: ['Responsive Design', 'Interactive Web', 'Project-based']
  },
  {
    id: 3,
    icon: 'fas fa-server',
    title: 'FastAPI Backend',
    text: 'Conducted an advanced session on "Backend Development using FastAPI," focusing on modern API creation, database integration, and deployment.',
    category: 'development',
    stats: { attendees: '35+', duration: '3 Hours', apis: '10+ Built' },
    achievements: ['REST APIs', 'Database Integration', 'Deployment'],
    featured: true
  }
];

// Floating Card Component
const HighlightCard = ({ item, type, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.highlightCard} ${styles[item.category]} ${item.featured ? styles.featured : ''}`}
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
      {/* Card Gradient Border */}
      <div className={styles.cardGradient} />
      
      {/* Featured Badge */}
      {item.featured && (
        <div className={styles.featuredBadge}>
          <i className="fas fa-star"></i>
          Featured
        </div>
      )}

      <div className={styles.cardContent}>
        {/* Card Header */}
        <div className={styles.cardHeader}>
          <div className={styles.iconContainer}>
            <i className={item.icon}></i>
          </div>
          <div className={styles.titleSection}>
            <h3>{item.title}</h3>
            <div className={styles.typeBadge}>
              {type === 'events' ? '🎪 Event' : '👨‍🏫 Workshop'}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className={styles.description}>
          {isExpanded ? item.text : `${item.text.substring(0, 120)}...`}
          <button 
            className={styles.readMoreBtn}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </p>

        {/* Stats */}
        <div className={styles.statsGrid}>
          {Object.entries(item.stats).map(([key, value]) => (
            <div key={key} className={styles.statItem}>
              <span className={styles.statValue}>{value}</span>
              <span className={styles.statLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className={styles.achievements}>
          {item.achievements.map((achievement, idx) => (
            <motion.span
              key={idx}
              className={styles.achievementTag}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              {achievement}
            </motion.span>
          ))}
        </div>

        {/* Action Button */}
        <motion.button
          className={styles.detailsBtn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>View Details</span>
          <i className="fas fa-arrow-right"></i>
        </motion.button>
      </div>

      {/* Hover Glow */}
      <div className={styles.cardGlow} />
    </motion.div>
  );
};

// Interactive Timeline Component
const TimelineConnector = () => {
  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineLine}>
        <motion.div 
          className={styles.timelineProgress}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </div>
      <div className={styles.timelineNodes}>
        {[...eventsData, ...workshopsData].map((_, index) => (
          <motion.div
            key={index}
            className={styles.timelineNode}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
};

// Particle Background
const ParticleBackground = () => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
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

function Highlights() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const allHighlights = [
    ...eventsData.map(item => ({ ...item, type: 'events' })),
    ...workshopsData.map(item => ({ ...item, type: 'workshops' }))
  ];

  const filteredHighlights = activeTab === 'all' 
    ? allHighlights 
    : allHighlights.filter(item => item.type === activeTab);

  return (
    <motion.section 
      id="highlights" 
      className={styles.highlightsSection}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background Elements */}
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
            <span>🌟 Leadership & Impact</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Events & <span className={styles.gradientText}>Workshops</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Leading technical initiatives and sharing knowledge through workshops and events
          </p>
          <div className={styles.titleDivider}></div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className={styles.tabNavigation}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { id: 'all', label: 'All Activities', count: allHighlights.length },
            { id: 'events', label: 'Events', count: eventsData.length },
            { id: 'workshops', label: 'Workshops', count: workshopsData.length }
          ].map(tab => (
            <motion.button
              key={tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
              <span className={styles.tabCount}>{tab.count}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Timeline Connector */}
        <TimelineConnector />

        {/* Highlights Grid */}
        <motion.div 
          className={styles.highlightsGrid}
          layout
        >
          <AnimatePresence>
            {filteredHighlights.map((item, index) => (
              <HighlightCard
                key={`${item.type}-${item.id}`}
                item={item}
                type={item.type}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Impact Summary */}
        <motion.div 
          className={styles.impactSummary}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>{eventsData.length + workshopsData.length}</span>
            <span className={styles.summaryLabel}>Total Activities</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>800+</span>
            <span className={styles.summaryLabel}>Participants</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>20+</span>
            <span className={styles.summaryLabel}>Hours Conducted</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>3</span>
            <span className={styles.summaryLabel}>Categories</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Highlights;