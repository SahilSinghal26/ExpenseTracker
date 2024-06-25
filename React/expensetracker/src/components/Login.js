import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';  
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
  
      const data = await response.json();
      console.log("Response data:", data); // Log the response data to check the structure
  
      const { user, token } = data;
  
      console.log("Login successful");
  
      // Store the user details and token in session storage
      sessionStorage.setItem("userId", user.id);
      sessionStorage.setItem("username", user.username);
      sessionStorage.setItem("name", user.name);
      console.log("User details stored in session storage:", user);
  
      // Log user ID after being set
      console.log("User ID:", sessionStorage.getItem("userId"));
  
      // Redirect to another page
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.message);
    }
  };

  return (
      <div className="login-card">
        <h2>Expense Tracker</h2>
        <h3>Enter your credentials</h3>
        <form className="login-form">
          <input id="username" type="text" placeholder="Username" autoComplete="false"/>
          <input id="password" type="password" placeholder="Password"/>
          <a href="#">Forgot Password?</a>
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
  );
};

export default Login;
