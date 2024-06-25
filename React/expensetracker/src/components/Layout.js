import React from "react";
import { useHistory ,useLocation } from 'react-router-dom';
import Navbar from "./Navbar/Navbar";
import "./Layout.css";
function Layout({ children }) {
  const location = useLocation()
  let containerClassName = "container"
  return (
    <div>
      {
        (location.pathname != '/login') ? <Navbar /> : <></>
      }
      {
        containerClassName = (location.pathname != '/login') ? <div className="app-container">{children}</div> : <div className="login-container">{children}</div>
      }
    </div>
  );
}

export default Layout;
