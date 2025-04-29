import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login, signInWithGoogle, signInWithApple } = useAuth();
  const navigate = useNavigate();

  async function handleEmailLogin(e) {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      // For simplicity, we're assuming emailOrUsername is an email
      // In a production app, you would check if it's an email or username
      // and query Firestore to find the corresponding email if it's a username
      await login(emailOrUsername, password);
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to log in: " + error.message);
    }
    
    setLoading(false);
  }
  
  async function handleGoogleLogin() {
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
  
  async function handleAppleLogin() {
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
    <div className="login-container">
      <div className="login-card">
        <h2>Log In to PaceIQ</h2>
        {error && <div className="error-message">{error}</div>}
        
        <div className="social-login">
          <button 
            className="social-btn google-btn" 
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <img src="/images/google-icon.svg" alt="Google" />
            <span>Log In With Google</span>
          </button>
          
          <button 
            className="social-btn apple-btn" 
            onClick={handleAppleLogin}
            disabled={loading}
          >
            <img src="/images/apple-icon.svg" alt="Apple" />
            <span>Log In With Apple</span>
          </button>
          
          <div className="divider">
            <span>or</span>
          </div>
        </div>
        
        <form onSubmit={handleEmailLogin}>
          <div className="form-group">
            <label htmlFor="email-username">Email or Username</label>
            <input
              type="text"
              id="email-username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          
          <button 
            type="submit" 
            className="login-submit-btn"
            disabled={loading}
          >
            Log In
          </button>
        </form>
        
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;