import React, { useState, Fragment, useEffect, useCallback } from 'react';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import MainLayout from '@components/Layout';
import WelcomeSection from '@components/WelcomeSection';
import HelloSection from '@components/HelloSection';
import EventSection from '@components/EventSection';
import LocationSection from '@components/LocationSection';
import GallerySection from '@components/GallerySection';
import WishesSection from '@components/WishesSection';
import FooterSection from '@components/FooterSection';
import FloatingMusic from '@components/FloatingMusic';
import ParticleBackground from '@components/ParticleBackground';

function App() {
  const params = new URLSearchParams(window.location.search);
  const guestName = decodeURIComponent(params.get('to') || '');
  const isAnonymGuest = guestName === '';

  const [showDetailContent, setShowDetailContent] = useState(
    () => sessionStorage.getItem('invitation_opened') === 'true'
  );
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = e.clientX + 'px';
      sparkle.style.top = e.clientY + 'px';
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 600);
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClickDetail = () => {
    setShowDetailContent(true);
    sessionStorage.setItem('invitation_opened', 'true');
  };

  const renderDetailContent = () => {
    if (!showDetailContent) return null;

    return (
      <Fragment>
        <HelloSection />
        <EventSection />
        <LocationSection />
        <GallerySection />
        <WishesSection />
        <FooterSection />
      </Fragment>
    );
  };

  return (
    <MainLayout>
      <div style={{ position: 'relative' }}>
        {particlesReady && <ParticleBackground />}
        <WelcomeSection
          guestName={guestName}
          isAnonymGuest={isAnonymGuest}
          onClickDetail={handleClickDetail}
        />
      </div>
      {renderDetailContent()}
      <FloatingMusic />
    </MainLayout>
  );
}

export default App;
