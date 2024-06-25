import React from "react";
import { useHistory ,useLocation } from 'react-router-dom';
import Navbar from "./Navbar/Navbar";
import "./Layout.css";
function Layout({ children }) {
  const location = useLocation()
  return (
    <div>
      {
        (location.pathname == '/' || location.pathname == '/login') ? <></> : <Navbar />
      }
      {
        (location.pathname == '/' || location.pathname == '/login') ? <div className="login-container">{children}</div> : <div className="app-container">{children}</div>
      }
    </div>
  );
}

export default Layout;
