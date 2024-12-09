import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./product.css";
import axios from 'axios';
// Croissants List Component
export function Croissants() {
  const [croissants, setCroissants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/croissants') // Replace with your actual endpoint
      .then((response) => response.json())
      .then((data) => setCroissants(data))
      .catch((error) => console.error('Error fetching croissants:', error));
  }, []);

  

  return (
    <>
      <nav className="breadcrumb">
        <a href="/items">Products&nbsp;</a> /&nbsp;<span>Croissants</span>
        </nav>
      <h1 id='ProHeading'>Croissant</h1>
      <div className="products-container">
      {croissants.map((croissant) => (
        <CroissantCard key={croissant.product_id} croissant={croissant} />
      ))}
    </div>
    </>
  );
}

// Individual Croissant Card Component
function CroissantCard({ croissant }) {
  const isOutOfStock = croissant.quantity === 0;
  return (
    
      <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
        <img 
          src={croissant.url} 
          alt={croissant.product_name} 
          className="product-image" 
        />
        <p className="product-name">{croissant.product_name}</p>
        <p className="product-price">Price: ₹{croissant.price.toLocaleString()}</p>
        {isOutOfStock ? (
        <button className="product-out-of-stock" disabled>
          Out of Stock
        </button>
      ) : (
        <Link to={`/croissants/${croissant.product_id}`}>
          <button className="product-order">View more</button>
        </Link>
      )}
      </div>
    
  );
}

// Croissant Detail Component
export function CroissantDetail() {
  const { id } = useParams();
  const [croissant, setCroissant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);
  useEffect(() => {
    fetch(`http://localhost:8080/croissants/${id}`) // Replace with your actual endpoint
      .then((response) => response.json())
      .then((data) => setCroissant(data))
      .catch((error) => console.error('Error fetching croissant:', error));

      fetch(`http://localhost:8080/review/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error('Error fetching feedbacks:', error));
  }, [id]);
  const addToCart = () => {
    if (croissant && quantity > croissant.quantity) {
      alert(`Only ${croissant.quantity} items available in stock. Please adjust the quantity.`);
      return;
    }
    axios.post('http://localhost:8080/cart', {
      userId,
      productId: croissant.product_id,
      quantity,
    })
      .then((response) => {
        console.log(response.data.message);
        alert('Item added to cart successfully!');
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
        alert('Already in cart.Checkout the cart.');
      });
  };

  const increaseQuantity = () => {
    if (croissant && quantity >= croissant.quantity) {
      alert(`Only ${croissant.quantity} items available in stock.`);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };
  const decreaseQuantity = () => setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));

  if (!croissant) return <h2>Loading...</h2>;

  return (
    <>
    <nav className="breadcrumb">
        <a href="/items">Products&nbsp;</a> /&nbsp;&nbsp;
        <a href="/croissants">Croissant&nbsp;</a> / &nbsp;<span>{croissant.product_name}</span>
      </nav>

      <div className="product-detail">
        <div id="image">
          <img 
            src={croissant.url} 
            alt={croissant.product_name} 
            className="product-detail-image"
          />
        </div>
        
        <div id="content">
          <h2>{croissant.product_name}</h2>
          <p className="product-price">Price: ₹{croissant.price}</p>
          <p>{croissant.description}</p>

          <div className="product-controls">
            <button className="product-qty" onClick={decreaseQuantity}>-</button>
            <span className="product-quantity">{quantity}</span>
            <button className="product-qty" onClick={increaseQuantity}>+</button>

            <div className="product-rating">
              {croissant.rating ? (
                <span className="rating-box">
                  <span className="star-icon">★</span> {croissant.rating}
                </span> 
              ) : (
                <span>Not rated yet</span> 
              )}
            </div>
          </div>

          <br />
          <button className="product-qty" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="feedback-section">
        <button 
          className="toggle-feedbacks-button" 
          onClick={() => setShowFeedbacks(!showFeedbacks)}
        >
          {showFeedbacks ? "Hide Feedbacks" : "View Feedbacks"}
        </button>

        {showFeedbacks && (
          <div className="feedback-content">
            <h3 className="feedback-header">Customer Feedbacks</h3>
            {feedbacks.length > 0 ? (
              <ul className="feedback-list">
                {feedbacks.map((feedback, index) => (
                  <li key={index} className="feedback-item">
                    <blockquote className="feedback-text">{feedback.feedback}</blockquote>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-feedback-message">No feedback available for this product yet.</p>
            )}
          </div>
        )}
      </div>
        
    </>
  );
}