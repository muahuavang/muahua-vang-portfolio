import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingContact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const headerElement = document.querySelector('.header') as HTMLElement;
      const headerHeight = headerElement?.offsetHeight || 0;
      
      if (scrollTop > headerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact') as HTMLElement;
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
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="floating-contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <button className="contact-btn floating" onClick={scrollToContact}>
            Contact Me
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingContact;
