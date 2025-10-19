// src/components/About.jsx - UPDATED WITH LEADERSHIP ROLES
import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import echoLogo from '../assets/logos/echo.png';
import acodeLogo from '../assets/logos/acode.png';

function About() {
  const stats = [
    { number: "3rd", label: "Year Student" },
    { number: "5th", label: "Semester" },
    { number: "CS&D", label: "Computer Science & Design" },
    { number: "SIT", label: "Srinivas Institute" }
  ];

  const interests = [
    { icon: "💻", name: "HTML & Canvas" },
    { icon: "🏐", name: "Volleyball" },
    { icon: "🎵", name: "Music" },
    { icon: "🎬", name: "Anime" },
    { icon: "📈", name: "Stock Analysis" },
    { icon: "🚀", name: "Tech Innovation" }
  ];

  const leadershipRoles = [
    {
      logo: echoLogo,
      title: "President",
      organization: "ECHO Tech Club",
      description: "Leading initiatives to help peers grow technically through workshops and collaborative projects"
    },
    {
      logo: acodeLogo,
      title: "Vice President",
      organization: "ACODE Association",
      description: "CS&D Department association fostering technical excellence and innovation"
    }
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>About Me</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Crafting <span className={styles.gradientText}>Digital Experiences</span> with Purpose
          </h2>
          <div className={styles.titleDivider}></div>
        </div>

        {/* Leadership Badges */}
        <div className={styles.leadershipSection}>
          {leadershipRoles.map((role, index) => (
            <motion.div 
              key={index}
              className={styles.leadershipBadge}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.roleLogo}>
                <img src={role.logo} alt={`${role.organization} logo`} />
              </div>
              <div className={styles.roleContent}>
                <div className={styles.roleTitle}>{role.title}</div>
                <div className={styles.roleOrganization}>{role.organization}</div>
                <div className={styles.roleDescription}>{role.description}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className={styles.contentGrid}>
          {/* Left Column - Intro & Stats */}
          <div className={styles.leftColumn}>
            <div className={styles.introCard}>
              <div className={styles.quoteIcon}>❝</div>
              <p className={styles.introText}>
                Hello! I'm <strong>Prajwal Ganiga</strong>, a passionate Computer Science and Design student driven by curiosity for intelligent solutions and commitment to creating inclusive experiences. I thrive on learning new technologies, solving complex problems, and bringing innovative ideas to life.
              </p>
              <div className={styles.quoteIcon}>❞</div>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statCard}>
                  <div className={styles.statNumber}>{stat.number}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Details & Interests */}
          <div className={styles.rightColumn}>
            {/* Details Card */}
            <div className={styles.detailsCard}>
              <h3 className={styles.cardTitle}>My Journey</h3>
              <div className={styles.detailsList}>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>🎓</div>
                  <div className={styles.detailContent}>
                    <strong>Current Education</strong>
                    <span>3rd Year BE in Computer Science & Design</span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>🏫</div>
                  <div className={styles.detailContent}>
                    <strong>Institution</strong>
                    <span>Srinivas Institute of Technology</span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>👨‍💼</div>
                  <div className={styles.detailContent}>
                    <strong>Leadership Roles</strong>
                    <span>President of ECHO Tech Club & Vice President of ACODE Association</span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>🎯</div>
                  <div className={styles.detailContent}>
                    <strong>Future Vision</strong>
                    <span>Living purposefully by building tech solutions that create meaningful impact</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interests Card */}
            <div className={styles.interestsCard}>
              <h3 className={styles.cardTitle}>Passions & Interests</h3>
              <div className={styles.interestsGrid}>
                {interests.map((interest, index) => (
                  <div key={index} className={styles.interestItem}>
                    <div className={styles.interestIcon}>{interest.icon}</div>
                    <span className={styles.interestName}>{interest.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className={styles.missionCard}>
          <div className={styles.missionIcon}>✨</div>
          <p className={styles.missionText}>
            "Building thoughtful tech that empowers every mind through innovative solutions and user-centered design."
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;