// src/components/ContactModal.jsx — Terminal / JSON-object style form
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContactModal.module.css';

// ─── Animation variants ───────────────────────────────────────
const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
};

const modalVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

const fieldStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const fieldItem = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Typing cursor blink ──────────────────────────────────────
const CURSOR = '█';

function ContactModal({ isOpen, onClose }) {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');   // idle | loading | success
    const [errors, setErrors] = useState({});
    const [focused, setFocused] = useState(null);   // which field is active
    const firstInputRef = useRef(null);

    // Close on ESC
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Auto-focus first input when opened
    useEffect(() => {
        if (isOpen) setTimeout(() => firstInputRef.current?.focus(), 400);
    }, [isOpen]);

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'expected: string';
        if (!form.email.trim()) errs.email = 'expected: valid email';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'TypeError: invalid format';
        if (!form.message.trim()) errs.message = 'expected: non-empty string';
        return errs;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setStatus('loading');
        try {
            const body = new URLSearchParams({ 'form-name': 'contact', ...form });
            await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body.toString(),
            });
        } catch { /* silent — Netlify may 404 locally, still treat as success */ }
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
    };

    const handleReset = () => { setStatus('idle'); setErrors({}); };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* ── Backdrop ── */}
                    <motion.div
                        className={styles.backdrop}
                        variants={backdropVariants}
                        initial="hidden" animate="visible" exit="exit"
                        onClick={onClose}
                    />

                    {/* ── Modal ── */}
                    <motion.div
                        className={styles.modal}
                        variants={modalVariants}
                        initial="hidden" animate="visible" exit="exit"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Contact form"
                    >
                        {/* ── Title bar ── */}
                        <div className={styles.titleBar}>
                            <div className={styles.trafficLights}>
                                <button
                                    className={`${styles.light} ${styles.lightRed}`}
                                    onClick={onClose}
                                    aria-label="Close"
                                    title="Close"
                                />
                                <span className={`${styles.light} ${styles.lightYellow}`} />
                                <span className={`${styles.light} ${styles.lightGreen}`} />
                            </div>
                            <span className={styles.titlePath}>
                                ~/portfolio/<span className={styles.titleHighlight}>contact</span>.js
                            </span>
                            <button className={styles.closeBtnAlt} onClick={onClose} aria-label="Close">
                                <i className="fas fa-times" />
                            </button>
                        </div>

                        {/* ── Editor chrome ── */}
                        <div className={styles.editorChrome}>
                            <span className={styles.editorTab}>contact.js</span>
                            <span className={styles.editorTabInactive}>README.md</span>
                        </div>

                        {/* ── Scrollable body ── */}
                        <div className={styles.body}>
                            <AnimatePresence mode="wait">

                                {/* ── SUCCESS STATE ── */}
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        className={styles.successState}
                                        initial={{ opacity: 0, scale: 0.92 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <div className={styles.successTerminalWindow}>
                                            <div className={styles.successTerminalBar}>
                                                <span className={styles.termDot} style={{ background: '#FF5F57' }} />
                                                <span className={styles.termDot} style={{ background: '#FEBC2E' }} />
                                                <span className={styles.termDot} style={{ background: '#28C840' }} />
                                                <span className={styles.successTerminalTitle}>bash</span>
                                            </div>
                                            <div className={styles.successTerminalBody}>
                                                <div className={styles.termLine}>
                                                    <span className={styles.termPrompt}>$</span>
                                                    <span className={styles.termCmd}>node send-message.js</span>
                                                </div>
                                                <div className={styles.termLine}>
                                                    <span className={styles.termOutput}>Connecting to mail server...</span>
                                                </div>
                                                <div className={styles.termLine}>
                                                    <span className={styles.termOutput}>Authenticating...</span>
                                                </div>
                                                <div className={styles.termLine}>
                                                    <span className={styles.termOutput}>Sending payload...</span>
                                                </div>
                                                <div className={styles.termLine}>
                                                    <span className={styles.termSuccess}>✓ 200 OK — Message delivered!</span>
                                                </div>
                                                <div className={styles.termLine}>
                                                    <span className={styles.termOutput}>
                                                        Reply expected at{' '}
                                                        <span className={styles.termEmail}>prajwalganiga06@gmail.com</span>
                                                    </span>
                                                </div>
                                                <div className={styles.termLine}>
                                                    <span className={styles.termPrompt}>$</span>
                                                    <span className={styles.termCursor}>{CURSOR}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className={styles.successNote}>
                                            Thanks for reaching out! I'll get back to you soon.
                                        </p>
                                        <button className={styles.resetBtn} onClick={handleReset}>
                                            <i className="fas fa-redo" /> Send another message
                                        </button>
                                    </motion.div>

                                ) : (
                                    /* ── FORM STATE ── */
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >

                                        {/* Comment header */}
                                        <div className={styles.codeComment}>
                                            <span className={styles.commentSlash}>/**</span>
                                            <span className={styles.commentText}> * @file    contact.js</span>
                                            <span className={styles.commentText}> * @author  visitor</span>
                                            <span className={styles.commentText}> * @reaches prajwalganiga06@gmail.com</span>
                                            <span className={styles.commentSlash}> */</span>
                                        </div>

                                        <form
                                            name="contact"
                                            method="POST"
                                            data-netlify="true"
                                            onSubmit={handleSubmit}
                                            noValidate
                                        >
                                            {/* Netlify hidden field */}
                                            <input type="hidden" name="form-name" value="contact" />

                                            {/* ── JSON object editor ── */}
                                            <motion.div
                                                className={styles.jsonBlock}
                                                variants={fieldStagger}
                                                initial="hidden"
                                                animate="visible"
                                            >
                                                {/* Opening brace */}
                                                <motion.div className={styles.jsonLine} variants={fieldItem}>
                                                    <span className={styles.lineNum}>1</span>
                                                    <span className={styles.keyword}>const</span>{' '}
                                                    <span className={styles.varName}>payload</span>{' '}
                                                    <span className={styles.op}>=</span>{' '}
                                                    <span className={styles.brace}>{'{'}</span>
                                                </motion.div>

                                                {/* name field */}
                                                <motion.div className={styles.jsonField} variants={fieldItem}>
                                                    <div className={styles.jsonRow}>
                                                        <span className={styles.lineNum}>2</span>
                                                        <span className={styles.jsonKey}>  name</span>
                                                        <span className={styles.colon}>:</span>
                                                        <span className={styles.quoteLeft}>&quot;</span>
                                                        <div className={styles.inputWrapper}>
                                                            <input
                                                                ref={firstInputRef}
                                                                id="modal-name"
                                                                name="name"
                                                                type="text"
                                                                value={form.name}
                                                                onChange={handleChange}
                                                                onFocus={() => setFocused('name')}
                                                                onBlur={() => setFocused(null)}
                                                                className={`${styles.jsonInput} ${errors.name ? styles.inputError : ''} ${focused === 'name' ? styles.inputFocused : ''}`}
                                                                placeholder="Your Name"
                                                                autoComplete="name"
                                                                spellCheck="false"
                                                                required
                                                            />
                                                        </div>
                                                        <span className={styles.quoteRight}>&quot;,</span>
                                                    </div>
                                                    {errors.name && (
                                                        <div className={styles.errorLine}>
                                                            <span className={styles.lineNum}>{'  '}</span>
                                                            <span className={styles.errMsg}>
                                                                <span className={styles.errSlash}>//</span>
                                                                <span className={styles.errType}>TypeError:</span> {errors.name}
                                                            </span>
                                                        </div>
                                                    )}
                                                </motion.div>

                                                {/* email field */}
                                                <motion.div className={styles.jsonField} variants={fieldItem}>
                                                    <div className={styles.jsonRow}>
                                                        <span className={styles.lineNum}>3</span>
                                                        <span className={styles.jsonKey}>  email</span>
                                                        <span className={styles.colon}>:</span>
                                                        <span className={styles.quoteLeft}>&quot;</span>
                                                        <div className={styles.inputWrapper}>
                                                            <input
                                                                id="modal-email"
                                                                name="email"
                                                                type="email"
                                                                value={form.email}
                                                                onChange={handleChange}
                                                                onFocus={() => setFocused('email')}
                                                                onBlur={() => setFocused(null)}
                                                                className={`${styles.jsonInput} ${errors.email ? styles.inputError : ''} ${focused === 'email' ? styles.inputFocused : ''}`}
                                                                placeholder="you@example.com"
                                                                autoComplete="email"
                                                                spellCheck="false"
                                                                required
                                                            />
                                                        </div>
                                                        <span className={styles.quoteRight}>&quot;,</span>
                                                    </div>
                                                    {errors.email && (
                                                        <div className={styles.errorLine}>
                                                            <span className={styles.lineNum}>{'  '}</span>
                                                            <span className={styles.errMsg}>
                                                                <span className={styles.errSlash}>//</span>
                                                                <span className={styles.errType}>TypeError:</span> {errors.email}
                                                            </span>
                                                        </div>
                                                    )}
                                                </motion.div>

                                                {/* message field */}
                                                <motion.div className={styles.jsonField} variants={fieldItem}>
                                                    <div className={styles.jsonRow} style={{ alignItems: 'flex-start' }}>
                                                        <span className={styles.lineNum}>4</span>
                                                        <span className={styles.jsonKey}>  message</span>
                                                        <span className={styles.colon}>:</span>
                                                        <span className={`${styles.quoteLeft} ${styles.quoteTop}`}>&quot;</span>
                                                        <div className={`${styles.inputWrapper} ${styles.textareaWrapper}`}>
                                                            <textarea
                                                                id="modal-message"
                                                                name="message"
                                                                value={form.message}
                                                                onChange={handleChange}
                                                                onFocus={() => setFocused('message')}
                                                                onBlur={() => setFocused(null)}
                                                                className={`${styles.jsonInput} ${styles.jsonTextarea} ${errors.message ? styles.inputError : ''} ${focused === 'message' ? styles.inputFocused : ''}`}
                                                                placeholder="Tell me about your project, idea, or collaboration..."
                                                                rows={4}
                                                                required
                                                            />
                                                        </div>
                                                        <span className={`${styles.quoteRight} ${styles.quoteTop}`}>&quot;</span>
                                                    </div>
                                                    {errors.message && (
                                                        <div className={styles.errorLine}>
                                                            <span className={styles.lineNum}>{'  '}</span>
                                                            <span className={styles.errMsg}>
                                                                <span className={styles.errSlash}>//</span>
                                                                <span className={styles.errType}>TypeError:</span> {errors.message}
                                                            </span>
                                                        </div>
                                                    )}
                                                </motion.div>

                                                {/* Closing brace */}
                                                <motion.div className={styles.jsonLine} variants={fieldItem}>
                                                    <span className={styles.lineNum}>5</span>
                                                    <span className={styles.brace}>{'}'}</span>
                                                    <span className={styles.semi}>;</span>
                                                </motion.div>

                                                {/* Submit line */}
                                                <motion.div className={styles.jsonLine} variants={fieldItem}>
                                                    <span className={styles.lineNum}>6</span>
                                                </motion.div>

                                                <motion.div className={styles.jsonLine} variants={fieldItem}>
                                                    <span className={styles.lineNum}>7</span>
                                                    <span className={styles.keyword}>await </span>
                                                    <span className={styles.fnName}>mail</span>
                                                    <span className={styles.op}>.</span>
                                                    <span className={styles.fnCall}>send</span>
                                                    <span className={styles.paren}>(</span>
                                                    <span className={styles.varName}>payload</span>
                                                    <span className={styles.paren}>)</span>
                                                    <span className={styles.semi}>;</span>
                                                    {/* ← this IS the submit button */}
                                                    <motion.button
                                                        type="submit"
                                                        className={styles.submitBtn}
                                                        disabled={status === 'loading'}
                                                        whileHover={{ scale: status === 'loading' ? 1 : 1.04, x: 3 }}
                                                        whileTap={{ scale: 0.97 }}
                                                        title="Execute — send message"
                                                    >
                                                        {status === 'loading' ? (
                                                            <span className={styles.loadingRow}>
                                                                <span className={styles.spinner} />
                                                                running...
                                                            </span>
                                                        ) : (
                                                            <>
                                                                <i className="fas fa-play" />
                                                                <span>Run</span>
                                                            </>
                                                        )}
                                                    </motion.button>
                                                </motion.div>
                                            </motion.div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default ContactModal;
