import React from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  liveLink?: string;
  sourceLink?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "AI-Powered UX Design",
      description: "Developed intuitive user interfaces using Human-Computer Interaction principles and AI integration for enhanced user experiences.",
      icon: "fas fa-robot",
      tags: ["Python", "UX/HCI", "AI Integration"],
      liveLink: "#",
      sourceLink: "#"
    },
    {
      id: 2,
      title: "Virtual Reality Application",
      description: "Created immersive VR experiences using Unity and Blender, focusing on intuitive interaction design and user engagement.",
      icon: "fas fa-vr-cardboard",
      tags: ["Unity", "Blender", "VR Development"],
      liveLink: "#",
      sourceLink: "#"
    },
    {
      id: 3,
      title: "Data Science & Security",
      description: "Built secure data processing applications with focus on human factors in information security and data science concepts.",
      icon: "fas fa-database",
      tags: ["Python", "R", "Data Security"],
      liveLink: "#",
      sourceLink: "#"
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="project-image">
                <i className={project.icon}></i>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
              <div className="project-buttons">
                <a href={project.liveLink} className="project-btn primary">See Live</a>
                <a href={project.sourceLink} className="project-btn secondary">Source Code</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
