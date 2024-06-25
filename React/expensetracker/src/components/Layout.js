import React from "react";
import { useLocation } from 'react-router-dom';
import Navbar from "./Navbar/Navbar";
import "./Layout.css";
function Layout({ children }) {
  const location = useLocation()
  const isLoginPage = () => {
    return (location.pathname == '/' || location.pathname == '/login')
  }
  const getContainerClass = () => {
    return isLoginPage() ? "login-container" : "app-container"
  }
  return (
    <div>
      {
        isLoginPage() ? <></> : <Navbar />
      }
      {
        <div className={getContainerClass()}>{children}</div>
      }
    </div>
  );
}

export default Layout;
