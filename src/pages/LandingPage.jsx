// src/LandingPage.js
import React from "react";
import "./LandingPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LandingPage = () => {
  const { currentUser, signInWithGoogle, signInWithApple } = useAuth();
  const navigate = useNavigate();
  
  const handleEmailSignup = () => {
    navigate("/signup");
  };
  
  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to sign in with Google:", error);
    }
  };
  
  const handleAppleSignup = async () => {
    try {
      await signInWithApple();
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to sign in with Apple:", error);
    }
  };

  return (
    <div className="landing-container">
      <div className="navbar">
        <div className="logo">PaceIQ</div>
        <Link to="/learn-more" className="learn-more-link">
          Learn More
        </Link>
        <Link to="/login" className="login-btn">Log In</Link>
      </div>
      <div className="center-wrapper">
        <div className="center-card">
          <div className="subtitle">Helping runners</div>
          <div className="title">RUN BETTER</div>
          <p className="description">
            Monitor your runs, check out leaderboards, and accelerate your
            progress.
          </p>

          <img
            src="/images/graph.png"
            alt="Run stats graph"
            className="chart-img"
          />

          <div className="signup-section">
            <p>
              Sign up now! <Link to="/login">Or login here.</Link>
            </p>
            <button 
              className="icon-left-btn"
              onClick={handleGoogleSignup}
            >
              <img
                src="/images/google-icon.svg"
                alt="Google"
                className="btn-icon"
              />
              <span className="btn-text">Sign Up With Google</span>
            </button>

            <button 
              className="icon-left-btn"
              onClick={handleAppleSignup}
            >
              <img
                src="/images/apple-icon.svg"
                alt="Apple"
                className="btn-icon"
              />
              <span className="btn-text">Sign Up With Apple</span>
            </button>
            <button 
              className="email-btn"
              onClick={handleEmailSignup}
            >
              Sign up with email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;