import React from 'react';
import { motion } from 'framer-motion';

function FooterSection() {
  return (
    <footer className="engagement-footer">
      <motion.div
        className="container text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="footer-names">Priyanka & Naveen</p>
        <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          Thank you for being part of our special day 💍
        </p>
        <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>
          May 7, 2026
        </p>
      </motion.div>
    </footer>
  );
}

export default React.memo(FooterSection);
