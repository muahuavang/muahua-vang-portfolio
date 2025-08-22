import React from 'react';
import { motion } from 'framer-motion';

interface SkillCategory {
  id: number;
  title: string;
  skills: string[];
}

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      id: 1,
      title: "Programming & AI",
      skills: ["Python", "Java", "HTML", "CSS", "Cursor", "VS Code"]
    },
    {
      id: 2,
      title: "UX/HCI & Design",
      skills: ["Human-Computer Interaction", "Intuitive Design", "Unity", "Blender", "Figma"]
    },
    {
      id: 3,
      title: "Tools & Platforms",
      skills: ["Git", "Tableau", "Microsoft Office", "Google Drive", "Canva", "Windows OS"]
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Skills & Technologies
        </motion.h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={category.id}
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3 className="skill-title">{category.title}</h3>
              <div className="skill-items">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-item">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
