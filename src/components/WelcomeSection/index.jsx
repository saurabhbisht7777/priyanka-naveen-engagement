import React, { Fragment, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useDateCountdown from '@hooks/useDateCountdown';
import { GOOGLE_CALENDAR_LINK, EVENT_DATE_STRING } from '@/constants';

function WelcomeSection({ guestName, isAnonymGuest, onClickDetail }) {
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const { days, hours, minutes, seconds, timeHasRunOut, isEventOver } = useDateCountdown();

  const handleScrollTo = () => {
    const el = document.getElementById('couple-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleOpen = () => {
    if (loading) return;
    try {
      const audio = document.getElementById('myAudio');
      if (audio) audio.play();
    } catch { /* silent */ }

    onClickDetail();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpened(true);
      handleScrollTo();
    }, 1200);
  };

  const renderCountdown = () => {
    if (timeHasRunOut) {
      return (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
          style={{ marginTop: '1.5rem' }}
        >
          <p style={{ fontSize: '1.2rem', color: 'var(--accent-light)' }}>
            {isEventOver ? 'The celebration has concluded! 💍' : 'The ceremony is happening now! ✨'}
          </p>
        </motion.div>
      );
    }

    return (
      <div className="countdown-wrapper">
        {[
          { value: days, label: 'Days' },
          { value: hours, label: 'Hours' },
          { value: minutes, label: 'Mins' },
          { value: seconds, label: 'Secs' },
        ].map((item, idx) => (
          <motion.div
            key={item.label}
            className="countdown-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + idx * 0.1, duration: 0.5 }}
          >
            <span className="number">{item.value}</span>
            <span className="label">{item.label}</span>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="engagement-hero">
      <div className="hero-content">
        <motion.p
          className="event-type"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Engagement Ceremony
        </motion.p>

        <motion.h1
          className="couple-names"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Priyanka & Naveen
        </motion.h1>

        <motion.div
          className="hero-divider"
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        <motion.p
          className="event-date-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {EVENT_DATE_STRING}
        </motion.p>

        {renderCountdown()}

        <motion.div
          className="guest-name-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {isAnonymGuest ? (
            <p className="dear-label">Dear Friends & Family</p>
          ) : (
            <Fragment>
              <p className="dear-label">Dear</p>
              <p className="guest-name">{guestName}</p>
            </Fragment>
          )}

          {!opened && (
            <motion.button
              className="open-invite-btn"
              onClick={handleOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? 'Opening...' : 'Open Invitation'}
            </motion.button>
          )}
        </motion.div>
      </div>

      <div className="scroll-indicator" onClick={opened ? handleScrollTo : undefined}>
        <div className="arrow" />
      </div>
    </div>
  );
}

export default WelcomeSection;
