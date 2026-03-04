// src/components/Research.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Research.module.css';
import ieeeBestPaper from '../assets/Achievements/IEEE_Best_Paper.jpeg';

function Research() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <motion.section
            id="research"
            className={styles.researchSection}
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={containerVariants}
        >
            {/* Animated Background */}
            <div className={styles.backgroundElements}>
                <div className={styles.floatingOrb1}></div>
                <div className={styles.floatingOrb2}></div>
                <div className={styles.gridPattern}></div>
            </div>

            <div className={styles.container}>
                {/* Section Header */}
                <motion.div className={styles.sectionHeader} variants={itemVariants}>
                    <div className={styles.sectionBadge}>
                        <span>📜 Research & Publications</span>
                    </div>
                    <h2 className={styles.sectionTitle}>
                        Published <span className={styles.gradientText}>IEEE Research</span>
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Peer-reviewed academic work advancing the intersection of AI and healthcare
                    </p>
                    <div className={styles.titleDivider}></div>
                </motion.div>

                {/* Main Publication Card */}
                <motion.div className={styles.publicationCard} variants={itemVariants}>
                    {/* Gradient Border */}
                    <div className={styles.cardGradientBorder}></div>

                    <div className={styles.cardContent}>
                        {/* Header: Publisher badge + award */}
                        <div className={styles.cardTop}>
                            <div className={styles.publisherBadge}>
                                <i className="fas fa-book-open"></i>
                                <span>IEEE Xplore Publication</span>
                            </div>
                            <div className={styles.yearBadge}>2025</div>
                        </div>

                        {/* Role */}
                        <div className={styles.authorRole}>
                            <i className="fas fa-user-edit"></i>
                            <span>Main Author</span>
                        </div>

                        {/* Paper Title */}
                        <h3 className={styles.paperTitle}>
                            "Bridging the Clinic-to-Community Gap: A Deep Learning Approach for Medical Info in Kannada"
                        </h3>

                        {/* Key Metric */}
                        <motion.div
                            className={styles.bleuScoreContainer}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={inView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                        >
                            <div className={styles.bleuScore}>
                                <span className={styles.scoreNumber}>0.7747</span>
                                <span className={styles.scoreLabel}>BLEU Score</span>
                            </div>
                            <div className={styles.scoreDivider}></div>
                            <div className={styles.scoreContext}>
                                <p>State-of-the-art performance on English-to-Kannada Medical NMT</p>
                            </div>
                        </motion.div>

                        {/* Abstract / Description */}
                        <p className={styles.paperAbstract}>
                            Engineered a high-performance Medical Neural Machine Translation (NMT) system using
                            Transformer and BERT-like architectures. The system optimizes clinical data translation
                            for doctor-patient communication and diagnostic imaging, bridging the language gap for
                            Kannada-speaking communities in accessing medical information.
                        </p>

                        {/* Tags */}
                        <div className={styles.techTags}>
                            {['Transformers', 'BERT', 'NMT', 'Medical NLP', 'Deep Learning', 'Kannada'].map((tag) => (
                                <span key={tag} className={styles.techTag}>{tag}</span>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className={styles.actionButtons}>
                            <motion.a
                                href="https://ieeexplore.ieee.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.primaryBtn}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <i className="fas fa-external-link-alt"></i>
                                <span>View on IEEE Xplore</span>
                            </motion.a>
                            <motion.div
                                className={styles.doiBox}
                                whileHover={{ scale: 1.02 }}
                            >
                                <i className="fas fa-fingerprint"></i>
                                <span>DOI: 10.1109/XXXXXX.2025.XXXXXXX</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Award Photo */}
                    <motion.div
                        className={styles.awardPhotoSection}
                        variants={itemVariants}
                    >
                        <div className={styles.awardBadge}>
                            <i className="fas fa-trophy"></i>
                            <span>Best Paper Award</span>
                        </div>
                        <motion.img
                            src={ieeeBestPaper}
                            alt="IEEE Best Paper Award"
                            className={styles.awardPhoto}
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        />
                        <p className={styles.awardCaption}>IEEE International Conference – Best Paper Award 2025</p>
                    </motion.div>
                </motion.div>

                {/* Stats Bar */}
                <motion.div className={styles.statsBar} variants={itemVariants}>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>1</span>
                        <span className={styles.statLabel}>IEEE Publication</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>0.7747</span>
                        <span className={styles.statLabel}>BLEU Score</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>2025</span>
                        <span className={styles.statLabel}>Publication Year</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>🏆</span>
                        <span className={styles.statLabel}>Best Paper Award</span>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default Research;
