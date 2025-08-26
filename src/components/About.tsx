import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>
        <div className="about-content">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p>
              I&apos;m a recent graduate from the University of Wisconsin–Madison
              with a Bachelor of Science in Information Science and a
              Certificate in Computer Science. Based in Madison, Wisconsin,
              I&apos;m passionate about developing intuitive AI solutions and
              writing efficient, scalable code to take on real-world
              challenges.
            </p>
            <p>
              With a strong foundation in programming (Java, Python, R, HTML,
              Cursor, VS Code) and experience in UX/HCI design, I focus on building
              unique, efficient, and intuitive applications. My expertise in
              prompting and code evaluation allows me to debug effectively and
              create innovative solutions that bridge the gap between human
              needs and technological capabilities.
            </p>
            <motion.div 
              className="about-stats"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="stat">
                <span className="stat-number">4</span>
                <span className="stat-label">Programming Languages</span>
              </div>
              <div className="stat">
                <span className="stat-number">4</span>
                <span className="stat-label">UX/HCI Courses</span>
              </div>
              <div className="stat">
                <span className="stat-number">4</span>
                <span className="stat-label">Leadership Roles</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
