// src/components/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Contact.module.css';

function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.9
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.section 
      id="contact" 
      className={styles.contactSection}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Animated Background Elements */}
      <div className={styles.backgroundElements}>
        <motion.div className={styles.floatingShape1} animate={floatingAnimation} />
        <motion.div 
          className={styles.floatingShape2} 
          animate={{ ...floatingAnimation, y: [10, -10, 10] }} 
        />
      </div>

      <div className={styles.container}>
        <motion.div className={styles.header} variants={itemVariants}>
          <motion.h2
            initial={{ scale: 0.5 }}
            animate={inView ? { scale: 1 } : { scale: 0.5 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            Let's Create Something Amazing!
          </motion.h2>
          <motion.p className={styles.contactIntro} variants={itemVariants}>
            Ready to bring your ideas to life? Whether it's a new project, collaboration, 
            or just a friendly chat about tech—I'd love to hear from you!
          </motion.p>
        </motion.div>
        
        <motion.div className={styles.contactDetails} variants={itemVariants}>
          <motion.a 
            href="mailto:prajwalganiga06@gmail.com" 
            className={styles.contactItem}
            whileHover={{ scale: 1.05, x: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className={styles.iconWrapper}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <i className="fas fa-envelope"></i>
            </motion.div>
            <div className={styles.contactText}>
              <span className={styles.contactLabel}>Email Me</span>
              <span className={styles.contactValue}>prajwalganiga06@gmail.com</span>
            </div>
            <motion.div 
              className={styles.copyButton}
              onClick={(e) => {
                e.preventDefault();
                copyToClipboard('prajwalganiga06@gmail.com');
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className={`fas ${isCopied ? 'fa-check' : 'fa-copy'}`}></i>
            </motion.div>
          </motion.a>

          <motion.div 
            className={styles.contactItem}
            whileHover={{ scale: 1.05, x: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className={styles.iconWrapper}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <i className="fas fa-phone-alt"></i>
            </motion.div>
            <div className={styles.contactText}>
              <span className={styles.contactLabel}>Call Me</span>
              <span className={styles.contactValue}>+91 9110687983</span>
            </div>
            <motion.div 
              className={styles.copyButton}
              onClick={() => copyToClipboard('+91 9110687983')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className={`fas ${isCopied ? 'fa-check' : 'fa-copy'}`}></i>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div className={styles.socialSection} variants={itemVariants}>
          <h3>Follow My Journey</h3>
          <div className={styles.socialIcons}>
            {[
              { href: "https://www.linkedin.com/in/prajwalganiga", icon: "fab fa-linkedin", label: "LinkedIn" },
              { href: "https://github.com/PrajwalGaniga", icon: "fab fa-github", label: "GitHub" },
              { href: "https://www.youtube.com/@codeforge1", icon: "fab fa-youtube", label: "YouTube" },
              { href: "https://www.instagram.com/_prajwal_ganiga__/?igsh=YW9xOXN3Ympsb3Z3", icon: "fab fa-instagram", label: "Instagram" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={styles.socialIcon}
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <i className={social.icon}></i>
                <span className={styles.tooltip}>{social.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className={styles.ctaSection}
          variants={itemVariants}
        >
          <motion.p
            animate={{ 
              opacity: [1, 0.7, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Let's build the future, one line of code at a time! 🚀
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Contact;