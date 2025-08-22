import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      setIsMenuOpen(false); // Close menu after clicking
    }
  };

  const scrollToContact = () => {
    scrollToSection('contact');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header 
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="logo">
          <span className="logo-text">MV</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="nav desktop-nav">
          <ul className="nav-list">
            <li><button onClick={() => scrollToSection('about')} className="nav-link">About</button></li>
            <li><button onClick={() => scrollToSection('projects')} className="nav-link">Projects</button></li>
            <li><button onClick={() => scrollToSection('education')} className="nav-link">Education</button></li>
            <li><button onClick={() => scrollToSection('competencies')} className="nav-link">Competencies</button></li>
            <li><button onClick={() => scrollToSection('skills')} className="nav-link">Skills</button></li>
            <li><button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button></li>
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        <button className="hamburger" onClick={toggleMenu}>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <div className="header-controls">
          <button className="theme-toggle" onClick={onToggleTheme}>
            <i className={isDarkMode ? "fas fa-sun" : "fas fa-moon"}></i>
          </button>
          <button className="contact-btn" onClick={scrollToContact}>Contact Me</button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="mobile-nav-list">
              <li><button onClick={() => scrollToSection('about')} className="mobile-nav-link">About</button></li>
              <li><button onClick={() => scrollToSection('projects')} className="mobile-nav-link">Projects</button></li>
              <li><button onClick={() => scrollToSection('education')} className="mobile-nav-link">Education</button></li>
              <li><button onClick={() => scrollToSection('competencies')} className="mobile-nav-link">Competencies</button></li>
              <li><button onClick={() => scrollToSection('skills')} className="mobile-nav-link">Skills</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="mobile-nav-link">Contact</button></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
