import React from "react";
import DraggableWindow from "./DraggableWindow";

const AboutMe = ({ onClose, zIndex, onFocus }) => {
  const [windowPosition, setWindowPosition] = React.useState({
    x: 100,
    y: 100,
  });

  return (
    <DraggableWindow
      title="About Me"
      position={windowPosition}
      onPositionChange={setWindowPosition}
      onClose={onClose}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <div className="about-me-content">
        {/* Rest of the AboutMe content remains the same */}
        <div className="about-section">
          <h2 className="text-xl mb-4 font-bold">Hello, I'm Aidan O'Donnell</h2>
          <p className="mb-4 text-base">
            I'm a Software Systems Engineer with expertise in automation, cloud
            technologies, and data infrastructure. Currently working at Jet
            Propulsion Laboratory, I maintain critical Ground Data Systems for
            Mars missions including the M2020 Perseverance rover. I'm passionate
            about optimizing system performance and creating reliable, scalable
            solutions.
          </p>
        </div>

        <div className="skills-section mb-6">
          <h3 className="text-lg mb-2 font-bold">Technical Skills</h3>
          <div className="skills-grid grid grid-cols-2 gap-2">
            <div className="skill-item p-2 border-2 border-[--text-color] bg-[--bg-color]">
              AWS / Cloud
            </div>
            <div className="skill-item p-2 border-2 border-[--text-color] bg-[--bg-color]">
              Python / Java
            </div>
            <div className="skill-item p-2 border-2 border-[--text-color] bg-[--bg-color]">
              Docker / Terraform
            </div>
            <div className="skill-item p-2 border-2 border-[--text-color] bg-[--bg-color]">
              Grafana / Telegraf
            </div>
          </div>
        </div>

        <div className="experience-section mb-6">
          <h3 className="text-lg mb-2 font-bold">Experience</h3>
          <div className="experience-item mb-4">
            <h4 className="font-bold">Jet Propulsion Laboratory</h4>
            <p className="text-sm">
              Software Systems Engineer • 2022 - Present
            </p>
            <p className="text-base">
              Maintaining critical Ground Data Systems for Mars missions,
              optimizing AWS infrastructure, and developing monitoring
              solutions. Implemented cost-saving measures while ensuring NASA
              security compliance.
            </p>
          </div>
          <div className="experience-item">
            <h4 className="font-bold">Skyworks Solutions</h4>
            <p className="text-sm">Automation Engineer Intern • 2021 - 2022</p>
            <p className="text-base">
              Developed automated systems for test data charting and analysis,
              reducing processing time by over 50%. Created web and desktop
              applications for improved accessibility.
            </p>
          </div>
        </div>

        <div className="education-section">
          <h3 className="text-lg mb-2 font-bold">Education & Certifications</h3>
          <div className="education-item">
            <h4 className="font-bold">Loyola Marymount University</h4>
            <p className="text-sm">B.S. Computer Science • 2022</p>
          </div>
          <div className="education-item mt-2">
            <h4 className="font-bold">Recent Certifications</h4>
            <p className="text-sm">• Developing on AWS (Oct 2023)</p>
            <p className="text-sm">
              • CCNA-Implementing and Administering Cisco Solutions (Nov 2024)
            </p>
          </div>
        </div>

        <div className="contact-section mt-6">
          <h3 className="text-lg mb-2 font-bold">Contact</h3>
          <div className="contact-item">
            <p className="text-sm">i.am.aidan@gmail.com • (805) 405-8052</p>
          </div>
        </div>
      </div>
    </DraggableWindow>
  );
};

export default AboutMe;
