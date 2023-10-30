import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("idToken")
  );

  const handleLogout = () => {
    localStorage.removeItem("idToken");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <Router>
      <div>
        <Navigation isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
