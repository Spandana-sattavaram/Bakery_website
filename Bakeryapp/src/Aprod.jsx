import React, { useEffect, useState } from 'react';
import './Customer.css';

const Aprod = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');

  // Fetch products from the server
  const fetchProducts = () => {
    fetch(`http://localhost:8080/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching product data:', err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle quantity update
  const handleUpdateClick = (productId, currentQuantity) => {
    setEditingProductId(productId);
    setNewQuantity(currentQuantity);
  };

  // Handle quantity change in the input field
  const handleQuantityChange = (e) => {
    setNewQuantity(e.target.value);
  };

  // Handle saving the new quantity
  const handleSetClick = (productId) => {
    fetch(`http://localhost:8080/update-product/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQuantity }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update quantity');
        }
        return res.json();
      })
      .then(() => {
        // Update the product list in the UI
        setProducts((prevProducts) =>
          prevProducts.map((prod) =>
            prod.product_id === productId
              ? { ...prod, quantity: newQuantity }
              : prod
          )
        );
        setEditingProductId(null);
        setNewQuantity('');
      })
      .catch((err) => console.error('Error updating quantity:', err));
  };

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.product_id}>
              <td>{prod.product_id}</td>
              <td>{prod.product_name}</td>
              <td>{prod.price}</td>
              <td>{prod.category}</td>
              <td>
                {editingProductId === prod.product_id ? (
                  <input
                    type="number"
                    value={newQuantity}
                    onChange={handleQuantityChange}
                  />
                ) : (
                  prod.quantity
                )}
              </td>
              <td>
                {editingProductId === prod.product_id ? (
                  <button onClick={() => handleSetClick(prod.product_id)}>
                    Set
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdateClick(prod.product_id, prod.quantity)}
                  >
                    Update
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Aprod;