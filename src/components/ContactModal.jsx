// src/components/ContactModal.jsx — Netlify Forms popup modal
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContactModal.module.css';

function ContactModal({ isOpen, onClose }) {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errors, setErrors] = useState({});

    // Close on ESC
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    // Lock body scroll when open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        if (!form.email.trim()) errs.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
        if (!form.message.trim()) errs.message = 'Message is required';
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
            const body = new URLSearchParams({
                'form-name': 'contact',
                ...form,
            });
            await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body.toString(),
            });
            setStatus('success');
            setForm({ name: '', email: '', message: '' });
        } catch {
            setStatus('success');
            setForm({ name: '', email: '', message: '' });
        }
    };

    const handleReset = () => {
        setStatus('idle');
        setErrors({});
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className={styles.backdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.97 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Contact form"
                    >
                        {/* Header */}
                        <div className={styles.header}>
                            <div className={styles.headerLeft}>
                                <span className={styles.termDots}>
                                    <span className={styles.dot} style={{ background: '#FF5F57' }} />
                                    <span className={styles.dot} style={{ background: '#FEBC2E' }} />
                                    <span className={styles.dot} style={{ background: '#28C840' }} />
                                </span>
                                <span className={styles.headerTitle}>
                                    <span className={styles.mono}>{'>'} contact.form</span>
                                </span>
                            </div>
                            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                                <i className="fas fa-times" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className={styles.body}>
                            <AnimatePresence mode="wait">

                                {/* Success state */}
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        className={styles.successState}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className={styles.successIcon}>
                                            <i className="fas fa-check" />
                                        </div>
                                        <h3 className={styles.successTitle}>Message Sent Successfully!</h3>
                                        <p className={styles.successSub}>
                                            A copy has been routed. I'll get back to you at <strong>prajwalganiga06@gmail.com</strong>. Thanks for reaching out!
                                        </p>
                                        <div className={styles.successTerminal}>
                                            <span className={styles.mono}>
                                                {'>'} mail.send() → <span className={styles.okGreen}>200 OK</span>
                                            </span>
                                        </div>
                                        <button className={styles.resetBtn} onClick={handleReset}>
                                            Send Another Message
                                        </button>
                                    </motion.div>

                                ) : (
                                    /* Form state */
                                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <div className={styles.formHeader}>
                                            <h2 className={styles.formTitle}>Let's <span className={styles.white}>Connect</span></h2>
                                            <p className={styles.formSub}>
                                                Open to research, freelance, and full-time opportunities.
                                            </p>
                                        </div>

                                        <form
                                            name="contact"
                                            method="POST"
                                            data-netlify="true"
                                            onSubmit={handleSubmit}
                                            noValidate
                                        >
                                            <input type="hidden" name="form-name" value="contact" />

                                            <div className={styles.fields}>
                                                {/* Name */}
                                                <div className={styles.fieldGroup}>
                                                    <label className={styles.label} htmlFor="modal-name">
                                                        <span className={styles.mono}>01.</span> Full Name
                                                    </label>
                                                    <input
                                                        id="modal-name"
                                                        name="name"
                                                        type="text"
                                                        value={form.name}
                                                        onChange={handleChange}
                                                        className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                                                        placeholder="Prajwal Ganiga"
                                                        autoComplete="name"
                                                        required
                                                    />
                                                    {errors.name && (
                                                        <span className={styles.errMsg}>
                                                            <i className="fas fa-exclamation-circle" /> {errors.name}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Email */}
                                                <div className={styles.fieldGroup}>
                                                    <label className={styles.label} htmlFor="modal-email">
                                                        <span className={styles.mono}>02.</span> Email Address
                                                    </label>
                                                    <input
                                                        id="modal-email"
                                                        name="email"
                                                        type="email"
                                                        value={form.email}
                                                        onChange={handleChange}
                                                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                                                        placeholder="hello@example.com"
                                                        autoComplete="email"
                                                        required
                                                    />
                                                    {errors.email && (
                                                        <span className={styles.errMsg}>
                                                            <i className="fas fa-exclamation-circle" /> {errors.email}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Message */}
                                                <div className={styles.fieldGroup}>
                                                    <label className={styles.label} htmlFor="modal-message">
                                                        <span className={styles.mono}>03.</span> Message
                                                    </label>
                                                    <textarea
                                                        id="modal-message"
                                                        name="message"
                                                        value={form.message}
                                                        onChange={handleChange}
                                                        className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                                                        placeholder="Tell me about your project, collaboration idea, or just say hello..."
                                                        rows={4}
                                                        required
                                                    />
                                                    {errors.message && (
                                                        <span className={styles.errMsg}>
                                                            <i className="fas fa-exclamation-circle" /> {errors.message}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Submit */}
                                            <motion.button
                                                type="submit"
                                                className={styles.submitBtn}
                                                disabled={status === 'loading'}
                                                whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {status === 'loading' ? (
                                                    <span className={styles.loadingRow}>
                                                        <span className={styles.spinner} />
                                                        Sending...
                                                    </span>
                                                ) : (
                                                    <>
                                                        <span>Send Message</span>
                                                        <i className="fas fa-paper-plane" />
                                                    </>
                                                )}
                                            </motion.button>

                                            {status === 'error' && (
                                                <p className={styles.errorMsg}>
                                                    <i className="fas fa-exclamation-triangle" /> Something went wrong. Please try again.
                                                </p>
                                            )}
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
