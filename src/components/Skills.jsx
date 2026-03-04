// src/components/Skills.jsx — Tag Cloud + Category Swimlane (no fake progress bars)
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Skills.module.css';

const skillsData = {
  'Languages': {
    color: 'var(--color-text)',
    icon: <i className="fas fa-code"></i>,
    skills: [
      { name: 'C', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', context: 'Systems programming & fundamentals' },
      { name: 'Java', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', context: 'Object-oriented application development' },
      { name: 'Python', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', context: 'Data science, AI/ML, and backend development' },
      { name: 'JavaScript', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', context: 'Full-stack web development' },
    ],
  },
  'Frontend': {
    color: 'var(--color-text)',
    icon: <i className="fas fa-desktop"></i>,
    skills: [
      { name: 'HTML5', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', context: 'Web structure' },
      { name: 'CSS3', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', context: 'Styling & animation' },
      { name: 'React', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', context: 'SPA development' },
      { name: 'NextJS', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', context: 'SSR and full-stack React' },
      { name: 'Bootstrap', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', context: 'Responsive layouts' },
      { name: 'TailwindCSS', iconImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png', context: 'Utility-first styling' },
    ],
  },
  'Backend': {
    color: 'var(--color-text)',
    icon: <i className="fas fa-server"></i>,
    skills: [
      { name: 'Node.js', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', context: 'JavaScript runtime' },
      { name: 'FastAPI', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', context: 'Async API development' },
      { name: 'Flask', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', context: 'Lightweight python web framework' },
    ],
  },
  'Databases': {
    color: 'var(--color-text)',
    icon: <i className="fas fa-database"></i>,
    skills: [
      { name: 'MySQL', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', context: 'Relational database' },
      { name: 'PostgreSQL', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', context: 'Advanced relational database' },
      { name: 'MongoDB', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', context: 'NoSQL document database' },
      { name: 'SQLite', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg', context: 'Embedded database' },
    ],
  },
  'AI/ML': {
    color: 'var(--color-text)',
    icon: <i className="fas fa-brain"></i>,
    skills: [
      { name: 'TensorFlow', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', context: 'Deep learning models' },
      { name: 'PyTorch', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', context: 'Deep learning & neural networks' },
      { name: 'Scikit-learn', iconImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Scikit_learn_logo_small.svg/2560px-Scikit_learn_logo_small.svg.png', context: 'Machine learning algorithms' },
      { name: 'Pandas', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', context: 'Data analysis & manipulation' },
      { name: 'OpenCV', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg', context: 'Computer vision' },
    ],
  },
  'Cloud & Mobile': {
    color: 'var(--color-text)',
    icon: <i className="fas fa-cloud"></i>,
    skills: [
      { name: 'AWS', iconImg: 'https://cdn.iconscout.com/icon/free/png-256/free-amazon-aws-icon-svg-download-png-2944772.png', context: 'Cloud infrastructure' },
      { name: 'Firebase', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', context: 'BaaS & real-time DB' },
      { name: 'Android', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg', context: 'Mobile native apps' },
      { name: 'Flutter', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', context: 'Cross-platform mobile apps' },
      { name: 'React Native', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', context: 'Cross-platform mobile apps' },
    ],
  },
  'Tools': {
    color: 'var(--color-text)',
    icon: <i className="fas fa-tools"></i>,
    skills: [
      { name: 'Figma', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', context: 'UI/UX design' },
      { name: 'Git', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', context: 'Version control' },
    ],
  }
};

const categories = Object.keys(skillsData);

function Skills() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const current = skillsData[activeCategory];

  return (
    <section id="skills" className={styles.skillsSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.sectionBadge}>Skills & Expertise</div>
          <h2 className={styles.sectionTitle}>
            Technical <span className={styles.gradientText}>Proficiency</span>
          </h2>
          <p className={styles.sectionSub}>
            Click any skill tag to learn how I've applied it in practice.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className={styles.tabs}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.tab} ${activeCategory === cat ? styles.tabActive : ''}`}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedSkill(null);
              }}
              style={activeCategory === cat ? { '--tab-color': skillsData[cat].color } : {}}
            >
              {skillsData[cat].icon} {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills Area */}
        <div className={styles.skillsArea}>
          {/* Tag Cloud */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className={styles.tagCloud}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35 }}
            >
              {current.skills.map((skill, i) => (
                <motion.button
                  key={skill.name}
                  className={`${styles.skillTag} ${selectedSkill?.name === skill.name ? styles.skillTagActive : ''}`}
                  style={{ '--tag-color': current.color }}
                  onClick={() => setSelectedSkill(
                    selectedSkill?.name === skill.name ? null : skill
                  )}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill.iconImg && <img src={skill.iconImg} alt={skill.name} className={styles.skillImg} />}
                  {skill.name}
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Detail Panel */}
          <AnimatePresence>
            {selectedSkill && (
              <motion.div
                className={styles.detailPanel}
                style={{ '--panel-color': current.color }}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              >
                <div className={styles.panelAccentBar} style={{ background: current.color }} />
                <div className={styles.panelContent}>
                  <div className={styles.panelHeader}>
                    <span className={styles.panelIcon}>
                      {selectedSkill.iconImg ? <img src={selectedSkill.iconImg} alt={selectedSkill.name} className={styles.panelImg} /> : current.icon}
                    </span>
                    <h3 className={styles.panelTitle}>{selectedSkill.name}</h3>
                    <button
                      className={styles.panelClose}
                      onClick={() => setSelectedSkill(null)}
                      aria-label="Close detail"
                    >
                      ×
                    </button>
                  </div>
                  <p className={styles.panelContext}>{selectedSkill.context}</p>
                  <span className={styles.panelCategory}>{activeCategory}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Summary bar */}
        <motion.div
          className={styles.summaryBar}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            { val: Object.values(skillsData).reduce((a, c) => a + c.skills.length, 0) + '+', label: 'Skills' },
            { val: categories.length, label: 'Domains' },
            { val: '7+', label: 'Projects Built' },
          ].map((s) => (
            <div key={s.label} className={styles.summaryItem}>
              <span className={styles.summaryVal}>{s.val}</span>
              <span className={styles.summaryLabel}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;