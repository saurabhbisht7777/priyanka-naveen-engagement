import React from 'react';
import { motion } from 'framer-motion';
import { GOOGLE_CALENDAR_LINK, EVENT_DATE_STRING, EVENT_TIME_STRING } from '@/constants';

function EventSection() {
  return (
    <div className="event-section">
      <div className="container">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title" style={{ color: '#e8d5a8' }}>
            Ceremony Details
          </h2>
          <div className="hero-divider" style={{ marginBottom: '3rem' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="event-card">
            <div className="event-icon">💍</div>
            <h3>Ring Ceremony</h3>

            <div className="event-detail-row">
              <i className="icon-calendar" />
              <span>{EVENT_DATE_STRING}</span>
            </div>

            <div className="event-detail-row">
              <i className="icon-clock" />
              <span>{EVENT_TIME_STRING}</span>
            </div>

            <div className="event-detail-row">
              <i className="icon-location-pin" />
              <span>Venue details coming soon</span>
            </div>

            <a
              href={GOOGLE_CALENDAR_LINK}
              target="_blank"
              rel="noreferrer"
              className="add-calendar-btn"
            >
              Add to Calendar
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default React.memo(EventSection);
