import React from 'react';
import { motion } from 'framer-motion';

function HelloSection() {
  return (
    <div id="couple-section" className="couple-section">
      <div className="container">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title" style={{ color: 'var(--primary-dark)' }}>
            We're Getting Engaged!
          </h2>
          <div className="hero-divider" style={{ background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }} />
          <p className="couple-intro-text">
            With hearts full of joy and gratitude, we invite you to celebrate the beginning of our forever.
            Two souls, one beautiful journey ahead.
          </p>
        </motion.div>

        <div className="row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <motion.div
            className="couple-card"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=300&fit=crop&crop=face"
              alt="Priyanka"
              className="couple-avatar"
            />
            <h3>Priyanka</h3>
          </motion.div>

          <motion.div
            className="couple-and"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            &amp;
          </motion.div>

          <motion.div
            className="couple-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
              alt="Naveen"
              className="couple-avatar"
            />
            <h3>Naveen</h3>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HelloSection;
