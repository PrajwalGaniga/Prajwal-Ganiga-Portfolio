// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  const [isLaunching, setIsLaunching] = useState(false);
  const [showRocket, setShowRocket] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollToTop = () => {
    setIsLaunching(true);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 800);
    
    setTimeout(() => {
      setIsLaunching(false);
    }, 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
      setShowRocket(currentProgress > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rocketVariants = {
    initial: { 
      y: 0, 
      rotate: 0,
      scale: 1 
    },
    launching: {
      y: -1000,
      rotate: -5,
      scale: 0.5,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  const flameVariants = {
    initial: {
      scale: 1,
      opacity: 0.8
    },
    launching: {
      scale: [1, 1.5, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 0.3,
        repeat: Infinity
      }
    }
  };

  const particleVariants = {
    initial: {
      y: 0,
      opacity: 0
    },
    launching: (custom) => ({
      y: [0, -custom.distance],
      opacity: [1, 0],
      x: custom.drift,
      scale: [1, 0],
      transition: {
        duration: custom.duration,
        ease: "easeOut"
      }
    })
  };

  return (
    <footer className={styles.footer}>
      {/* Animated Background Elements */}
      <div className={styles.backgroundElements}>
        <motion.div 
          className={styles.floatingStar}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className={styles.floatingStar}
          style={{ left: '20%', top: '30%' }}
          animate={{
            y: [0, 15, 0],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className={styles.floatingStar}
          style={{ right: '30%', top: '60%' }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className={styles.footerContainer}>
        {/* Progress Bar */}
        <motion.div 
          className={styles.progressBar}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.3 }}
        />

        {/* Main Footer Content */}
        <div className={styles.footerContent}>
          <motion.p 
            className={styles.copyright}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            © {currentYear} <span className={styles.highlight}>Prajwal Ganiga</span>. Crafted with passion and code. All rights reserved.
          </motion.p>
          
          <motion.div 
            className={styles.footerMessage}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span>Ready for the next mission? </span>
            <motion.span 
              className={styles.readyText}
              animate={{ 
                color: ['#fff', '#4ade80', '#fff'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Let's launch! 🚀
            </motion.span>
          </motion.div>
        </div>

        {/* Rocket Button */}
        <AnimatePresence>
          {showRocket && (
            <motion.button 
              className={styles.rocketButton}
              onClick={scrollToTop}
              aria-label="Launch to top"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                y: [0, -10, 0]
              }}
              exit={{ scale: 0, rotate: 180 }}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {/* Rocket Body */}
              <motion.div 
                className={styles.rocket}
                variants={rocketVariants}
                initial="initial"
                animate={isLaunching ? "launching" : "initial"}
              >
                <div className={styles.rocketBody}>
                  <div className={styles.rocketNose}></div>
                  <div className={styles.rocketWindow}></div>
                  <div className={styles.rocketFins}>
                    <div className={styles.fin}></div>
                    <div className={styles.fin}></div>
                    <div className={styles.fin}></div>
                  </div>
                </div>
                
                {/* Rocket Flame */}
                <motion.div 
                  className={styles.rocketFlame}
                  variants={flameVariants}
                  initial="initial"
                  animate={isLaunching ? "launching" : "initial"}
                >
                  <div className={styles.flameMain}></div>
                  <div className={styles.flameSecondary}></div>
                </motion.div>

                {/* Launch Particles */}
                {isLaunching && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={styles.launchParticle}
                        variants={particleVariants}
                        initial="initial"
                        animate="launching"
                        custom={{
                          distance: Math.random() * 100 + 50,
                          drift: (Math.random() - 0.5) * 100,
                          duration: Math.random() * 0.5 + 0.3
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.div>

              {/* Glow Effect */}
              <motion.div 
                className={styles.buttonGlow}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Footer Links */}
        <motion.div 
          className={styles.footerLinks}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="#privacy">Privacy</a>
          <span>•</span>
          <a href="#terms">Terms</a>
          <span>•</span>
          <a href="#contact">Contact</a>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;