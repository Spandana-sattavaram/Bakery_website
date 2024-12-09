import React, { useState } from 'react';
import './AddNew.css';

function AddNew() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productInitialQuantity, setProductInitialQuantity] = useState('');
  const [productUrl, setProductUrl] = useState(''); // New state for product URL
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddProduct = async (event) => {
    event.preventDefault();

    if (!productName || !productPrice || !productDescription || !productCategory || !productInitialQuantity || !productUrl) {
       setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/add-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          productPrice,
          productDescription,
          productCategory,
          productQuantity: productInitialQuantity,
          productUrl, // Include the URL in the request
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Product added successfully!');
        setProductName('');
        setProductPrice('');
        setProductDescription('');
        setProductCategory('');
        setProductInitialQuantity('');
        setProductUrl(''); // Reset URL field
        setError('');
      } else {
        setError(data.error || 'Something went wrong!');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      setError('An error occurred while adding the product');
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Product Management</h1>

      <div className="form-container">
        <h2>Add Product</h2>
        <form onSubmit={handleAddProduct}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Product Price</label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Product Description</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Product Category</label>
            <input
              type="text"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Product Initial Quantity</label>
            <input
              type="number"
              value={productInitialQuantity}
              onChange={(e) => setProductInitialQuantity(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Product URL</label>
            <input
              type="text"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              required
            />
          </div>
          <button id='add' type="submit">Add Product</button>
        </form>
      </div>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default AddNew;