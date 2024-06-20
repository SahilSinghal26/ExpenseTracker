// import React, {useState} from 'react'
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import "./Login.css";

// const Login = () => {
//   let navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // navigate('/dashboard');
//     console.log('Username:', username);
//     console.log('Password:', password);
//     // You can add more logic here to handle form submission, such as sending data to a server
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       <div>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <button type="submit">Submit</button>
//       <p>
//       New User? <Link to="/signup">Signup here</Link>
//       </p>
//     </form>
//   )
// }
// export default Login

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';  

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
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <p>
        New User? <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
};

export default Login;
