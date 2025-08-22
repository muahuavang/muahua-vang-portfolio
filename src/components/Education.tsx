import React from 'react';
import { motion } from 'framer-motion';

const Education: React.FC = () => {
  return (
    <section id="education" className="education">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Education & Leadership
        </motion.h2>
        <div className="education-content">
          <motion.div 
            className="education-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="education-header">
              <h3>University of Wisconsin-Madison</h3>
              <p className="education-subtitle">
                Bachelor of Science, Information Science | Computer Science Certificate
              </p>
              <p className="education-date">May 2025</p>
            </div>
            <div className="education-details">
              <h4>Relevant Coursework:</h4>
              <div className="course-categories">
                <div className="course-category">
                  <h5>Programming & Engineering</h5>
                  <ul>
                    <li>CS 200, 300, 400 (Programming Fundamentals)</li>
                    <li>CS 252 (Intro to Computer Engineering)</li>
                  </ul>
                </div>
                <div className="course-category">
                  <h5>UX/HCI & Design</h5>
                  <ul>
                    <li>CS 570 (Human-Computer Interaction)</li>
                    <li>LIS 470 (Interaction Design Studio)</li>
                    <li>CS 579 (Virtual Reality)</li>
                    <li>LIS 461 (Information Architecture)</li>
                  </ul>
                </div>
                <div className="course-category">
                  <h5>Information Science & Security</h5>
                  <ul>
                    <li>LIS 440 (Concepts of Data & Info Science)</li>
                    <li>LIS 510 (Human Factors in Info Security)</li>
                    <li>LIS 351 (Introduction to Digital Information)</li>
                    <li>LIS 202 (The Information Society)</li>
                  </ul>
                </div>
              </div>
              <div className="academic-highlights">
                <h4>Academic Highlights:</h4>
                <ul>
                  <li>
                    <strong>Research Focus:</strong> Human-Computer Interaction and AI integration
                  </li>
                  <li>
                    <strong>Technical Skills:</strong> Programming, data analysis, and system design
                  </li>
                  <li>
                    <strong>Leadership:</strong> Active involvement in multicultural organizations and community service
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="leadership-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="leadership-header">
              <h3>Lambda Phi Epsilon International Fraternity</h3>
              <p className="leadership-subtitle">
                Multicultural Greek Council | Madison, WI
              </p>
            </div>
            <div className="leadership-details">
              <h4>Leadership Positions:</h4>
              <ul>
                <li>
                  <strong>Philanthropy Chair:</strong> Planned and led events for 100+ attendees
                </li>
                <li>
                  <strong>Fundraising Chair:</strong> Directed successful fundraising initiatives
                </li>
                <li>
                  <strong>Recruitment Chair:</strong> Enhanced chapter visibility and membership
                </li>
                <li>
                  <strong>Social Chair:</strong> Organized community service and social events
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
