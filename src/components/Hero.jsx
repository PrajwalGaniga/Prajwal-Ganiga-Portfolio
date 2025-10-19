// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import styles from './Hero.module.css';
import heroImage from '../assets/images/prajwal.jpg';

function Hero() {
  return (
    <motion.section 
      className={styles.heroSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOrb}></div>
        <div className={styles.gridPattern}></div>
        <div className={styles.floatingShapes}>
          <div className={styles.shape1}></div>
          <div className={styles.shape2}></div>
          <div className={styles.shape3}></div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.heroContent}>
          
          {/* Text Content */}
          <motion.div 
            className={styles.textContent}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <motion.div 
              className={styles.badge}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span>🚀 Available for Opportunities</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Prajwal <span className={styles.gradientText}>Ganiga</span>
            </motion.h1>

            <motion.div
              className={styles.roleContainer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',
                  2000,
                  'Tech Innovator',
                  2000,
                  'Business & Data Enthusiast',
                  2000,
                  'AI Learner',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className={styles.role}
              />
            </motion.div>

            <motion.div
              className={styles.divider}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            />

            <motion.p
              className={styles.bio}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              "Building thoughtful tech that empowers every mind through innovative solutions and user-centered design."
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className={styles.ctaContainer}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <a 
                href="/resume/prajwal_resume.pdf" 
                download 
                className={styles.primaryBtn}
              >
                <span>Download Resume</span>
                <i className="fas fa-download"></i>
              </a>
              
              <a 
                href="#contact" 
                className={styles.secondaryBtn}
              >
                <span>Get In Touch</span>
                <i className="fas fa-arrow-right"></i>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className={styles.socialContainer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <span className={styles.followText}>Follow my journey</span>
              <div className={styles.socialIcons}>
                {[
                  { href: "https://www.linkedin.com/in/prajwalganiga", icon: "fab fa-linkedin", label: "LinkedIn" },
                  { href: "https://github.com/PrajwalGaniga", icon: "fab fa-github", label: "GitHub" },
                  { href: "https://www.youtube.com/@codeforge1", icon: "fab fa-youtube", label: "YouTube" },
                  { href: "https://www.instagram.com/_prajwal_ganiga__/", icon: "fab fa-instagram", label: "Instagram" },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={styles.socialIcon}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.7 + index * 0.1 }}
                  >
                    <i className={social.icon}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div 
            className={styles.imageContainer}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className={styles.imageWrapper}>
              <motion.img 
                src={heroImage} 
                alt="Prajwal Ganiga" 
                className={styles.profileImage}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div className={styles.imageGlow}></div>
              <div className={styles.floatingElements}>
                <div className={styles.floatingElement1}>💻</div>
                <div className={styles.floatingElement2}>🚀</div>
                <div className={styles.floatingElement3}>✨</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <div className={styles.scrollArrow}></div>
      </motion.div>
    </motion.section>
  );
}

export default Hero;