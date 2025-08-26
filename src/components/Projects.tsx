/**
 * Projects Component
 * 
 * This component showcases portfolio projects with:
 * - Project cards with detailed information
 * - Technology tags and project status
 * - Live demo and source code links
 * - Responsive grid layout
 * - Smooth animations and hover effects
 */

import React from 'react';
import { motion } from 'framer-motion';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Animation variants for project cards
 */
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  hover: { y: -8, scale: 1.02 }
};

// ============================================================================
// PROJECTS COMPONENT
// ============================================================================

const Projects: React.FC = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Featured Projects</h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {/* Project Card 1 */}
          <motion.div
            className="project-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className="project-icon">
              <i className="fas fa-code"></i>
            </div>
            <div className="project-content">
              <h3 className="project-title">Portfolio Website</h3>
              <p className="project-description">
                A modern, responsive portfolio website built with React and TypeScript. 
                Features smooth animations, dark/light theme switching, and mobile-first design.
              </p>
              <div className="project-tags">
                <span className="tag">React</span>
                <span className="tag">TypeScript</span>
                <span className="tag">CSS3</span>
                <span className="tag">Framer Motion</span>
              </div>
              <div className="project-links">
                <a href="#" className="btn btn-primary">View Live</a>
                <a href="#" className="btn btn-outline">Source Code</a>
              </div>
            </div>
          </motion.div>

          {/* Project Card 2 */}
          <motion.div
            className="project-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className="project-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="project-content">
              <h3 className="project-title">Data Analysis Project</h3>
              <p className="project-description">
                Comprehensive data analysis using Python and R for statistical modeling 
                and visualization. Focused on extracting meaningful insights from complex datasets.
              </p>
              <div className="project-tags">
                <span className="tag">Python</span>
                <span className="tag">R</span>
                <span className="tag">Pandas</span>
                <span className="tag">Matplotlib</span>
              </div>
              <div className="project-links">
                <a href="#" className="btn btn-primary">View Live</a>
                <a href="#" className="btn btn-outline">Source Code</a>
              </div>
            </div>
          </motion.div>

          {/* Project Card 3 */}
          <motion.div
            className="project-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className="project-icon">
              <i className="fas fa-palette"></i>
            </div>
            <div className="project-content">
              <h3 className="project-title">UX Research Study</h3>
              <p className="project-description">
                User experience research project analyzing user behavior patterns 
                and interface design effectiveness. Applied HCI principles and usability testing.
              </p>
              <div className="project-tags">
                <span className="tag">UX Research</span>
                <span className="tag">Usability Testing</span>
                <span className="tag">Figma</span>
                <span className="tag">User Interviews</span>
              </div>
              <div className="project-links">
                <a href="#" className="btn btn-primary">View Live</a>
                <a href="#" className="btn btn-outline">Source Code</a>
              </div>
            </div>
          </motion.div>
        </div>


      </div>
    </section>
  );
};

export default Projects;
