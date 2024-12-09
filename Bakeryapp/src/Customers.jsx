import React, { useEffect, useState } from 'react';
import './Customer.css';


const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const fetchCustomerData = () => {
    
      fetch(`http://localhost:8080/customer`)
        .then(res => res.json())
        .then(data => setCustomers(data))
        .catch(err => console.error('Error fetching cart data:', err));
    
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);


  return (
    <div className="admin-page">
      <h1>Customer Details</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.user_id}>
              <td>{customer.user_id}</td>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;