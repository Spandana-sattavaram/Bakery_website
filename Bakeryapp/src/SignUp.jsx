import React, { useState } from 'react';
import "./User.css";
import { useNavigate } from 'react-router-dom';
function Sign() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();

    //  Ensure all fields are filled
    if (!firstName || !lastName || !email || !password) {
      alert('All fields are required!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Response from backend:', result); // Log the result for debugging
        alert(result.message); // Customer registered successfully
        navigate("/login");
      } else {
        console.error('Backend error:', result);  // Log the backend error for debugging
        alert('Error registering customer: ' + result.error);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during the signup process');
    }
  };

  return (
    <div id='background'>
      <div className='container'>
        <div className="account">
      <h1>Create an account</h1>
      <form onSubmit={handleSignup}>
        <div className="account__form-block">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="account__form-block">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="account__form-block">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="account__form-block">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          <button className="button" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}

export default Sign;