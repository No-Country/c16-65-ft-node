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
import { useEffect, useState } from "react";

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
    name: "Javier Damiani Arellano",
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
  const [showFooter, setShowFooter] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      //? Calcular la posición de desplazamiento y la altura total del documento
      const scrollY = window.scrollY || window.pageYOffset;
      const totalHeight = document.body.scrollHeight - window.innerHeight;

      //? Mostrar el footer solo cuando se llega al fondo de la página
      setShowFooter(scrollY >= totalHeight);
    };

    //? Agregar el evento de desplazamiento
    window.addEventListener("scroll", handleScroll);

    //? Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className={`footer ${showFooter ? "visible" : "hidden"}`}>
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
    </footer>
  );
};

export default Footer;
