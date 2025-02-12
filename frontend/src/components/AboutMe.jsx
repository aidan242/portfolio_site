import React, { useState, useEffect } from "react";
import DraggableWindow from "./DraggableWindow";

const AboutMe = ({ onClose, zIndex, onFocus }) => {
  const [windowPosition, setWindowPosition] = useState({
    x: 100,
    y: 100,
  });
  const [activeTab, setActiveTab] = useState(null); // Start with no tab selected

  const tabs = [
    { id: "bio", label: "Bio" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  // Set initial tab after a brief delay
  useEffect(() => {
    setActiveTab("bio");
  }, []);

  const renderTabContent = () => {
    if (!activeTab) return null; // Return nothing if no tab is selected

    switch (activeTab) {
      case "bio":
        return (
          <div className="about-section">
            <p>
              I'm a Software Systems Engineer with expertise in automation,
              cloud technologies, and data infrastructure. Currently working at
              Jet Propulsion Laboratory, I maintain critical Ground Data Systems
              for Mars missions including the M2020 Perseverance rover. I'm
              passionate about optimizing system performance and creating
              reliable, scalable solutions.
            </p>
          </div>
        );

      case "experience":
        return (
          <div className="about-section">
            <div className="experience-item">
              <h4>Jet Propulsion Laboratory</h4>
              <p className="date-text">
                Software Systems Engineer • 2022 - Present
              </p>
              <p className="description-text">
                Maintaining critical Ground Data Systems for Mars missions,
                optimizing AWS infrastructure, and developing monitoring
                solutions. Implemented cost-saving measures while ensuring NASA
                security compliance.
              </p>
            </div>
            <div className="experience-item">
              <h4>Skyworks Solutions</h4>
              <p className="date-text">
                Automation Engineer Intern • 2021 - 2022
              </p>
              <p className="description-text">
                Developed automated systems for test data charting and analysis,
                reducing processing time by over 50%. Created web and desktop
                applications for improved accessibility.
              </p>
            </div>
          </div>
        );

      case "education":
        return (
          <div className="about-section">
            <div className="education-item">
              <h4>Loyola Marymount University</h4>
              <p className="date-text">B.S. Computer Science • 2022</p>
            </div>
            <div className="education-item">
              <h4>Recent Certifications</h4>
              <p className="description-text">
                Developing on AWS (Oct 2023)
                <br />
                CCNA-Implementing and Administering Cisco Solutions (Nov 2024)
              </p>
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="about-section">
            <div className="skills-grid">
              <span className="skill-item">AWS / Cloud</span>
              <span className="skill-item">Python / Java</span>
              <span className="skill-item">Docker / Terraform</span>
              <span className="skill-item">Grafana / Telegraf</span>
              <span className="skill-item">CI/CD</span>
              <span className="skill-item">System Design</span>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="contact-section">
            <p className="contact-info">
              i.am.aidan@gmail.com • (805) 405-8052
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DraggableWindow
      title="About Me"
      position={windowPosition}
      onPositionChange={setWindowPosition}
      onClose={onClose}
      zIndex={zIndex}
      onFocus={onFocus}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <div className="about-me-content">
        <div className="tab-content">{renderTabContent()}</div>
      </div>
    </DraggableWindow>
  );
};

export default AboutMe;
