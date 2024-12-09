import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const [data, setData] = useState(null); // Change to null initially
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Fetch user details from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId); // Update userId state
    } else {
      navigate('/login'); //  Redirect to login if no userId
    }
  }, [navigate]);

  // Fetch user data from API when userId is available
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/profile/${userId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch profile data');
          }
          return res.json();
        })
        .then((data) => setData(data[0])) // Assuming the data is an array, extract the first element
        .catch((err) => console.log(err));
    }
  }, [userId]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="profile-container">
      {data ? (
        <>
          <div className="profile-header">
            <img
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" // Replace with the actual profile image URL
              alt="Profile Logo"
              className="profile-logo"
            />
            <h1 id="Profile-head">Name: {data.first_name}</h1>
          </div>
          <p id="Profile-para"><strong>User ID:</strong> {userId}</p>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p> // Display a loading message until data is fetched
      )}
    </div>
  );
}