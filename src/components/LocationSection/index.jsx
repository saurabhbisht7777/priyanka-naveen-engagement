import React from 'react';
import { motion } from 'framer-motion';
import { GOOGLE_MAPS_LINK } from '@/constants';

function LocationSection() {
  return (
    <div className="location-section">
      <div className="container">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title" style={{ color: 'var(--primary-dark)' }}>
            Venue
          </h2>
          <div className="hero-divider" style={{ background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }} />
          <p className="section-subtitle" style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
            Join us at the celebration venue
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '2rem',
            maxWidth: '600px',
            margin: '0 auto',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
              <i className="icon-location-pin" style={{ color: 'var(--primary)', marginRight: '8px' }} />
              Venue details will be shared soon
            </p>
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className="add-calendar-btn"
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                color: '#fff',
                border: 'none',
              }}
            >
              View on Google Maps
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default React.memo(LocationSection);
