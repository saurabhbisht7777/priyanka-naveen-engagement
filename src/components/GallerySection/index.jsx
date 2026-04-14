import React from 'react';
import { motion } from 'framer-motion';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=450&fit=crop',
    alt: 'Engagement rings on flowers',
  },
  {
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=450&fit=crop',
    alt: 'Celebration moment',
  },
  {
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=450&fit=crop',
    alt: 'Beautiful decorations',
  },
  {
    src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&h=450&fit=crop',
    alt: 'Couple celebration',
  },
  {
    src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=450&fit=crop',
    alt: 'Ring ceremony',
  },
  {
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=450&fit=crop',
    alt: 'Joyful celebration',
  },
];

function GallerySection() {
  return (
    <div className="gallery-section">
      <div className="container">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Moments of Love</h2>
          <p className="section-subtitle" style={{ maxWidth: '500px', margin: '0 auto 3rem' }}>
            A glimpse of the beautiful journey that brought us here
          </p>
        </motion.div>

        <div className="gallery-grid">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              className="gallery-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GallerySection;
