// src/components/Footer.jsx — Clean minimal footer
import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.gradientDivider} />
      <div className={styles.container}>
        <div className={styles.inner}>

          <div className={styles.brand}>
            <span className={styles.brandName}>PG</span>
            <p className={styles.brandTagline}>
              Published AI Researcher · Full-Stack Founder
            </p>
          </div>

          <nav className={styles.nav}>
            {['#about', '#skills', '#research', '#projects', '#experience', '#contact'].map((href) => (
              <a key={href} href={href} className={styles.navLink}>
                {href.slice(1)}
              </a>
            ))}
          </nav>

          <div className={styles.socials}>
            {[
              { href: 'https://github.com/PrajwalGaniga', icon: 'fab fa-github' },
              { href: 'https://www.linkedin.com/in/prajwalganiga', icon: 'fab fa-linkedin' },
              { href: 'https://www.youtube.com/@codeforge1', icon: 'fab fa-youtube' },
            ].map((s) => (
              <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <i className={s.icon} />
              </a>
            ))}
          </div>

        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} Prajwal Ganiga. Built with React + Vite + CSS Modules.
          </p>
          <p className={styles.copy}>Made with ❤️ in Mangalore, India</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;