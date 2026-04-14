import React, { useCallback } from 'react';
import Particles from '@tsparticles/react';

const particleOptions = {
  fullScreen: false,
  particles: {
    number: { value: 40, density: { enable: true, area: 800 } },
    color: { value: ['#b76e79', '#c9a96e', '#d4a0a7', '#e8d5a8'] },
    shape: { type: 'circle' },
    opacity: {
      value: { min: 0.2, max: 0.6 },
      animation: { enable: true, speed: 0.8, minimumValue: 0.1 },
    },
    size: {
      value: { min: 1, max: 4 },
      animation: { enable: true, speed: 2, minimumValue: 0.5 },
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'out' },
    },
    twinkle: {
      particles: { enable: true, frequency: 0.03, opacity: 1 },
    },
  },
  detectRetina: true,
};

function ParticleBackground() {
  return (
    <Particles
      id="hero-particles"
      options={particleOptions}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  );
}

export default React.memo(ParticleBackground);
