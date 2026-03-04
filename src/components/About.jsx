// src/components/About.jsx — Bento Grid Layout
import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import echoLogo from '../assets/logos/echo.png';
import acodeLogo from '../assets/logos/acode.png';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const interests = [
  { icon: '💻', name: 'Web Dev' },
  { icon: '🧠', name: 'AI & ML' },
  { icon: '🎨', name: 'UI/UX' },
  { icon: '📈', name: 'Stock Analysis' },
  { icon: '🏐', name: 'Volleyball' },
  { icon: '🎵', name: 'Music' },
];

function About() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.sectionBadge}>
            <span>About Me</span>
          </div>
          <h2 className={styles.sectionTitle}>
            The <span className={styles.gradientText}>Story</span> Behind the Code
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>

          {/* Card 1 — Intro (wide) */}
          <motion.div
            className={`${styles.bentoCard} ${styles.cardIntro}`}
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            <div className={styles.introAvatar}>PG</div>
            <div>
              <h3 className={styles.introName}>Prajwal Ganiga</h3>
              <p className={styles.introRole}>CS&D Student · IEEE Published Author</p>
            </div>
            <p className={styles.introText}>
              Full-Stack AI Developer and Researcher specializing in the integration of Ayurvedic
              principles with Deep Learning. Main author of IEEE research on Medical NMT (BLEU: 0.7747)
              and 2nd Place winner at AYUSH HABBA 2026. Passionate about building intelligent,
              human-centred health technology that bridges ancient wisdom with modern ML.
            </p>
            <div className={styles.missionQuote}>
              <p>"Bridging Ayurvedic wisdom and Deep Learning to build intelligent, human-centered health technology."</p>
            </div>
          </motion.div>

          {/* Card 2 — Leadership */}
          <motion.div
            className={`${styles.bentoCard} ${styles.cardLeadership}`}
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            <div className={styles.cardLabel}>
              <span>🎖</span> Leadership
            </div>
            {[
              { logo: echoLogo, role: 'President', org: 'ECHO Tech Club', desc: 'Leading technical workshops and peer mentorship programs' },
              { logo: acodeLogo, role: 'Vice President', org: 'ACODE Association', desc: 'CS&D department association fostering technical excellence' },
            ].map((item, i) => (
              <div key={i} className={styles.leaderItem}>
                <img src={item.logo} alt={item.org} className={styles.leaderLogo} />
                <div>
                  <p className={styles.leaderRole}>{item.role}</p>
                  <p className={styles.leaderOrg}>{item.org}</p>
                  <p className={styles.leaderDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Card 3 — Education metrics */}
          <motion.div
            className={`${styles.bentoCard} ${styles.cardEdu}`}
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            <div className={styles.cardLabel}>
              <span>🎓</span> Education
            </div>
            <div className={styles.eduMetrics}>
              <div className={styles.metric}>
                <span className={styles.metricValue}>9.25</span>
                <span className={styles.metricLabel}>CGPA</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metric}>
                <span className={styles.metricValue}>#1</span>
                <span className={styles.metricLabel}>Dept Rank</span>
              </div>
            </div>
            <p className={styles.eduName}>BE Computer Science & Design</p>
            <p className={styles.eduInstitute}>Srinivas Institute of Technology</p>
            <span className={styles.monoTag}>2023 — 2027</span>
          </motion.div>

          {/* Card 4 — Interests */}
          <motion.div
            className={`${styles.bentoCard} ${styles.cardInterests}`}
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            <div className={styles.cardLabel}>
              <span>✨</span> Interests
            </div>
            <div className={styles.interestGrid}>
              {interests.map((item) => (
                <div key={item.name} className={styles.interestPill}>
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default About;