// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
// import Dashboard from "./pages/Dashboard";
// import ForgotPassword from "./pages/ForgotPassword";
import LearnMore from "./pages/LearnMore";

// Private route component
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          <Route path="/learn-more" element={<LearnMore />} />
          {/* <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;