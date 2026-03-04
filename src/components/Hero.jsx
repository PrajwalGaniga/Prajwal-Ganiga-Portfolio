// src/components/Hero.jsx — Cinematic Staged Intro (Framer Motion)
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Hero.module.css';
import heroImage from '../assets/images/profile-new.png';

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const ROLES = [
  'Full-Stack AI Developer',
  'Published IEEE Researcher',
  'Health-Tech Innovator',
  'Full-Stack Founder',
];

const FIRST_NAME = 'PRAJWAL';
const LAST_NAME = 'GANIGA';

const STAT_CHIPS = [
  { label: 'IEEE Published', sub: 'BLEU 0.7747' },
  { label: 'CGPA 9.25', sub: 'Academic Rank #1' },
  { label: '2nd Place', sub: 'AYUSH HABBA 2026' },
];

const SOCIALS = [
  { href: 'https://www.linkedin.com/in/prajwalganiga', icon: 'fab fa-linkedin', label: 'LinkedIn' },
  { href: 'https://github.com/PrajwalGaniga', icon: 'fab fa-github', label: 'GitHub' },
  { href: 'https://www.youtube.com/@codeforge1', icon: 'fab fa-youtube', label: 'YouTube' },
  { href: 'https://www.instagram.com/_prajwal_ganiga__/', icon: 'fab fa-instagram', label: 'Instagram' },
];

// ─────────────────────────────────────────────────────────────
// ANIMATION EASING
// ─────────────────────────────────────────────────────────────
const EASE_PREMIUM = [0.22, 1, 0.36, 1];

// ─────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────

/**
 * Stage 1 — Name row wrapper: staggers each letter span.
 * isMobile reduces stagger timing and travel distance.
 */
const nameRowVariants = (isMobile) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: isMobile ? 0.055 : 0.07,
      delayChildren: 0,
    },
  },
});

/**
 * GANIGA row — offset so it begins after PRAJWAL's last letter
 * kicks off. PRAJWAL has 7 letters:
 *   desktop  → 6 × 0.07 = 0.42 s offset  (+0.1 breathing room)
 *   mobile   → 6 × 0.055 = 0.33 s offset (+0.08 breathing room)
 */
const lastNameRowVariants = (isMobile) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: isMobile ? 0.055 : 0.07,
      delayChildren: isMobile
        ? (FIRST_NAME.length - 1) * 0.055 + 0.08
        : (FIRST_NAME.length - 1) * 0.07 + 0.1,
    },
  },
});

/** Individual letter */
const letterVariants = (isMobile) => ({
  hidden: { opacity: 0, y: isMobile ? 14 : 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_PREMIUM },
  },
});

/**
 * Stage 2 — Profile image.
 * Starts after the name rows finish (≈ 1.2 s).
 */
const imageVariants = {
  hidden: { opacity: 0, scale: 1.05, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_PREMIUM, delay: 1.25 },
  },
};

const imageMobileVariants = {
  hidden: { opacity: 0, scale: 1.03, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_PREMIUM, delay: 1.1 },
  },
};

/**
 * Stage 3 — Left panel container (staggers its children).
 * Delay = 2.2 s on desktop, 2.0 s on mobile.
 */
const leftPanelVariants = (isMobile) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: isMobile ? 0.1 : 0.14,
      delayChildren: isMobile ? 1.9 : 2.2,
    },
  },
});

/**
 * Stage 4 — Right panel container (staggers its children).
 * Delay = 3.2 s on desktop, 2.85 s on mobile.
 */
const rightPanelVariants = (isMobile) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: isMobile ? 0.09 : 0.13,
      delayChildren: isMobile ? 2.65 : 3.2,
    },
  },
});

/** Shared child variant (used in both panels) */
const childVariants = (isMobile) => ({
  hidden: { opacity: 0, y: isMobile ? 12 : 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_PREMIUM },
  },
});

/** Scroll hint — appears after everything else */
const scrollHintVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 4.4, duration: 0.8, ease: 'easeOut' },
  },
};

const scrollHintMobileVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 3.8, duration: 0.6, ease: 'easeOut' },
  },
};

// ─────────────────────────────────────────────────────────────
// HOOK — detect mobile breakpoint
// ─────────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────

