import React, { useState } from "react";
import "./Role.css";
import { useNavigate } from "react-router-dom";
function Role() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "") {
      alert("Please select a role");
      return;
    }
    if (role === "admin") {
      navigate("/admin");
      //  Add logic for redirection to admin page
    } else if (role === "user") {
      navigate("/login");
      // Add logic for redirection to user page
    }
  };

  return (
    <>
    <div id="background">

    <div className="role-container">
      <h1>Select Your Role</h1>
      <p className="subtitle">Choose whether you're a User or an Admin to continue.</p>
      <form onSubmit={handleSubmit} className="role-form">
        <div className="form-group">
          <label htmlFor="role">Are you a User or Admin?</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="role-button">
          Proceed
        </button>
      </form>
      <footer>
        <p>©️ 2024 Your App. All Rights Reserved.</p>
      </footer>
    </div>
    </div>
    </>
  );
}

export default Role;