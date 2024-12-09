import React, { useState } from 'react';
import "./User.css";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userId', data.userId); // Store user_id in localStorage
        alert(data.message); 
        navigate("/home");// Login successful
      } else {
        setLoginError(data.error || 'Invalid credentials'); // Display error message
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('An error occurred during login. Please try again.');
    }
  };

  return (
   
      <>
      <div id='background'>
      <div className="container">
              <div className="account">
                <h1>Customer Login</h1>
                <form className="account__form" onSubmit={handleLogin}>
                  <div className="account__form-block">
                    <label>Email</label>
                    <input
                      className='Linput'
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="account__form-block">
                    <label>Password</label>
                    <input
                       className='Linput'
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button className="button" type="submit">
                      Login
                    </button>
                  </div>

                  {loginError && <p className="error-message">{loginError}</p>}

                  <div className="links">
                    <a href="/sign">New Customer? Sign Up!</a>
                  </div>
                </form>
              </div> 
        
      </div>
      </div>
      </>
    
  );
}

export default Login;