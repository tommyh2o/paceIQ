// src/pages/LearnMore.jsx
import React from "react";
import "./LearnMore.css";
import { Link } from "react-router-dom";

export default function LearnMore() {
  return (
    <section id="learn" className="learn-section">
      <div className="navbar">
        <Link to="/" className="logo">
          PaceIQ
        </Link>
        <button className="login-btn">Log In</button>
      </div>
      <div className="info-row">
        <div className="info-block">
          <h2>Designed for runners</h2>
          <p>
            Simply log your runs with us, and we’ll showcase all your statistics
            in one easy-to-access location. From PBs to longest distance run,
            get everything you want to know.
          </p>
          <button className="signup-cta">Sign Up Now!</button>
        </div>
        <div className="watch-image"></div>
      </div>
      <div className="images">
        <img src="/images/desert.jpg" alt="Runner" className="img" />
      </div>
      <div className="info-row">
        <div className="info-block-2">
          <h2>Level up your runs</h2>
          <p>
            Simply log your run by entering your distance, time, and pace splits
            from your favorite tracking app. We'll then provide you with details
            on how you compared to previous runs and how much you're improving
            for FREE.
          </p>
        </div>
      </div>
      <div className="images">
        <img src="/images/groupRun.jpg" alt="Group" className="img" />
      </div>
      <div className="info-row">
        <div className="leaderboard-image"></div>
        <div className="info-block">
          <h2>Custom Leaderboards</h2>
          <p>
            Add your friends and see where you stack up against them. Custom
            leaderboards for each major run:
          </p>
          <ul className="list">
            <li>5k</li>
            <li>10k</li>
            <li>Half Marathon</li>
            <li>Marathon</li>
            <li>Ultra</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
