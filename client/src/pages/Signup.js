import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { registerUser } from "../utils/api";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
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

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser(formData);
      login(response.data.token, response.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.msg || "Registration failed. Please try again."
      );
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
                d="M70 100 L90 120 L130 80"
                stroke="#036F3E"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <h2>Join Us Today!</h2>
          <p>Create an account to get started</p>
        </div>

        <div className="auth-right">
          <h1 className="auth-title">Sign Up</h1>
          <p className="auth-subtitle">Create your account in seconds</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

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
                placeholder="Create a password (min 6 characters)"
                required
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Login
              </Link>
            </p>
          </div>

          <div className="social-login">
            <p className="social-title">Or sign up with</p>
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

export default Signup;
