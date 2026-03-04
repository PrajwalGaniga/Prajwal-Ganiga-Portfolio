// src/components/Hero.jsx — Full-bleed B&W Developer Hero with Parallax
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Hero.module.css';
import heroImage from '../assets/images/profile-new.png';

const ROLES = [
  'Full-Stack AI Developer',
  'Published IEEE Researcher',
  'Health-Tech Innovator',
  'Full-Stack Founder',
];

function Hero({ onContactClick }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const nameRef = useRef(null);
  const bgRef = useRef(null);

  // Role switcher
  useEffect(() => {
    const t = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  // Parallax scroll listener
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Apply parallax transforms
  const nameParallax = `translateY(${scrollY * 0.25}px)`;
  const bgParallax = `translateY(${scrollY * 0.12}px)`;
  const imgParallax = `translateY(${scrollY * 0.15}px) scale(1.02)`;

  return (
    <section id="home" className={styles.heroSection}>

      {/* ── Pixel dot-grid BG (parallax layer 1) ──────── */}
      <div
        ref={bgRef}
        className={styles.dotGrid}
        style={{ transform: bgParallax }}
      />

      {/* ── Vignette edges ──────────────────────────────── */}
      <div className={styles.vignette} />

      {/* ── OVERSIZED NAME — bottom layer of stacking ─── */}
      <div
        ref={nameRef}
        className={styles.nameBg}
        style={{ transform: nameParallax }}
        aria-hidden="true"
      >
        <span className={styles.nameBgFirst}>PRAJWAL</span>
        <span className={styles.nameBgLast}>GANIGA</span>
      </div>

      {/* ── Profile photo — middle layer ─────────────── */}
      <div className={styles.photoLayer} style={{ transform: imgParallax }}>
        <img
          src={heroImage}
          alt="Prajwal Ganiga"
          className={styles.profileImg}
        />
        {/* radial gradient fade at bottom so text below reads clean */}
        <div className={styles.photoFade} />
      </div>

      {/* ── Foreground content — top layer ───────────── */}
      <div className={styles.foreground}>

        {/* Left side — tagline + socials */}
        <motion.div
          className={styles.leftPanel}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Availability dot */}
          <div className={styles.availBadge}>
            <span className={styles.pulseDot} />
            <span>Available for Opportunities</span>
          </div>

          {/* Short tagline */}
          <p className={styles.tagline}>
            Bridging Ayurvedic wisdom &amp; Deep Learning to build
            intelligent, human-centered health technology.
          </p>

          {/* Rotating role — mono style */}
          <div className={styles.rolePill}>
            <span className={styles.rolePrefix}>{'>'}_</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                className={styles.roleText}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Social icons */}
          <div className={styles.socials}>
            {[
              { href: 'https://www.linkedin.com/in/prajwalganiga', icon: 'fab fa-linkedin', label: 'LinkedIn' },
              { href: 'https://github.com/PrajwalGaniga', icon: 'fab fa-github', label: 'GitHub' },
              { href: 'https://www.youtube.com/@codeforge1', icon: 'fab fa-youtube', label: 'YouTube' },
              { href: 'https://www.instagram.com/_prajwal_ganiga__/', icon: 'fab fa-instagram', label: 'Instagram' },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={styles.socialIcon}
                whileHover={{ y: -3, scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
              >
                <i className={s.icon} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right side — bio + CTA */}
        <motion.div
          className={styles.rightPanel}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Stat chips */}
          <div className={styles.statChips}>
            {[
              { label: 'IEEE Published', sub: 'BLEU 0.7747' },
              { label: 'CGPA 9.25', sub: 'Academic Rank #1' },
              { label: '2nd Place', sub: 'AYUSH HABBA 2026' },
            ].map((chip) => (
              <div key={chip.label} className={styles.statChip}>
                <span className={styles.chipLabel}>{chip.label}</span>
                <span className={styles.chipSub}>{chip.sub}</span>
              </div>
            ))}
          </div>

          <p className={styles.rightBio}>
            Merging research-backed AI with full-stack engineering — from
            IEEE-published deep learning models to award-winning products
            that perform as well as they look.
          </p>

          {/* CTAs */}
          <div className={styles.ctaRow}>
            <motion.button
              onClick={onContactClick}
              className={styles.btnPrimary}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Let&apos;s Talk</span>
              <i className="fas fa-arrow-right" />
            </motion.button>
            <motion.a
              href="/resume/prajwal_resume.pdf"
              download
              className={styles.btnSecondary}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <i className="fas fa-download" />
              <span>Resume</span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────── */}
      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
      >
        <div className={styles.scrollLine} />
        <span className={styles.scrollLabel}>scroll</span>
      </motion.div>
    </section>
  );
}

export default Hero;