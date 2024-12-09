import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import "./CartPage.css";

function CartPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState([]);

  // Load user ID from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) setUserId(storedUserId);
  }, []);

  // Fetch cart data when userId is available
  const fetchCartData = () => {
    if (userId) {
      fetch(`http://localhost:8080/cart/${userId}`)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.error('Error fetching cart data:', err));
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [userId]);

  // Update quantity in backend and UI
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return; // Prevent invalid quantity

    axios.post(`http://localhost:8080/cart/${userId}/update`, {
      productId,
      quantity,
    })
      .then(response => {
        console.log(response.data.message);
        fetchCartData(); // Refresh the cart after update
      })
      .catch(error => {
        console.error('Error updating quantity:', error);
        alert('Failed to update quantity. Please try again.');
      });
  };

  // Decrease quantity
  const decreaseQuantity = (productId) => {
    const item = data.find(item => item.product_id === productId);
    if (item && item.CartQuantity > 1) {
      updateQuantity(productId, item.CartQuantity - 1);
    }
  };

  // Increase quantity
  const increaseQuantity = (productId) => {
    const item = data.find(item => item.product_id === productId);
    if (item && item.CartQuantity < item.quantity) {
      updateQuantity(productId, item.CartQuantity + 1);
    } else {
      alert(`Only ${item.quantity} items available in stock.`);
    }
  };

  // Remove item from cart
  const removeItem = (productId) => {
    axios.post(`http://localhost:8080/cart/${userId}/delete`, {
      productId,
    })
      .then(response => {
        console.log(response.data.message);
        fetchCartData(); // Refresh the cart after deletion
      })
      .catch(error => {
        console.error('Error removing item:', error);
        alert('Failed to remove item. Please try again.');
      });
  };

  return (
    <div className="cart-page">
      <section className="cart-header">
        <h2>Your Shopping Cart</h2>
        <p>Review your items before proceeding to checkout.</p>
      </section>

      {data.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="cart-items">
          {data.map((item) => (
            <div key={item.product_id} className="cart-item">
              <img src={item.url} alt={item.product_name} />
              <div className="item-details">
                <h3>{item.product_name}</h3>
                <p>₹{item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item.product_id)}>-</button>
                  <span>{item.CartQuantity}</span>
                  <button onClick={() => increaseQuantity(item.product_id)}>+</button>
                </div>
                <button onClick={() => removeItem(item.product_id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-actions">
        <button onClick={() => navigate('/')}>Continue Shopping</button>
        <button onClick={() => navigate('/ord')}>Checkout</button>
      </div>
    </div>
  );
}

export default CartPage;