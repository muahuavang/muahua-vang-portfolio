import React from 'react';
import { motion } from 'framer-motion';

interface Competency {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const Competencies: React.FC = () => {
  const competencies: Competency[] = [
    {
      id: 1,
      title: "System Architecture",
      description: "Machine organization, assembly programming, and low-level system design through CS 252 coursework.",
      icon: "fas fa-microchip"
    },
    {
      id: 2,
      title: "Information Architecture",
      description: "Designing intuitive information systems and user experiences through LIS 461 and HCI principles.",
      icon: "fas fa-users"
    },
    {
      id: 3,
      title: "Digital Security",
      description: "Understanding human factors in information security and data protection through LIS 510.",
      icon: "fas fa-shield-alt"
    }
  ];

  return (
    <section id="competencies" className="competencies">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Technical Competencies
        </motion.h2>
        <div className="competencies-grid">
          {competencies.map((competency, index) => (
            <motion.div 
              key={competency.id}
              className="competency-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="competency-icon">
                <i className={competency.icon}></i>
              </div>
              <h3>{competency.title}</h3>
              <p>{competency.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Competencies;
