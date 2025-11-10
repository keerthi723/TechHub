import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../utils/api";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(formData);
      login(response.data.token, response.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left">
          <div className="auth-image">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" fill="#036F3E" opacity="0.1" />
              <circle cx="100" cy="100" r="60" fill="#036F3E" opacity="0.2" />
              <path
                d="M100 50 L100 90 M100 110 L100 150 M70 100 L90 100 M110 100 L130 100"
                stroke="#036F3E"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h2>Welcome Back!</h2>
          <p>Login to access your secure dashboard</p>
        </div>

        <div className="auth-right">
          <h1 className="auth-title">Login</h1>
          <p className="auth-subtitle">Enter your credentials to continue</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="auth-link">
                Sign up
              </Link>
            </p>
          </div>

          <div className="social-login">
            <p className="social-title">Or login with</p>
            <div className="social-buttons">
              <button className="social-btn">Google</button>
              <button className="social-btn">GitHub</button>
              <button className="social-btn">Twitter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
