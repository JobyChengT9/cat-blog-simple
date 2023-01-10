import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import Logo from "../img/logo_black.png";
import Paw from "../img/cat_paw.png";
import defaultIcon from "../img/cat_icon.jpg";
import ClickAwayListener from "react-click-away-listener";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [popup, setPopup] = useState(false);
  const [acc, setAcc] = useState(false);
  const [file, setFile] = useState(null);
  //const [pwd, setPwd] = useState("");
  const topics = ["SOCIAL", "HEALTH", "BEHAVIOUR", "ADOPTION"];
  const cat = useLocation().search.split("=")[1];

  useEffect(() => {
    const upload = async () => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("/upload", formData);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };

    const handleChange = async () => {
      if (file != null) {
        const imgUrl = await upload();
        try {
          await axios.put(`/user/${currentUser.id}`, {
            img: file ? imgUrl : "",
          });
        } catch (err) {
          console.log(err);
        }
        logout();
      }
    };

    handleChange();
  }, [file]);

  return (
    <div className="navbar">
      <div className="container">
        <Link className="logo" to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <div className="right">
          <div className="catLinks">
            {topics.map((topic) => (
              <Link
                className="link"
                to={`/?cat=${topic}`}
                key={topic}
                style={{
                  backgroundImage: cat === topic ? `url(${Paw})` : "none",
                }}
              >
                <h6>{topic}</h6>
              </Link>
            ))}
          </div>
          <div className="auth">
            {currentUser ? (
              <>
                <img
                  className="icon1"
                  src={
                    currentUser.img
                      ? `../../upload/${currentUser.img}`
                      : defaultIcon
                  }
                  alt=""
                  onClick={() => {
                    setPopup(true);
                  }}
                />
                {popup && (
                  <ClickAwayListener onClickAway={() => setPopup(false)}>
                    <div className="menu">
                      <img
                        className="icon2"
                        src={
                          currentUser.img
                            ? `../../upload/${currentUser.img}`
                            : defaultIcon
                        }
                        alt=""
                      />
                      <p>{currentUser.username}</p>
                      <span onClick={() => setAcc(!acc)}>Account settings</span>
                      {acc && (
                        <>
                          <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            name=""
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                          <label className="file" htmlFor="file">
                            Change Icon
                          </label>
                          {/* <span>Change Password</span> */}
                        </>
                      )}
                      <span>
                        <Link
                          className="link"
                          to="/write"
                          onClick={() => setPopup(false)}
                        >
                          Write
                        </Link>
                      </span>
                      <span onClick={logout} style={{ fontWeight: "bold" }}>
                        Logout
                      </span>
                    </div>
                  </ClickAwayListener>
                )}
              </>
            ) : (
              <>
                <span className="buttons">
                  <Link className="link" to="/register">
                    Join Us
                  </Link>
                </span>
                <span className="buttons">
                  <Link className="link" to="/login">
                    Login
                  </Link>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
