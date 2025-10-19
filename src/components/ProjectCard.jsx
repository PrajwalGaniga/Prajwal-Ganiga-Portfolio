// src/components/ProjectCard.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectCard.module.css';

// Import all project images
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

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: 'spring', 
      stiffness: 100,
      duration: 0.6
    }
  },
  hover: {
    y: -15,
    scale: 1.02,
    transition: { duration: 0.3 }
  }
};

function ProjectCard({ project, featured, index }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);

  const images = project.images || [];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div 
      className={`${styles.projectCard} ${featured ? styles.featured : ''} ${isExpanded ? styles.expanded : ''}`}
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      {/* Card Gradient Border */}
      <div className={styles.cardGradient} />
      
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
          <motion.div 
            className={styles.carouselImages}
            animate={{ x: `-${currentImage * 100}%` }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {images.map((imgName, index) => (
              <img 
                key={index}
                src={imageMap[imgName]} 
                alt={`${project.title} screenshot ${index + 1}`} 
                className={styles.carouselImg}
              />
            ))}
          </motion.div>

          {/* Carousel Controls */}
          {images.length > 1 && (
            <>
              <button 
                className={`${styles.carouselArrow} ${styles.leftArrow}`} 
                onClick={prevImage}
                aria-label="Previous image"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button 
                className={`${styles.carouselArrow} ${styles.rightArrow}`} 
                onClick={nextImage}
                aria-label="Next image"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
              
              {/* Carousel Indicators */}
              <div className={styles.carouselIndicators}>
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.indicator} ${currentImage === index ? styles.active : ''}`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Project Content */}
        <div className={styles.projectContent}>
          <div className={styles.projectHeader}>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <div className={styles.categoryTag}>
              {project.category}
            </div>
          </div>

          <p className={styles.projectDescription}>
            {isExpanded ? project.description : `${project.description.substring(0, 120)}...`}
            <button className={styles.readMoreBtn} onClick={toggleExpand}>
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          </p>

          {/* Highlights */}
          <div className={styles.highlights}>
            {project.highlights.map((highlight, idx) => (
              <span key={idx} className={styles.highlightTag}>
                {highlight}
              </span>
            ))}
          </div>

          <p className={styles.projectTech}>
            <strong>Tech Stack:</strong> {project.tech}
          </p>

          {/* Project Links */}
          <div className={styles.projectLinks}>
            {project.githubLink && (
              <motion.a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.btn} ${styles.btnSecondary}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-external-link-alt"></i>
                <span>Live Demo</span>
              </motion.a>
            )}
            {!project.liveLink && project.githubLink && (
              <motion.a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.btn} ${styles.btnTertiary}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-eye"></i>
                <span>View Details</span>
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className={styles.cardGlow} />
    </motion.div>
  );
}

export default ProjectCard;