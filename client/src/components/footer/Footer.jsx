import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <a
        href="https://github.com/yourusername"
        className="icon"
        target="_blank"
      >
        <FaGithub size={24} />
      </a>
      <a
        href="https://linkedin.com/in/yourusername"
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
