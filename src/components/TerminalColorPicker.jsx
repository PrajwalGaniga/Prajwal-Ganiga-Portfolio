// src/components/TerminalColorPicker.jsx
// Terminal-style interactive color mode selector shown after loader
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TerminalColorPicker.module.css';

const LINES = [
    { text: '> Initializing Prajwal.dev...', delay: 0 },
    { text: '> Loading portfolio modules ✔', delay: 400 },
    { text: '> Detecting display preference...', delay: 900 },
    { text: '', delay: 1300 },
    { text: '┌─ SELECT THEME ───────────────────┐', delay: 1500 },
    { text: '│  [1]  Dark Mode  — default       │', delay: 1700 },
    { text: '│  [2]  Light Mode — light theme   │', delay: 1900 },
    { text: '└──────────────────────────────────┘', delay: 2100 },
];

const CURSOR_BLINK = 500;

function TerminalColorPicker({ onSelect }) {
    const [visibleLines, setVisibleLines] = useState([]);
    const [showPrompt, setShowPrompt] = useState(false);
    const [input, setInput] = useState('');
    const [cursorOn, setCursorOn] = useState(true);
    const [selected, setSelected] = useState(null);
    const inputRef = useRef(null);

    // Reveal lines one by one
    useEffect(() => {
        LINES.forEach(({ text, delay }) => {
            setTimeout(() => {
                setVisibleLines(prev => [...prev, text]);
            }, delay);
        });
        setTimeout(() => setShowPrompt(true), 2300);
    }, []);

    // Cursor blink
    useEffect(() => {
        const t = setInterval(() => setCursorOn(v => !v), CURSOR_BLINK);
        return () => clearInterval(t);
    }, []);

    // Auto-focus input
    useEffect(() => {
        if (showPrompt) inputRef.current?.focus();
    }, [showPrompt]);

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            const val = input.trim();
            if (val === '1' || val === '2') {
                const theme = val === '1' ? 'dark' : 'light';
                setSelected(theme);
                setTimeout(() => onSelect(theme), 800);
            } else {
                setInput('');
            }
        }
    };

    const handleClick = (val) => {
        setInput(val);
        setSelected(val === '1' ? 'dark' : 'light');
        setTimeout(() => onSelect(val === '1' ? 'dark' : 'light'), 800);
    };

    return (
        <motion.div
            className={styles.screen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            {/* CRT scanlines */}
            <div className={styles.scanlines} />
            <div className={styles.vignette} />

            {/* Terminal window */}
            <div className={styles.window}>
                {/* Title bar */}
                <div className={styles.titleBar}>
                    <div className={styles.dots}>
                        <span className={styles.dot} style={{ background: '#FF5F57' }} />
                        <span className={styles.dot} style={{ background: '#FEBC2E' }} />
                        <span className={styles.dot} style={{ background: '#28C840' }} />
                    </div>
                    <span className={styles.title}>prajwal@portfolio:~</span>
                </div>

                {/* Terminal body */}
                <div className={styles.body} onClick={() => inputRef.current?.focus()}>
                    {visibleLines.map((line, i) => (
                        <motion.div
                            key={i}
                            className={styles.line}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            {line || <span>&nbsp;</span>}
                        </motion.div>
                    ))}

                    <AnimatePresence>
                        {showPrompt && !selected && (
                            <motion.div
                                className={styles.inputRow}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <span className={styles.promptSym}>{'>'} Enter choice (1/2): </span>
                                <span className={styles.inputVal}>{input}</span>
                                <span className={`${styles.cursor} ${cursorOn ? styles.cursorOn : ''}`}>█</span>
                                <input
                                    ref={inputRef}
                                    className={styles.hiddenInput}
                                    value={input}
                                    onChange={e => setInput(e.target.value.slice(-1))}
                                    onKeyDown={handleKey}
                                    maxLength={1}
                                    autoComplete="off"
                                />
                            </motion.div>
                        )}

                        {showPrompt && !selected && (
                            <motion.div
                                className={styles.clickHint}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <button className={styles.choiceBtn} onClick={() => handleClick('1')}>
                                    [ 1 ] Dark Mode
                                </button>
                                <button className={styles.choiceBtn} onClick={() => handleClick('2')}>
                                    [ 2 ] Light Mode
                                </button>
                            </motion.div>
                        )}

                        {selected && (
                            <motion.div
                                className={styles.confirmLine}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <span className={styles.ok}>✔</span> Theme set: {selected} — launching portfolio...
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Skip link */}
            <button className={styles.skip} onClick={() => onSelect('dark')}>
                Press ESC to skip
            </button>
        </motion.div>
    );
}

export default TerminalColorPicker;
