import React from "react";
import Navbar from "./Navbar/Navbar";
import "./Layout.css";
function Layout({ children }) {
  return (
    <div style={{ height: "100%", width: "100%", background: "cyan"}}>
      <Navbar />
      <div className="main-content">
        <div className="content" style={{ display: 'flex', justifyContent: "center", width: '100%'
        }}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
