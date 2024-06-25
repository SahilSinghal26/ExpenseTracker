import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <a className="navbar-brand" href="/dashboard">Expense Tracker</a>
        <div className="nav-items">
        <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>
          <Link to="/expense" className="btn btn-secondary">Expense</Link>
          <Link to="/groups" className="btn btn-secondary">Groups</Link>
          <Link to="/login" className="btn btn-success" id='signup-btn'>Sign Up/Login</Link>
        </div>
      </div>
    </nav>
  );
}  
export default Navbar;