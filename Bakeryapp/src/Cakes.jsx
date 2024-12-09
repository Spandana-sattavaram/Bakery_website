import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; // Axios for HTTP requests
import "./product.css";

// Cake List Component
export function Cake() {
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/cakes') // Fetch cakes from backend
      .then((response) => response.json())
      .then((data) => setCakes(data))
      .catch((error) => console.error('Error fetching cakes:', error));
  }, []);

  return (
   <>
      
         <nav className="breadcrumb">
        <a href="/items">Products&nbsp;</a> /&nbsp;<span>Cakes</span>
        </nav>
        <h1 id='ProHeading'>Cakes</h1>
      <div className="products-container">
      {cakes.map((cake) => (
        <ProductCard key={cake.product_id} product={cake} />
      ))}
    </div>
   
   </>
  );
}

// Individual Cake Card Component
// Individual Cake Card Component
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
        <Link to={`/cakes/${product.product_id}`}>
          <button className="product-order">View more</button>
        </Link>
      )}
    </div>
  );
}


export function CakeDetail() {
  const { id } = useParams();
  const [cake, setCake] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showFeedbacks, setShowFeedbacks] = useState(false); // State to toggle feedback visibility

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/cakes/${id}`)
      .then((response) => response.json())
      .then((data) => setCake(data))
      .catch((error) => console.error('Error fetching cake:', error));

    fetch(`http://localhost:8080/review/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error('Error fetching feedbacks:', error));
  }, [id]);

  const addToCart = () => {
    if (cake && quantity > cake.quantity) {
      alert(`Only ${cake.quantity} items available in stock. Please adjust the quantity.`);
      return;
    }

    axios.post('http://localhost:8080/cart', {
      userId,
      productId: cake.product_id,
      quantity,
    })
      .then((response) => {
        alert('Item added to cart successfully!');
      })
      .catch((error) => {
        alert('Already in cart. Checkout the cart.');
      });
  };

  const increaseQuantity = () => {
    if (cake && quantity >= cake.quantity) {
      alert(`Only ${cake.quantity} items available in stock.`);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (!cake) return <h2>Loading...</h2>;

  return (
    <>
      <nav className="breadcrumb">
        <a href="/items">Products&nbsp;</a> /&nbsp;&nbsp;
        <a href="/cakes">Cakes&nbsp;</a> / &nbsp;<span>{cake.product_name}</span>
      </nav>

      <div className="product-detail">
        <div id="image">
          <img 
            src={cake.url} 
            alt={cake.product_name} 
            className="product-detail-image"
          />
        </div>
        
        <div id="content">
          <h2>{cake.product_name}</h2>
          <p className="product-price">Price: ₹{cake.price}</p>
          <p>{cake.description}</p>

          <div className="product-controls">
            <button className="product-qty" onClick={decreaseQuantity}>-</button>
            <span className="product-quantity">{quantity}</span>
            <button className="product-qty" onClick={increaseQuantity}>+</button>

            <div className="product-rating">
              {cake.rating ? (
                <span className="rating-box">
                  <span className="star-icon">★</span> {cake.rating}
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

      {/* Feedback Section */}
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