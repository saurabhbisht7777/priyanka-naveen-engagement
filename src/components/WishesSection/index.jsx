import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialWishes = [
  { name: 'Family', text: 'Wishing you both a lifetime of love and happiness! May your journey together be filled with beautiful moments. 💕' },
  { name: 'Friends', text: 'Congratulations on your engagement! You two are perfect together. Here\'s to forever! 🥂' },
  { name: 'Loved Ones', text: 'So happy for both of you! May your love grow stronger with each passing day. 💍✨' },
];

function WishesSection() {
  const [wishes, setWishes] = useState(initialWishes);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setWishes([{ name: name.trim(), text: message.trim() }, ...wishes]);
    setName('');
    setMessage('');
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
          <p className="section-subtitle" style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
            Leave a heartfelt message for the couple
          </p>
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
            />
            <textarea
              placeholder="Write your wishes here..."
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="text-center">
              <button type="submit">Send Wishes ✨</button>
            </div>
          </form>
        </motion.div>

        <div style={{ maxWidth: '500px', margin: '2rem auto 0' }}>
          <AnimatePresence>
            {wishes.map((wish, idx) => (
              <motion.div
                key={`${wish.name}-${idx}`}
                className="wish-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div className="wish-name">{wish.name}</div>
                <div className="wish-text">{wish.text}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default WishesSection;
