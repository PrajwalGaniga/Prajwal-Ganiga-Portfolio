// src/components/ProjectCard.jsx — Premium hover-reveal card
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectCard.module.css';

const statusConfig = {
  completed: { label: 'Live', color: 'var(--color-neon)', dot: '#00FF88' },
  active: { label: 'Active', color: 'var(--color-sky)', dot: '#38BDF8' },
  development: { label: 'Dev', color: 'var(--color-gold)', dot: '#FBBF24' },
};

function ProjectCard({ project, featured = false, index = 0 }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  const status = statusConfig[project.status] || statusConfig.completed;

  return (
    <motion.div
      className={`${styles.card} ${featured ? styles.cardFeatured : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Image area */}
      <div
        className={styles.imgArea}
        onClick={() => setImgIdx((i) => (i + 1) % project.images.length)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={imgIdx}
            src={project.images[imgIdx]}
            alt={project.title}
            className={styles.img}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Image counter */}
        {project.images.length > 1 && (
          <div className={styles.imgCounter}>
            {imgIdx + 1}/{project.images.length}
          </div>
        )}

        {/* Status badge */}
        <div className={styles.statusBadge} style={{ '--status-color': status.color }}>
          <span
            className={styles.statusDot}
            style={{ background: status.dot }}
          />
          {status.label}
        </div>

        {/* Featured badge */}
        {featured && (
          <div className={styles.featuredBadge}>⭐ Featured</div>
        )}

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className={styles.hoverOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.overlayLinks}>
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.overlayBtn}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className="fab fa-github" /> GitHub
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.overlayBtn} ${styles.overlayBtnLive}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className="fas fa-external-link-alt" /> Live
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Award chip */}
        {project.highlights?.[0]?.startsWith('🏆') || project.highlights?.[0]?.startsWith('🏅') ? (
          <div className={styles.awardChip}>
            <span>{project.highlights[0]}</span>
          </div>
        ) : null}

        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.desc}>{project.description}</p>

        {/* Tech tags */}
        <div className={styles.techTags}>
          {project.tech.split(',').slice(0, 4).map((t) => (
            <span key={t} className={styles.techTag}>{t.trim()}</span>
          ))}
        </div>

        {/* Footer actions */}
        <div className={styles.cardFooter}>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              <i className="fab fa-github" /> Code
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.footerLink} ${styles.footerLinkLive}`}
            >
              <i className="fas fa-external-link-alt" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;