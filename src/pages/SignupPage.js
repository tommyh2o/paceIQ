import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./SignupPage.css";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { signup, signInWithGoogle, signInWithApple } = useAuth();
  const navigate = useNavigate();

  async function handleEmailSignup(e) {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    
    try {
      setError("");
      setLoading(true);
      await signup(email, password, {
        username,
        name,
        phoneNumber,
        dateOfBirth,
        ageRange
      });
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to create an account: " + error.message);
    }
    
    setLoading(false);
  }
  
  async function handleGoogleSignup() {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to sign in with Google: " + error.message);
    }
    setLoading(false);
  }
  
  async function handleAppleSignup() {
    try {
      setError("");
      setLoading(true);
      await signInWithApple();
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to sign in with Apple: " + error.message);
    }
    setLoading(false);
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Your PaceIQ Account</h2>
        {error && <div className="error-message">{error}</div>}
        
        <div className="social-signup">
          <button 
            className="social-btn google-btn" 
            onClick={handleGoogleSignup}
            disabled={loading}
          >
            <img src="/images/google-icon.svg" alt="Google" />
            <span>Sign Up With Google</span>
          </button>
          
          <button 
            className="social-btn apple-btn" 
            onClick={handleAppleSignup}
            disabled={loading}
          >
            <img src="/images/apple-icon.svg" alt="Apple" />
            <span>Sign Up With Apple</span>
          </button>
          
          <div className="divider">
            <span>or</span>
          </div>
        </div>
        
        <form onSubmit={handleEmailSignup}>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password *</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="age-range">Age Range</label>
            <select
              id="age-range"
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
            >
              <option value="">Select age range</option>
              <option value="under18">Under 18</option>
              <option value="18-24">18-24</option>
              <option value="25-34">25-34</option>
              <option value="35-44">35-44</option>
              <option value="45-54">45-54</option>
              <option value="55-64">55-64</option>
              <option value="65+">65+</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="signup-submit-btn"
            disabled={loading}
          >
            Create Account
          </button>
        </form>
        
        <div className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
