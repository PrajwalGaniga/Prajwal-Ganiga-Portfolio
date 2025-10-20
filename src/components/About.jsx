// src/components/About.jsx - UPDATED & OPTIMIZED
import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import echoLogo from '../assets/logos/echo.png';
import acodeLogo from '../assets/logos/acode.png';

function About() {
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

  const interests = [
    { icon: "💻", name: "Web Development" },
    { icon: "🎨", name: "UI/UX Design" },
    { icon: "🚀", name: "Tech Innovation" },
    { icon: "📈", name: "Stock Analysis" },
    { icon: "🏐", name: "Volleyball" },
    { icon: "🎵", name: "Music Production" }
  ];

  const skills = [
    { category: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "React"] },
    { category: "Design", items: ["Figma", "UI/UX", "Prototyping"] },
    { category: "Tools", items: ["Git", "VS Code", "Chrome DevTools"] }
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.gridPattern}></div>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>About Me</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Crafting <span className={styles.gradientText}>Digital Experiences</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Computer Science & Design student passionate about creating meaningful technology solutions
          </p>
        </div>

        {/* Main Content Grid - Updated Layout */}
        <div className={styles.contentGrid}>
          {/* Column 1: Intro & Leadership */}
          <div className={styles.column}>
            {/* Intro Card */}
            <motion.div 
              className={styles.introCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.profileHeader}>
                <div className={styles.avatar}>PG</div>
                <div className={styles.profileInfo}>
                  <h3>Prajwal Ganiga</h3>
                  <p>3rd Year CS&D Student</p>
                </div>
              </div>
              <p className={styles.introText}>
                Passionate about building intelligent solutions and creating inclusive digital experiences. 
                I thrive on learning new technologies and bringing innovative ideas to life through code and design.
              </p>
            </motion.div>

            {/* Leadership Section */}
            <div className={styles.leadershipSection}>
              <h3 className={styles.sectionSubtitle}>Leadership Roles</h3>
              <div className={styles.leadershipGrid}>
                {leadershipRoles.map((role, index) => (
                  <motion.div 
                    key={index}
                    className={styles.leadershipCard}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={styles.roleHeader}>
                      <img src={role.logo} alt={role.organization} className={styles.roleLogo} />
                      <div className={styles.roleTitles}>
                        <h4>{role.title}</h4>
                        <p>{role.organization}</p>
                      </div>
                    </div>
                    <p className={styles.roleDescription}>{role.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Details & Skills */}
          <div className={styles.column}>
            {/* Education & Details */}
            <motion.div 
              className={styles.detailsCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className={styles.cardTitle}>Education & Journey</h3>
              <div className={styles.detailsList}>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>🎓</div>
                  <div className={styles.detailContent}>
                    <strong>Bachelor of Engineering</strong>
                    <span>Computer Science & Design • 3rd Year</span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>🏫</div>
                  <div className={styles.detailContent}>
                    <strong>Srinivas Institute of Technology</strong>
                    <span>Currently in 5th Semester</span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>🎯</div>
                  <div className={styles.detailContent}>
                    <strong>Future Vision</strong>
                    <span>Building tech that creates meaningful impact</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skills Card */}
            <motion.div 
              className={styles.skillsCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className={styles.cardTitle}>Skills & Technologies</h3>
              <div className={styles.skillsGrid}>
                {skills.map((skill, index) => (
                  <div key={index} className={styles.skillCategory}>
                    <h4>{skill.category}</h4>
                    <div className={styles.skillItems}>
                      {skill.items.map((item, itemIndex) => (
                        <span key={itemIndex} className={styles.skillItem}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Column 3: Interests & Mission */}
          <div className={styles.column}>
            {/* Interests Card */}
            <motion.div 
              className={styles.interestsCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className={styles.cardTitle}>Passions & Interests</h3>
              <div className={styles.interestsGrid}>
                {interests.map((interest, index) => (
                  <div key={index} className={styles.interestItem}>
                    <div className={styles.interestIcon}>{interest.icon}</div>
                    <span className={styles.interestName}>{interest.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Mission Statement */}
            <motion.div 
              className={styles.missionCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className={styles.missionHeader}>
                <div className={styles.missionIcon}>✨</div>
                <h3>My Mission</h3>
              </div>
              <p className={styles.missionText}>
                "Building thoughtful technology that empowers every mind through innovative solutions 
                and user-centered design principles."
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;