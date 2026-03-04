// src/components/CustomCursor.jsx — Physics-based, zero re-render cursor
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.css';

function CustomCursor() {
  const dotRef = useRef(null);
  const isHovered = useRef(false);
  const isClicking = useRef(false);
  const ringRef = useRef(null);

  // Raw mouse position for dot (no spring — snaps perfectly)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-interpolated position for ring (lags behind)
  const springConfig = { stiffness: 200, damping: 28, mass: 0.6 };
  const ringX = useSpring(rawX, springConfig);
  const ringY = useSpring(rawY, springConfig);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const onMouseDown = () => {
      isClicking.current = true;
      if (ringRef.current) {
        ringRef.current.classList.add(styles.ringClicking);
        ringRef.current.classList.remove(styles.ringHovered);
      }
    };

    const onMouseUp = () => {
      isClicking.current = false;
      if (ringRef.current) {
        ringRef.current.classList.remove(styles.ringClicking);
        if (isHovered.current) {
          ringRef.current.classList.add(styles.ringHovered);
        }
      }
    };

    const onMouseOver = (e) => {
      const target = e.target?.closest('a, button, [data-cursor]');
      if (target) {
        isHovered.current = true;
        if (ringRef.current && !isClicking.current) {
          ringRef.current.classList.add(styles.ringHovered);
        }
        if (dotRef.current) dotRef.current.classList.add(styles.dotHovered);
      } else {
        isHovered.current = false;
        if (ringRef.current) ringRef.current.classList.remove(styles.ringHovered);
        if (dotRef.current) dotRef.current.classList.remove(styles.dotHovered);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [rawX, rawY]);

  return (
    <>
      {/* Center dot — exact cursor position, no lag */}
      <motion.div
        ref={dotRef}
        className={styles.dot}
        style={{ x: rawX, y: rawY, translateX: '-50%', translateY: '-50%' }}
      />

      {/* Outer ring — lags behind via spring physics */}
      <motion.div
        ref={ringRef}
        className={styles.ring}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
}

export default CustomCursor;