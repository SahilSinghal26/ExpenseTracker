import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by checking session storage for userId
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignout = () => {
    // Clear session storage
    sessionStorage.clear();
    setIsLoggedIn(false);
    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <a className="navbar-brand" href="/dashboard">Expense Tracker</a>
        <div className="nav-items">
          <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>
          <Link to="/expense" className="btn btn-secondary">Expense</Link>
          <Link to="/groups" className="btn btn-secondary">Groups</Link>
          {isLoggedIn ? (
            <button onClick={handleSignout} className="btn btn-danger" id='signout-btn'>Signout</button>
          ) : (
            <Link to="/login" className="btn btn-success" id='signup-btn'>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
