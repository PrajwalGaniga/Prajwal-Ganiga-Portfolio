// src/components/CustomCursor.jsx
import React, { useState, useEffect } from 'react';
import styles from './CustomCursor.module.css';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add to trail for particles effect
      setTrail(prev => [...prev.slice(-4), { x: e.clientX, y: e.clientY, id: Date.now() }]);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 150);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a, button') ||
          target.hasAttribute('data-cursor-pointer')) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    // Clean up trail particles
    const trailCleanup = setInterval(() => {
      setTrail(prev => prev.filter(point => Date.now() - point.id < 200));
    }, 100);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(trailCleanup);
    };
  }, []);

  const cursorClasses = `${styles.cursor} 
    ${hidden ? styles.hidden : ''} 
    ${isPointer ? styles.pointer : ''} 
    ${isClicking ? styles.clicking : ''}`;

  const dotClasses = `${styles.dot} ${hidden ? styles.hidden : ''}`;
  const auraClasses = `${styles.aura} ${isPointer ? styles.pointerAura : ''}`;

  return (
    <>
      {/* Trail Particles */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className={styles.trailParticle}
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            opacity: 1 - (index / trail.length),
            transform: `scale(${0.3 + (index * 0.1)})`
          }}
        />
      ))}
      
      {/* Outer Aura */}
      <div 
        className={auraClasses}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      
      {/* Main Cursor */}
      <div 
        className={cursorClasses}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      >
        <div className={styles.cursorInner}>
          <div className={styles.cursorSparkle}></div>
        </div>
      </div>
      
      {/* Center Dot */}
      <div 
        className={dotClasses}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      
      {/* Border Glow */}
      <div 
        className={styles.borderGlow}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
}

export default CustomCursor;