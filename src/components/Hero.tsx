import React from 'react';
import { motion } from 'framer-motion';
import Particles from './Particles';

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId) as HTMLElement;
    if (element) {
      const headerElement = document.querySelector('.header') as HTMLElement;
      const headerHeight = headerElement?.offsetHeight || 0;
      const targetPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="hero">
      {/* Galaxy Background Effect */}
      <div className="hero-particles-background">
        <Particles
          particleColors={['#4f46e5', '#7c3aed', '#06b6d4', '#ffffff', '#a855f7', '#3b82f6']}
          particleCount={1600}
          particleSpread={30}
          speed={0.06}
          particleBaseSize={200}
          sizeRandomness={1.5}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>
      
      <div className="container">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              Hi, I&apos;m <span className="highlight">Muahua Ulysses Vang</span>
            </h1>
            <p className="hero-subtitle">AI Engineer & Software Developer</p>
            <p className="hero-description">
              Based in Madison, WI. I specialize in creating intuitive AI
              solutions and efficient code that makes a difference.
            </p>
            <div className="hero-buttons">
              <button onClick={() => scrollToSection('projects')} className="btn btn-primary">
                View My Work
              </button>
              <button onClick={() => scrollToSection('contact')} className="btn btn-secondary">
                Get In Touch
              </button>
            </div>
          </motion.div>
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="profile-image">
              <img
                src="/images/graduation-photo.jpg"
                alt="Muahua Ulysses Vang graduation photo"
                className="profile-photo"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
