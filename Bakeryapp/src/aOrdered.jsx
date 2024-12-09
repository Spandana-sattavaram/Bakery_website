import React, { useState, useEffect } from 'react';
import './ReviewPage.css';
import { useLocation } from 'react-router-dom';
function AReview() {
  const [products, setPro] = useState([]);
  const location = useLocation(); 
  const { orderId } = location.state || {}; // Ensure this is getting the orderId properly

  // Load user ID from localStor

  // Fetch products for review
  const fetchReviewData = () => {
   
      fetch(`http://localhost:8080/rev/${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched data:", data); //  Log the fetched data to check the structure
          // Ensure data is an array before setting state
          if (Array.isArray(data)) {
            setPro(data);
          } else {
            console.error("Fetched data is not an array:", data);
            setPro([]); // Set empty array in case of invalid response
          }
        })
        .catch((err) => {
          console.error('Error fetching review data:', err);
          setPro([]); // Set empty array on error
        });
    
  };
  useEffect(() => {
    fetchReviewData();
  }, []);

  
  return (
    <div className="admin-page">
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.product_id}>
              <td>{prod.product_id}</td>
              <td>{prod.product_name}</td>
              <td>{prod.price}</td>
              <td>{prod.category}</td>
              <td> {prod.Ordquantity} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AReview;