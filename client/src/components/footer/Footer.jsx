import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <a
        href="https://github.com/tushar-upadhya/whiteboard"
        className="icon"
        target="_blank"
      >
        <FaGithub size={24} />
      </a>
      <a
        href="https://www.linkedin.com/in/tushar-upadhyay-54029b135/?original_referer=https%3A%2F%2Ftusharupadhyay.vercel.app%2F"
        className="icon"
        target="_blank"
      >
        <FaLinkedin size={24} />
      </a>
      <p>
        © {new Date().getFullYear()}{" "}
        <a
          href="https://tusharupadhyay.vercel.app/"
          target="_blank"
          className="tushar"
        >
          Tushar Upadhyay
        </a>
      </p>
    </footer>
  );
};

export default Footer;
