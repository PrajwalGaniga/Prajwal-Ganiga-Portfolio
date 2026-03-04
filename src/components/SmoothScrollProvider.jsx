// src/components/SmoothScrollProvider.jsx
import { useEffect } from 'react';
import Lenis from 'lenis';

function SmoothScrollProvider({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false, // disable on touch — keeps native momentum on mobile
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return children;
}

export default SmoothScrollProvider;
