// src/components/ProjectCard.jsx - OPTIMIZED FOR NEW DESIGN
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './ProjectCard.module.css';

import imgSmart1 from '../assets/images/project_1/project1.jpg';
import imgSmart11 from '../assets/images/project_1/project11.png';
import imgSmart12 from '../assets/images/project_1/project12.png';
import imgSmart13 from '../assets/images/project_1/project13.png';

import imgFocus2 from '../assets/images/project_2/project2.jpg';
import imgFocus21 from '../assets/images/project_2/project21.png';
import imgFocus22 from '../assets/images/project_2/project22.png';
import imgFocus23 from '../assets/images/project_2/project23.png';

import imgVol3 from '../assets/images/project_3/project3.jpg';
import imgVol31 from '../assets/images/project_3/project31.png';
import imgVol32 from '../assets/images/project_3/project32.png';
import imgVol33 from '../assets/images/project_3/project33.png';

import imgJob4 from '../assets/images/project_4/project4.jpg';
import imgJob41 from '../assets/images/project_4/project41.png';
import imgJob42 from '../assets/images/project_4/project42.png';
import imgJob43 from '../assets/images/project_4/project43.png';

import imgDoc5 from '../assets/images/project_5/project5.jpg';
import imgDoc51 from '../assets/images/project_5/project51.png';
import imgDoc52 from '../assets/images/project_5/project52.png';
import imgDoc53 from '../assets/images/project_5/project53.png';

import imgDoIt61 from '../assets/images/project_6/project61.png';
import imgDoIt62 from '../assets/images/project_6/project62.png';
import imgDoIt63 from '../assets/images/project_6/project63.png';

import imgSql from '../assets/images/project_sql/project-sql.png';
import imgSql1 from '../assets/images/project_sql/project-sql1.png'
import imgSql2 from '../assets/images/project_sql/project-sql2.png';
import imgSql3 from '../assets/images/project_sql/project-sql3.png';

const imageMap = {
  'project1.jpg': imgSmart1,
  'project11.png': imgSmart11,
  'project12.png': imgSmart12,
  'project13.png': imgSmart13,
  'project2.jpg': imgFocus2,
  'project21.png': imgFocus21,
  'project22.png': imgFocus22,
  'project23.png': imgFocus23,
  'project3.jpg': imgVol3,
  'project31.png': imgVol31,
  'project32.png': imgVol32,
  'project33.png': imgVol33,
  'project4.jpg': imgJob4,
  'project41.png': imgJob41,
  'project42.png': imgJob42,
  'project43.png': imgJob43,
  'project5.jpg': imgDoc5,
  'project51.png': imgDoc51,
  'project52.png': imgDoc52,
  'project53.png': imgDoc53,
  'project61.png': imgDoIt61,
  'project62.png': imgDoIt62,
  'project63.png': imgDoIt63,
  'project-sql.png': imgSql,
  'project-sql1.png': imgSql1,
  'project-sql2.png': imgSql2,
  'project-sql3.png': imgSql3,
};


// Simple error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ProjectCard error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorFallback}>
          Error loading project card
        </div>
      );
    }

    return this.props.children;
  }
}

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring', 
      stiffness: 100,
      duration: 0.6
    }
  }
};

function ProjectCard({ project, featured }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);

  const images = project.images || [];

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleExpand = (e) => {
    e?.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleImageError = (imgName) => {
    setImageError(prev => ({ ...prev, [imgName]: true }));
  };

  // Auto-rotate images for mobile
  useEffect(() => {
    if (isMobile && images.length > 1) {
      const interval = setInterval(() => {
        nextImage();
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [isMobile, images.length]);

  // Get truncated description
  const getTruncatedDescription = () => {
    const truncateLength = isMobile ? 80 : 120;
    return project.description.length > truncateLength && !isExpanded 
      ? `${project.description.substring(0, truncateLength)}...`
      : project.description;
  };

  // Fallback content when no images
  const renderImageFallback = () => (
    <div className={styles.imageFallback}>
      <i className="fas fa-image"></i>
      <span>Project Preview</span>
    </div>
  );

  return (
    <ErrorBoundary>
      <motion.div 
        className={`${styles.projectCard} ${featured ? styles.featured : ''}`}
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        {/* Status Badge */}
        <div className={`${styles.statusBadge} ${styles[project.status]}`}>
          {project.status}
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className={styles.featuredBadge}>
            <i className="fas fa-star"></i>
            Featured
          </div>
        )}

        <div className={styles.cardContent}>
          {/* Image Carousel */}
          <div className={styles.carouselWrapper}>
            {images.length > 0 ? (
              <>
                <motion.div 
                  className={styles.carouselImages}
                  animate={{ x: `-${currentImage * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {images.map((imgName, index) => (
                    <div key={index} className={styles.carouselSlide}>
                      {!imageError[imgName] ? (
                        <img 
                          src={imageMap[imgName]} 
                          alt={`${project.title} screenshot ${index + 1}`} 
                          className={styles.carouselImg}
                          onError={() => handleImageError(imgName)}
                          loading="lazy"
                        />
                      ) : (
                        renderImageFallback()
                      )}
                    </div>
                  ))}
                </motion.div>

                {/* Carousel Indicators */}
                {images.length > 1 && (
                  <div className={styles.carouselIndicators}>
                    {images.map((_, index) => (
                      <button
                        key={index}
                        className={`${styles.indicator} ${currentImage === index ? styles.active : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImage(index);
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              renderImageFallback()
            )}
          </div>

          {/* Project Content */}
          <div className={styles.projectContent}>
            <div className={styles.projectHeader}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <div className={styles.categoryTag}>
                {project.category.replace('-', ' ')}
              </div>
            </div>

            <p className={styles.projectDescription}>
              {getTruncatedDescription()}
              {project.description.length > 80 && (
                <button className={styles.readMoreBtn} onClick={toggleExpand}>
                  {isExpanded ? 'Read Less' : 'Read More'}
                </button>
              )}
            </p>

            {/* Tech Stack */}
            <p className={styles.projectTech}>
              <strong>Tech:</strong> {project.tech}
            </p>

            {/* Project Links */}
            <div className={styles.projectLinks}>
              {project.githubLink && (
                <motion.a 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="fab fa-github"></i>
                  <span>Code</span>
                </motion.a>
              )}
              {project.liveLink && (
                <motion.a 
                  href={project.liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="fas fa-external-link-alt"></i>
                  <span>Live Demo</span>
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </ErrorBoundary>
  );
}

export default ProjectCard;