// src/components/Contact.jsx — B&W with modal trigger
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Contact.module.css';

const EMAIL = 'prajwalganiga8@gmail.com';

const socials = [
  { href: 'https://www.linkedin.com/in/prajwalganiga', icon: 'fab fa-linkedin', label: 'LinkedIn', sub: 'Connect professionally' },
  { href: 'https://github.com/PrajwalGaniga', icon: 'fab fa-github', label: 'GitHub', sub: 'Explore my code' },
  { href: 'https://www.youtube.com/@codeforge1', icon: 'fab fa-youtube', label: 'YouTube', sub: 'Watch my builds' },
  { href: 'https://www.instagram.com/_prajwal_ganiga__/', icon: 'fab fa-instagram', label: 'Instagram', sub: 'Behind the scenes' },
];

function Contact({ onContactClick }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { setCopied(false); }
  };

  return (
    <section id="contact" className={styles.contactSection} ref={ref}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.sectionBadge}>
            <span className={styles.mono}>{'>'}</span> Get In Touch
          </div>
          <h2 className={styles.sectionTitle}>
            Let's <span className={styles.gradientText}>Collaborate</span>
          </h2>
          <p className={styles.sectionSub}>
            Open to research collaborations, internships, freelance projects, and innovative ideas.
          </p>

          {/* Big open-modal CTA */}
          <motion.button
            className={styles.bigCta}
            onClick={onContactClick}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <i className="fas fa-paper-plane" />
            <span>Send Me a Message</span>
            <i className="fas fa-arrow-right" />
          </motion.button>
        </motion.div>

        <div className={styles.contactGrid}>
          {/* Email card */}
          <motion.div
            className={styles.emailCard}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.emailHeader}>
              <div className={styles.emailIcon}>
                <i className="fas fa-envelope" />
              </div>
              <div>
                <p className={styles.emailLabel}>Email me at</p>
                <p className={styles.emailAddress}>{EMAIL}</p>
              </div>
            </div>
            <div className={styles.emailActions}>
              <motion.button
                className={styles.copyBtn}
                onClick={copyEmail}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className={styles.copiedState}
                    >
                      <i className="fas fa-check" /> Copied!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      <i className="fas fa-copy" /> Copy Email
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <a href={`mailto:${EMAIL}`} className={styles.mailtoBtn}>
                <i className="fas fa-paper-plane" /> Send Email
              </a>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            className={styles.socialsGrid}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialCard}
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
              >
                <i className={`${s.icon} ${styles.socialCardIcon}`} />
                <div>
                  <p className={styles.socialCardLabel}>{s.label}</p>
                  <p className={styles.socialCardSub}>{s.sub}</p>
                </div>
                <i className="fas fa-arrow-right" style={{ color: 'var(--color-text-tertiary)', fontSize: '0.8rem' }} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;