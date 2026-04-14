import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = '/api/wishes';
const POLL_INTERVAL = 8000;

function parseWish(item) {
  if (typeof item === 'string') {
    try { return JSON.parse(item); } catch { return null; }
  }
  return item;
}

function timeAgo(ts) {
  if (!ts) return '';
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function WishesSection() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');
  const [liveCount, setLiveCount] = useState(0);
  const pollRef = useRef(null);

  const fetchWishes = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) return;
      const data = await res.json();
      const parsed = (data.wishes || []).map(parseWish).filter(Boolean);
      setWishes(parsed);
      setLiveCount(parsed.length);
    } catch { /* silent - API may not be configured yet */ }
  }, []);

  useEffect(() => {
    fetchWishes();
    pollRef.current = setInterval(fetchWishes, POLL_INTERVAL);
    return () => clearInterval(pollRef.current);
  }, [fetchWishes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || sending) return;

    setSending(true);
    setStatus('');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), text: message.trim() }),
      });

      if (!res.ok) throw new Error('Failed to send');

      const data = await res.json();
      const parsed = (data.wishes || []).map(parseWish).filter(Boolean);
      setWishes(parsed);
      setLiveCount(parsed.length);
      setName('');
      setMessage('');
      setStatus('sent');
      setTimeout(() => setStatus(''), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(''), 4000);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="wishes-section">
      <div className="container">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Send Your Wishes</h2>
          <p className="section-subtitle" style={{ maxWidth: '500px', margin: '0 auto 1rem' }}>
            Leave a heartfelt message for the couple
          </p>
          {liveCount > 0 && (
            <div className="live-indicator">
              <span className="live-dot" />
              <span>{liveCount} wish{liveCount !== 1 ? 'es' : ''} and counting</span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form className="wish-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
            />
            <textarea
              placeholder="Write your wishes here..."
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
            />
            <div className="text-center">
              <button type="submit" disabled={sending}>
                {sending ? 'Sending...' : 'Send Wishes ✨'}
              </button>
            </div>
            {status === 'sent' && (
              <motion.p
                className="text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: 'var(--primary)', marginTop: '0.8rem', fontSize: '0.9rem' }}
              >
                Your wishes have been sent! 💕
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                className="text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: '#e74c3c', marginTop: '0.8rem', fontSize: '0.9rem' }}
              >
                Could not send. Please try again.
              </motion.p>
            )}
          </form>
        </motion.div>

        <div style={{ maxWidth: '500px', margin: '2rem auto 0' }}>
          <AnimatePresence mode="popLayout">
            {wishes.map((wish, idx) => (
              <motion.div
                key={wish.timestamp || `wish-${idx}`}
                className="wish-card"
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="wish-name">{wish.name}</div>
                  {wish.timestamp && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', opacity: 0.6 }}>
                      {timeAgo(wish.timestamp)}
                    </span>
                  )}
                </div>
                <div className="wish-text">{wish.text}</div>
              </motion.div>
            ))}
          </AnimatePresence>

          {wishes.length === 0 && (
            <motion.p
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ color: 'var(--text-muted)', marginTop: '1rem', fontStyle: 'italic' }}
            >
              Be the first to send your wishes! 🌟
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WishesSection;
