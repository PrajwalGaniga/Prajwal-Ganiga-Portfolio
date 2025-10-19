// src/components/Achievements.jsx - MODIFIED VERSION
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Achievements.module.css';

// Import achievement images
import academicExcellence from '../assets/Achievements/Academic Excellence_award_1st_place.jpg';
import fixAndReveal from '../assets/Achievements/fix_and_reveal_1st_place.jpg';
import innofest from '../assets/Achievements/Innofest_!st_place.jpg';
import startupIdea from '../assets/Achievements/startup_ideaPresentation_1st_Place.jpg';
import prathibaTurnthecoat from '../assets/Achievements/prathiba_turnthecoat_2nd_place.jpg';
import prathibaDebate from '../assets/Achievements/prathiba_debate_2nd_place.jpg';

// Achievement images array for gallery
const achievementImages = [
  { id: 1, src: academicExcellence, title: 'Academic Excellence Award - 1st Place', category: 'academic' },
  { id: 2, src: fixAndReveal, title: 'Fix & Reveal Competition - 1st Place', category: 'technical' },
  { id: 3, src: innofest, title: 'Innofest Innovation - 1st Place', category: 'technical' },
  { id: 4, src: startupIdea, title: 'Startup Idea Presentation - 1st Place', category: 'technical' },
  { id: 5, src: prathibaTurnthecoat, title: 'Prathiba Turn the Coat - 2nd Place', category: 'academic' },
  { id: 6, src: prathibaDebate, title: 'Prathiba Debate Competition - 2nd Place', category: 'academic' }
];

// Enhanced achievements data
const achievementsData = [
  {
    id: 1,
    icon: 'fas fa-award',
    title: 'Academic Excellence',
    category: 'academic',
    highlights: ['88% in PUC', '1st Rank - 3 Semesters', 'CGPA: 9.25'],
    points: [
      'Achieved "Distinction in PUC with 88%" marks.',
      'Maintained 1st rank in class consistently for the past 3 semesters in BE.',
      'Current CGPA: 9.25 with consistent academic performance.',
      'Received multiple awards for outstanding academic achievements.',
    ],
    stats: { awards: 8, duration: '3+ Years', rank: 'Top 1%' }
  },
  {
    id: 2,
    icon: 'fas fa-trophy',
    title: 'Competitive Recognition',
    category: 'technical',
    highlights: ['GDG Hackathon', 'Top 5 Codethon', '60+ Teams'],
    points: [
      'Secured spot in Top 1000 at Google Developers Group (GDG) Hackathon.',
      'Project placed in Top 5 out of 60 teams in college-level Codethon at SIT.',
      'Recognized for innovative problem-solving and technical execution.',
      'Competed against national-level participants in tech competitions.',
    ],
    stats: { competitions: 12, rankings: 'Top 5', teams: '60+' }
  },
  {
    id: 3,
    icon: 'fas fa-person-running',
    title: 'Athletic Excellence',
    category: 'sports',
    highlights: ['Champion Athlete', 'MVP Awards', 'Volleyball Team'],
    points: [
      'Champion in High School & PUC Athletics competitions.',
      'Most Valuable Player in Cricket and Kabaddi (High School & PUC).',
      'Proud member of the College Volleyball Team representing SIT.',
      'Multiple sports awards demonstrating leadership and teamwork.',
    ],
    stats: { sports: 4, awards: 15, teams: 'College Level' }
  }
];

// Achievement Gallery Component
const AchievementGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryGrid}>
        {achievementImages.map((image, index) => (
          <motion.div
            key={image.id}
            className={`${styles.galleryItem} ${styles[image.category]}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => setSelectedImage(image)}
          >
            <div className={styles.imageWrapper}>
              <img 
                src={image.src} 
                alt={image.title}
                className={styles.galleryImage}
              />
              <div className={styles.imageOverlay}>
                <div className={styles.overlayContent}>
                  <i className="fas fa-expand"></i>
                  <span>View Details</span>
                </div>
              </div>
            </div>
            <div className={styles.imageInfo}>
              <h4>{image.title}</h4>
              <div className={styles.imageCategory}>
                {image.category === 'academic' && <i className="fas fa-graduation-cap"></i>}
                {image.category === 'technical' && <i className="fas fa-code"></i>}
                {image.category}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for enlarged image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeButton}
                onClick={() => setSelectedImage(null)}
              >
                <i className="fas fa-times"></i>
              </button>
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title}
                className={styles.modalImage}
              />
              <div className={styles.modalInfo}>
                <h3>{selectedImage.title}</h3>
                <div className={styles.modalCategory}>
                  {selectedImage.category === 'academic' && <i className="fas fa-graduation-cap"></i>}
                  {selectedImage.category === 'technical' && <i className="fas fa-code"></i>}
                  {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)} Achievement
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Particle Background
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

// Achievement Card Component
const AchievementCard = ({ achievement, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={`${styles.achievementCard} ${styles[achievement.category]}`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
    >
      {/* Card Gradient Border */}
      <div className={styles.cardGradient} />
      
      <div className={styles.cardContent}>
        {/* Card Header */}
        <div className={styles.cardHeader}>
          <div className={styles.iconContainer}>
            <i className={achievement.icon}></i>
          </div>
          <div className={styles.titleSection}>
            <h3>{achievement.title}</h3>
            <div className={styles.highlights}>
              {achievement.highlights.map((highlight, idx) => (
                <span key={idx} className={styles.highlightTag}>
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.achievementStats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{achievement.stats.awards}</span>
            <span className={styles.statLabel}>Awards</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{achievement.stats.duration}</span>
            <span className={styles.statLabel}>Duration</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{achievement.stats.rank}</span>
            <span className={styles.statLabel}>Rank</span>
          </div>
        </div>

        {/* Points */}
        <div className={styles.pointsContainer}>
          <AnimatePresence>
            {achievement.points.slice(0, isExpanded ? achievement.points.length : 2).map((point, i) => (
              <motion.div
                key={i}
                className={styles.pointItem}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className={styles.pointIcon}>
                  <i className="fas fa-check"></i>
                </div>
                <span>{point}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Expand Button */}
        {achievement.points.length > 2 && (
          <motion.button
            className={styles.expandBtn}
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
            <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
          </motion.button>
        )}
      </div>

      {/* Hover Glow */}
      <div className={styles.cardGlow} />
    </motion.div>
  );
};

function Achievements() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
      id="achievements" 
      className={styles.achievementsSection}
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
            <span>🏆 Awards & Honors</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Notable <span className={styles.gradientText}>Achievements</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Celebrating milestones in academics, technology, and sports
          </p>
          <div className={styles.titleDivider}></div>
        </motion.div>

        {/* Achievement Gallery */}
        <motion.div 
          className={styles.gallerySection}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className={styles.galleryTitle}>Achievement Gallery</h3>
          <p className={styles.gallerySubtitle}>Click on any certificate to view details</p>
          <AchievementGallery />
        </motion.div>

        {/* Achievements Grid */}
        <motion.div 
          className={styles.achievementsGrid}
          layout
        >
          {achievementsData.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </motion.div>

        {/* Achievements Summary */}
        <motion.div 
          className={styles.achievementsSummary}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>25+</span>
            <span className={styles.summaryLabel}>Total Awards</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>3</span>
            <span className={styles.summaryLabel}>Categories</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>6</span>
            <span className={styles.summaryLabel}>1st Places</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryNumber}>4+</span>
            <span className={styles.summaryLabel}>Years</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Achievements;