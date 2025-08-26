/**
 * Main Application Component
 * 
 * This component serves as the root of the portfolio application, managing:
 * - Theme state (light/dark mode) with localStorage persistence
 * - System theme preference detection
 * - Component composition and layout
 * - Error boundaries and global state
 * 
 * The component follows a mobile-first responsive design approach and
 * implements proper accessibility features including semantic HTML structure.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Component imports
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Education from './components/Education';
import Competencies from './components/Competencies';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';


// Type imports
import { Theme } from './types';

// Style imports
import './App.css';
import './components.css';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Local storage keys for persistent data
 */
const STORAGE_KEYS = {
  THEME: 'portfolio-theme',
  LAST_VISIT: 'portfolio-last-visit'
} as const;

/**
 * Animation variants for page transitions
 */
const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Main App component that orchestrates the entire portfolio application
 */
const App: React.FC = () => {
  // ========================================================================
  // STATE MANAGEMENT
  // ========================================================================
  
  /** Current theme state */
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  /** Loading state for theme initialization */
  const [isThemeLoading, setIsThemeLoading] = useState<boolean>(true);
  
  /** Error state for theme operations */
  const [themeError, setThemeError] = useState<string | null>(null);

  // ========================================================================
  // EFFECTS
  // ========================================================================

  /**
   * Initialize theme on component mount
   * Detects system preference and loads saved theme from localStorage
   */
  useEffect(() => {
    const initializeTheme = (): void => {
      try {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme | null;
        
        // Detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set theme based on saved preference or system preference
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
          setIsDarkMode(true);
        }
        
        // Record last visit
        localStorage.setItem(STORAGE_KEYS.LAST_VISIT, new Date().toISOString());
        
      } catch (error) {
        console.error('Failed to initialize theme:', error);
        setThemeError('Failed to load theme preferences');
        
        // Fallback to system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
      } finally {
        setIsThemeLoading(false);
      }
    };

    initializeTheme();
  }, []);

  /**
   * Apply theme changes to DOM and localStorage
   * Updates body classes and persists theme preference
   */
  useEffect(() => {
    if (isThemeLoading) return;

    try {
      // Apply theme to body element
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        document.documentElement.setAttribute('data-theme', 'light');
      }
      
      // Persist theme preference
      localStorage.setItem(STORAGE_KEYS.THEME, isDarkMode ? 'dark' : 'light');
      
    } catch (error) {
      console.error('Failed to apply theme:', error);
      setThemeError('Failed to apply theme changes');
    }
  }, [isDarkMode, isThemeLoading]);

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  /**
   * Toggle between light and dark themes
   * Handles theme switching with error handling
   */
  const handleThemeToggle = useCallback((): void => {
    try {
      setIsDarkMode(prevMode => !prevMode);
      setThemeError(null); // Clear any previous errors
    } catch (error) {
      console.error('Failed to toggle theme:', error);
      setThemeError('Failed to toggle theme');
    }
  }, []);

  /**
   * Handle theme preference changes from system
   * Listens for system theme changes and updates accordingly
   */
  const handleSystemThemeChange = useCallback((event: MediaQueryListEvent): void => {
    try {
      // Only update if no user preference is saved
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      if (!savedTheme) {
        setIsDarkMode(event.matches);
      }
    } catch (error) {
      console.error('Failed to handle system theme change:', error);
    }
  }, []);

  // ========================================================================
  // SYSTEM THEME LISTENER
  // ========================================================================

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Add listener for system theme changes
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [handleSystemThemeChange]);

  // ========================================================================
  // ERROR BOUNDARY
  // ========================================================================

  // Display theme error if one occurs
  if (themeError && !isThemeLoading) {
    console.warn('Theme error:', themeError);
  }

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <motion.div 
      className="App"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Header with theme toggle */}
      <Header 
        isDarkMode={isDarkMode} 
        onToggleTheme={handleThemeToggle} 
      />
      

      
      {/* Main content area */}
      <main role="main">
        <Hero />
        <About />
        <Projects />
        <Education />
        <Competencies />
        <Skills />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Theme error notification (accessibility) */}
      {themeError && (
        <div 
          className="theme-error-notification" 
          role="alert" 
          aria-live="polite"
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#f44336',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '4px',
            fontSize: '14px',
            zIndex: 1000
          }}
        >
          {themeError}
        </div>
      )}
    </motion.div>
  );
};

export default App;
