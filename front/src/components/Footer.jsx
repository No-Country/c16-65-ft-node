import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  GiBatMask,
  GiSpiderMask,
  GiAmericanShield,
  GiPenguin,
  GiBoomerang,
} from "react-icons/gi";

import "./footer.css";

const programmers = [
  {
    name: "Florencia Adid",
    role: "Frontend",
    linkedin: "https://www.linkedin.com/in/florenciaadid/",
    github: "https://github.com/florenciaadid",
    img: <GiBatMask />,
  },
  {
    name: "Fernando Torrón",
    role: "FullStack",
    linkedin: "https://www.linkedin.com/in/fertorron/",
    github: "https://github.com/FerTorron",
    img: <GiSpiderMask />,
  },
  {
    name: "Javier Luis Damiani Arellano",
    role: "FullStack",
    linkedin: "https://www.linkedin.com/in/javierluisdamianiarellano/",
    github: "https://github.com/javierdamiani",
    img: <GiAmericanShield />,
  },
  {
    name: "Daniel Perea Mosquera",
    role: "Frontend",
    linkedin: "https://www.linkedin.com/in/daniel-perea-mosquera-3b3017127/",
    github: "https://github.com/ygdani89",
    img: <GiBoomerang />,
  },
  {
    name: "David E. Etchepare",
    role: "Project Manager",
    linkedin: "https://www.linkedin.com/in/etcheparede/",
    github: "https://github.com/etchepared",
    img: <GiPenguin />,
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
                  <div className="programmer-role">
                    {programmer.img} &nbsp;&nbsp;
                    {programmer.role}
                  </div>
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
