// src/components/Research.jsx — Animated BLEU counter, two-column hero layout
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Research.module.css';
import ieeeBestPaper from '../assets/Achievements/IEEE_Best_Paper.jpeg';

function useCountUp(target, duration, trigger) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!trigger) return;
        const start = performance.now();
        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setVal(parseFloat((eased * target).toFixed(4)));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [trigger, target, duration]);
    return val;
}

const tags = ['Transformers', 'BERT', 'NMT', 'Medical NLP', 'Deep Learning', 'Kannada NLP'];

function Research() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const bleu = useCountUp(0.7747, 1800, inView);

    return (
        <motion.section
            id="research"
            className={styles.researchSection}
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
        >
            <div className={styles.container}>
                {/* Header */}
                <motion.div
                    className={styles.sectionHeader}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className={styles.sectionBadge}>📜 Research & Publications</div>
                    <h2 className={styles.sectionTitle}>
                        Published <span className={styles.gradientText}>IEEE Research</span>
                    </h2>
                    <p className={styles.sectionSub}>
                        Peer-reviewed academic work advancing the intersection of AI and healthcare
                    </p>
                </motion.div>

                {/* Main Card — two column */}
                <motion.div
                    className={styles.pubCard}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    {/* Left — Paper details */}
                    <div className={styles.pubLeft}>
                        <div className={styles.pubTopRow}>
                            <div className={styles.publisherBadge}>
                                <i className="fas fa-book-open" />
                                <span>IEEE Xplore</span>
                            </div>
                            <span className={styles.yearPill}>2025</span>
                        </div>

                        <div className={styles.authorRole}>
                            <i className="fas fa-user-pen" />
                            <span>Main Author</span>
                        </div>

                        <h3 className={styles.paperTitle}>
                            "Bridging the Clinic-to-Community Gap: A Deep Learning Approach for Medical Info in Kannada"
                        </h3>

                        {/* Animated BLEU score */}
                        <div className={styles.bleuBox}>
                            <div className={styles.bleuScore}>
                                <span className={styles.bleuNumber}>{bleu.toFixed(4)}</span>
                                <span className={styles.bleuLabel}>BLEU Score</span>
                            </div>
                            <p className={styles.bleuContext}>
                                State-of-the-art performance on English-to-Kannada Medical NMT
                            </p>
                        </div>

                        <p className={styles.abstract}>
                            Engineered a high-performance Medical Neural Machine Translation system using
                            Transformer and BERT-like architectures. Optimises clinical data translation
                            for doctor-patient communication, bridging the language gap for 44M+
                            Kannada-speaking communities.
                        </p>

                        <div className={styles.tags}>
                            {tags.map((t) => (
                                <span key={t} className={styles.tag}>{t}</span>
                            ))}
                        </div>

                        <div className={styles.btnRow}>
                            <motion.a
                                href="https://ieeexplore.ieee.org/document/11376960"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.btnPrimary}
                                whileHover={{ y: -2, scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <i className="fas fa-external-link-alt" />
                                View on IEEE Xplore
                            </motion.a>
                            <div className={styles.doiBox}>
                                <i className="fas fa-fingerprint" />
                                <span>DOI: 10.1109/ICANCS65819.2025.11376960</span>
                            </div>
                        </div>
                    </div>

                    {/* Right — Award photo */}
                    <motion.div
                        className={styles.pubRight}
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.35 }}
                    >
                        <div className={styles.awardBadge}>
                            <i className="fas fa-trophy" />
                            <span>Best Paper Award</span>
                        </div>
                        <div className={styles.imgWrapper}>
                            <img src={ieeeBestPaper} alt="IEEE Best Paper Award" className={styles.awardImg} />
                            <div className={styles.imgGlow} />
                        </div>
                        <p className={styles.awardCaption}>ICANCS 2025, Bangalore, India</p>
                    </motion.div>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    className={styles.statsRow}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    {[
                        { val: '1', label: 'IEEE Publication' },
                        { val: '0.7747', label: 'BLEU Score' },
                        { val: '2025', label: 'Year Published' },
                        { val: '🏆', label: 'Best Paper Award' },
                    ].map((s) => (
                        <div key={s.label} className={styles.statBlock}>
                            <span className={styles.statVal}>{s.val}</span>
                            <span className={styles.statLabel}>{s.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}

export default Research;
