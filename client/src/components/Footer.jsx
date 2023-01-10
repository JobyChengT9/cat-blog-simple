import React from "react";
import Logo from "../img/logo_white.png";

const Footer = () => {
  return (
    <footer>
      <div className="shape">
        <div className="left"></div>
        <div className="right"></div>
      </div>
      <div className="content">
        <img src={Logo} alt="logo" />
        <span>
          Made with <b>cattitude</b> and <b>React.js</b>.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
