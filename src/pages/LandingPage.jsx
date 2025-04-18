import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="navbar">
        <div className="logo">PaceIQ</div>
        <Link to="/learn-more" className="learn-more-link">
          Learn More
        </Link>
        <button className="login-btn">Log In</button>
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
            <button className="icon-left-btn">
              <img
                src="/images/google-icon.svg"
                alt="Google"
                className="btn-icon"
              />
              <span className="btn-text">Sign Up With Google</span>
            </button>

            <button className="icon-left-btn">
              <img
                src="/images/apple-icon.svg"
                alt="Apple"
                className="btn-icon"
              />
              <span className="btn-text">Sign Up With Apple</span>
            </button>
            <button className="email-btn">Sign up with email</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
