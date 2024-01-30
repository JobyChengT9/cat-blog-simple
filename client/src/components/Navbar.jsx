import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../img/logo_black.png";
import Paw from "../img/cat_paw.png";

const Navbar = () => {
  const topics = ["SOCIAL", "HEALTH", "BEHAVIOUR", "ADOPTION"];
  const cat = useLocation().search.split("=")[1];

  return (
    <>
      <div className="navbar">
        <div className="container">
          <Link className="logo" to="/cat-blog-simple/">
            <img src={Logo} alt="logo" />
          </Link>
          <div className="catLinks">
            {topics.map((topic) => (
              <Link
                className="link"
                to={`/cat-blog-simple/?cat=${topic}`}
                key={topic}
                style={{
                  backgroundImage: cat === topic ? `url(${Paw})` : "none"
                }}
              >
                <h6>{topic}</h6>
              </Link>
            ))}
            <Link className="link" to={`/cat-blog-simple/scan`} key={"SCAN"}>
              <h6>SCAN</h6>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
