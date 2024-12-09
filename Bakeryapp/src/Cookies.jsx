import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./product.css";
import axios from 'axios';
// Cookies List Component
export function Cookies() {
  const [cookies, setCookies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/cookies') // Fetching data from the backend
      .then((response) => response.json())
      .then((data) => setCookies(data))
      .catch((error) => console.error('Error fetching cookies:', error));
  }, []);

  return (
   <>
         <nav className="breadcrumb">
        <a href="/items">Products&nbsp;</a> /&nbsp;<span>Cookies</span>
        </nav>
         <h1 id='ProHeading'>Cookies</h1>
      <div className="products-container">
      {cookies.map((cookie) => (
        <ProductCard key={cookie.product_id} product={cookie} />
      ))}
    </div>
   </>
  );
}

// Individual Cookie Card Component
function ProductCard({ product }) {
  const isOutOfStock = product.quantity === 0;

  return (
    <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <img 
        src={product.url} 
        alt={product.product_name} 
        className="product-image"
      />
      <p className="product-name">{product.product_name}</p>
      <p className="product-price">Price: ₹{product.price.toLocaleString()}</p>
      
      {isOutOfStock ? (
        <button className="product-out-of-stock" disabled>
          Out of Stock
        </button>
      ) : (
      <Link to={`/cookies/${product.product_id}`}>
        <button className="product-order">View more</button>
      </Link>
      )}
    </div>
  );
}

// Cookie Detail Component
export function CookieDetail() {
  const { id } = useParams();
  const [cookie, setCookie] = useState(null); // Add this to CookieDetail
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);
  useEffect(() => {
    fetch(`http://localhost:8080/cookies/${id}`)
      .then((response) => response.json())
      .then((data) => setCookie(data))
      .catch((error) => console.error('Error fetching cake:', error));

      fetch(`http://localhost:8080/review/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error('Error fetching feedbacks:', error));
  }, [id]);

  
  const addToCart = () => {

    if (cookie && quantity > cookie.quantity) {
      alert(`Only ${cookie.quantity} items available in stock. Please adjust the quantity.`);
      return;
    }
    axios.post('http://localhost:8080/cart', {
      userId,
      productId: cookie.product_id,
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
    if (cookie && quantity >= cookie.quantity) {
      alert(`Only ${cookie.quantity} items available in stock.`);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };
  const decreaseQuantity = () => quantity > 1 && setQuantity((prev) => prev - 1);

  if (!cookie) return <h2>Loading...</h2>;

  return (
   <>
   <nav className="breadcrumb">
        <a href="/items">Products&nbsp;</a> /&nbsp;&nbsp;
        <a href="/cookies">Cookies&nbsp;</a> / &nbsp;<span>{cookie.product_name}</span>
      </nav>

      <div className="product-detail">
        <div id="image">
          <img 
            src={cookie.url} 
            alt={cookie.product_name} 
            className="product-detail-image"
          />
        </div>
        
        <div id="content">
          <h2>{cookie.product_name}</h2>
          <p className="product-price">Price: ₹{cookie.price}</p>
          <p>{cookie.description}</p>

          <div className="product-controls">
            <button className="product-qty" onClick={decreaseQuantity}>-</button>
            <span className="product-quantity">{quantity}</span>
            <button className="product-qty" onClick={increaseQuantity}>+</button>

            <div className="product-rating">
              {cookie.rating ? (
                <span className="rating-box">
                  <span className="star-icon">★</span> {cookie.rating}
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