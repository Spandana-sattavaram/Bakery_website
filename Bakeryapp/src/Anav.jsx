import React, { useState } from "react";
import "./navbar.css";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useNavigate } from "react-router-dom";

function ANav() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleAccountClick = () => {
    setShowDropdown((prev) => !prev); // Toggle dropdown visibility
  };

  const handleLogout = () => {
    localStorage.removeItem("userId"); // Remove userId from localStorage
    navigate("/admin");  // Redirect to the login page
  };

  return (
    <>
      <div id="Head">
        <div id="logo">
          <img
            src="https://img.freepik.com/premium-vector/bakery-logo-design_260747-392.jpg"
            alt="Bakery Logo"
          />
          <h1>Random Bakers</h1>
        </div>

        <div id="top">
          <div id="account">
            <button id="btn" onClick={handleAccountClick}>
              <span className="icon">
                <PersonOutlineOutlinedIcon />
              </span>
              <span className="text">Admin</span>
            </button>

            {/* Dropdown for Admin Options */}
            {showDropdown && (
              <div className="dropdown">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr />
      <div id="main">
        <div id="Buttons">
          <a href="/customer">Customers</a>
          <a href="/aprod">Products</a>
          <a href="/aOrder">Orders</a>
          <a href="/addNew">Add</a>
        </div>
      </div>
      <hr />
    </>
  );
}

export default ANav;