/** Renders a single word as a row of individually animated letter spans */
function AnimatedWord({ word, isMobile }) {
  return (
    <motion.span
      className={styles.animatedWord}
      variants={nameRowVariants(isMobile)}
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      {word.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className={styles.animatedLetter}
          variants={letterVariants(isMobile)}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO COMPONENT
// ─────────────────────────────────────────────────────────────
function Hero({ onContactClick }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const bgRef = useRef(null);
  const isMobile = useIsMobile(768);

  // Role switcher — starts after intro sequence finishes
  useEffect(() => {
    // Delay first switch so it doesn't clash with animation on mobile
    const startDelay = setTimeout(() => {
      const t = setInterval(() => {
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }, 2800);
      // Expose clearInterval via closure
      return () => clearInterval(t);
    }, isMobile ? 3200 : 4500);

    return () => clearTimeout(startDelay);
  }, [isMobile]);

  // Parallax scroll listener
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Parallax transforms — disabled on mobile to keep it clean
  const nameParallax = isMobile ? undefined : `translateY(${scrollY * 0.25}px)`;
  const bgParallax = isMobile ? undefined : `translateY(${scrollY * 0.12}px)`;
  const imgParallax = isMobile ? undefined : `translateY(${scrollY * 0.15}px) scale(1.02)`;

  // Pick correct variant set based on viewport
  const imgVars = isMobile ? imageMobileVariants : imageVariants;
  const scrollVars = isMobile ? scrollHintMobileVariants : scrollHintVariants;
  const child = childVariants(isMobile);

  return (
    <section id="home" className={styles.heroSection}>

      {/* ── Pixel dot-grid BG (parallax layer 1) ──────── */}
      <div
        ref={bgRef}
        className={styles.dotGrid}
        style={bgParallax ? { transform: bgParallax } : undefined}
      />

      {/* ── Vignette edges ──────────────────────────────── */}
      <div className={styles.vignette} />

      {/* ─────────────────────────────────────────────────
          STAGE 1 — OVERSIZED NAME (letter-by-letter)
          Delay: 0 s | Duration: ~1.2 s
      ───────────────────────────────────────────────── */}
      <div
        className={styles.nameBg}
        style={nameParallax ? { transform: nameParallax } : undefined}
      >
        {/* Hidden accessible label */}
        <span className={styles.srOnly}>Prajwal Ganiga</span>

        {/* PRAJWAL */}
        <div className={styles.nameRow}>
          <AnimatedWord word={FIRST_NAME} isMobile={isMobile} />
        </div>

        {/* GANIGA — starts staggering from where PRAJWAL ends */}
        <div className={styles.nameRowRight}>
          <motion.span
            className={styles.animatedWord}
            variants={lastNameRowVariants(isMobile)}
            initial="hidden"
            animate="visible"
            aria-hidden="true"
          >
            {LAST_NAME.split('').map((char, i) => (
              <motion.span
                key={`last-${char}-${i}`}
                className={styles.animatedLetter}
                variants={letterVariants(isMobile)}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────
          STAGE 2 — PROFILE IMAGE
          Delay: ~1.25 s | Duration: ~0.9 s
      ───────────────────────────────────────────────── */}
      <motion.div
        className={styles.photoLayer}
        style={imgParallax ? { transform: imgParallax } : undefined}
        variants={imgVars}
        initial="hidden"
        animate="visible"
      >
        <img
          src={heroImage}
          alt="Prajwal Ganiga"
          className={styles.profileImg}
        />
        <div className={styles.photoFade} />
      </motion.div>

      {/* ─────────────────────────────────────────────────
          FOREGROUND — Stages 3 & 4
      ───────────────────────────────────────────────── */}
      <div className={styles.foreground}>

        {/* ─────────────────────────────────────────────
            STAGE 3 — LEFT PANEL
            Children stagger in starting at ~2.2 s
        ───────────────────────────────────────────── */}
        <motion.div
          className={styles.leftPanel}
          variants={leftPanelVariants(isMobile)}
          initial="hidden"
          animate="visible"
        >
          {/* Availability badge */}
          <motion.div className={styles.availBadge} variants={child}>
            <span className={styles.pulseDot} />
            <span>Available for Opportunities</span>
          </motion.div>

          {/* Short tagline */}
          <motion.p className={styles.tagline} variants={child}>
            Bridging Ayurvedic wisdom &amp; Deep Learning to build
            intelligent, human-centered health technology.
          </motion.p>

          {/* Rotating role — mono style */}
          <motion.div className={styles.rolePill} variants={child}>
            <span className={styles.rolePrefix}>{'>_'}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                className={styles.roleText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE_PREMIUM }}
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Social icons */}
          <motion.div className={styles.socials} variants={child}>
            {SOCIALS.map((s) => (
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
          </motion.div>
        </motion.div>

        {/* ─────────────────────────────────────────────
            STAGE 4 — RIGHT PANEL
            Children stagger in starting at ~3.2 s
        ───────────────────────────────────────────── */}
        <motion.div
          className={styles.rightPanel}
          variants={rightPanelVariants(isMobile)}
          initial="hidden"
          animate="visible"
        >
          {/* Stat chips — each chip is its own child */}
          <motion.div className={styles.statChips} variants={child}>
            {STAT_CHIPS.map((chip) => (
              <motion.div
                key={chip.label}
                className={styles.statChip}
                variants={child}
              >
                <span className={styles.chipLabel}>{chip.label}</span>
                <span className={styles.chipSub}>{chip.sub}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Bio */}
          <motion.p className={styles.rightBio} variants={child}>
            Merging research-backed AI with full-stack engineering — from
            IEEE-published deep learning models to award-winning products
            that perform as well as they look.
          </motion.p>

          {/* CTAs */}
          <motion.div className={styles.ctaRow} variants={child}>
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
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator — appears last ─────────────── */}
      <motion.div
        className={styles.scrollHint}
        variants={scrollVars}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.scrollLine} />
        <span className={styles.scrollLabel}>scroll</span>
      </motion.div>
    </section>
  );
}

export default Hero;