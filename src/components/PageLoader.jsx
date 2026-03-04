// src/components/PageLoader.jsx — Creative B&W loader with profile image
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PageLoader.module.css';
import heroImage from '../assets/images/prajwal.jpg';

const LETTERS = 'PRAJWAL.DEV'.split('');

function PageLoader({ onDone }) {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState('loading'); // loading | reveal

    useEffect(() => {
        // Simulate loading progress
        let val = 0;
        const interval = setInterval(() => {
            val += Math.random() * 18 + 4;
            if (val >= 100) {
                val = 100;
                clearInterval(interval);
                setTimeout(() => setPhase('reveal'), 300);
                setTimeout(() => onDone(), 2000);
            }
            setProgress(Math.min(val, 100));
        }, 120);
        return () => clearInterval(interval);
    }, [onDone]);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    className={styles.overlay}
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
                >
                    {/* Pixel grid bg */}
                    <div className={styles.grid} />

                    {/* Profile image — grayscale, fades in */}
                    <motion.div
                        className={styles.profileWrap}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: phase === 'reveal' ? 0.18 : 0.12, scale: 1 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                    >
                        <img src={heroImage} alt="" className={styles.profileBg} />
                        <div className={styles.profileFade} />
                    </motion.div>

                    {/* Name letters — stagger */}
                    <div className={styles.nameRow} aria-label="Prajwal.dev">
                        {LETTERS.map((ch, i) => (
                            <motion.span
                                key={i}
                                className={ch === '.' ? styles.nameDot : styles.nameLetter}
                                initial={{ opacity: 0, y: 40, rotateX: -60 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{
                                    delay: 0.15 + i * 0.07,
                                    duration: 0.55,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                {ch}
                            </motion.span>
                        ))}
                    </div>

                    {/* Tagline */}
                    <motion.p
                        className={styles.tagline}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                    >
                        <span className={styles.monoPrefix}>{'>'}_</span> initializing portfolio...
                    </motion.p>

                    {/* Progress bar */}
                    <motion.div
                        className={styles.progressWrap}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className={styles.progressTrack}>
                            <motion.div
                                className={styles.progressFill}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                            />
                        </div>
                        <span className={styles.progressNum}>{Math.round(progress)}%</span>
                    </motion.div>

                    {/* Reveal curtains */}
                    <AnimatePresence>
                        {phase === 'reveal' && (
                            <>
                                <motion.div
                                    className={`${styles.curtain} ${styles.curtainTop}`}
                                    initial={{ scaleY: 1 }}
                                    animate={{ scaleY: 0 }}
                                    transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                                />
                                <motion.div
                                    className={`${styles.curtain} ${styles.curtainBottom}`}
                                    initial={{ scaleY: 1 }}
                                    animate={{ scaleY: 0 }}
                                    transition={{ duration: 0.75, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                                />
                            </>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default PageLoader;
