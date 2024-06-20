import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <a className="navbar-brand" href="/dashboard">Expense Tracker</a>
        <div className="nav-items">
        <Link to="/dashboard" className="btn btn-outline-secondary">Dashboard</Link>
          <Link to="/expense" className="btn btn-outline-secondary">Expense</Link>
          <Link to="/groups" className="btn btn-outline-secondary">Groups</Link>
          <Link to="/login" className="btn btn-outline-success" id='signup-btn'>Sign Up/Login</Link>
        </div>
      </div>
    </nav>
  );
}  
export default Navbar;