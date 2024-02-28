import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./footer.css";

const programmers = [
  {
    name: "Florencia Adid",
    role: "Frontend",
    linkedin: "https://www.linkedin.com/in/florenciaadid/",
    github: "https://github.com/florenciaadid",
  },
  {
    name: "Fernando Torrón",
    role: "FullStack",
    linkedin: "https://www.linkedin.com/in/fertorron/",
    github: "https://github.com/FerTorron",
  },
  {
    name: "Javier Luis Damiani Arellano",
    role: "FullStack",
    linkedin: "https://www.linkedin.com/in/javierluisdamianiarellano/",
    github: "https://github.com/javierdamiani",
  },
  {
    name: "Daniel Perea Mosquera",
    role: "Frontend",
    linkedin: "https://www.linkedin.com/in/daniel-perea-mosquera-3b3017127/",
    github: "https://github.com/ygdani89",
  },
  {
    name: "David E. Etchepare",
    role: "Project Manager",
    linkedin: "https://www.linkedin.com/in/etcheparede/",
    github: "https://github.com/etchepared",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <ul className="programmers-list">
          {programmers.map((programmer, index) => (
            <li key={index} className="programmer-item">
              <div className="programmer-info">
                <div className="programmer-name">{programmer.name}</div>
                <div className="programmer-details">
                  <div className="programmer-role">{programmer.role}</div>
                  <div className="social-icons">
                    <a
                      href={programmer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="linkedin-icon" />
                    </a>
                    <a
                      href={programmer.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="github-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
