import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function UserForm() {
  const [user, setUser] = useState({ username: '', email: '' });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/api/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => console.log('User created:', data))
    .catch(error => console.error('Error creating user:', error));
    navigate("/login");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };
  
  return (
    <div className='login-card'>
    <form className='login-form' onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Submit</button>
      <div>Exisitng user? <a className='login-form-link' href='/login'>Login here</a></div>
    </form>
    </div>
  );
}

export default UserForm;