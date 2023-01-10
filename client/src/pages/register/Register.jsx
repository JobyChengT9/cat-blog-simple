import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.scss";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="container">
        <div className="left">
          <h1>Share Your Cat Matters!</h1>
          <span>
            Do you have an account? <Link to="/login">Login</Link>
          </span>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              required
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
            />
            <input
              required
              type="email"
              placeholder="email"
              name="email"
              onChange={handleChange}
            />
            <input
              required
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <button onClick={handleRegister}>Register</button>
            {err && <p>{err}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
