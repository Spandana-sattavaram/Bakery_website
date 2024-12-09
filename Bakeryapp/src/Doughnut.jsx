import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./product.css";
import axios from 'axios';
// Doughnuts List Component
export function Doughnuts() {
  const [doughnuts, setDoughnuts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/doughnut') // Fetching from backend
      .then((response) => response.json())
      .then((data) => setDoughnuts(data))
      .catch((error) => console.error('Error fetching doughnuts:', error));
  }, []);

  return (
    
    <div>
       <nav className="breadcrumb">
        <a href="/items">Products&nbsp;</a> /&nbsp;<span>Doughnuts</span>
        </nav>
      <h1 id='ProHeading'>Doughnuts</h1>
      <div className="products-container">
      {doughnuts.map((doughnut) => (
        <ProductCard key={doughnut.product_id} product={doughnut} />
      ))}
    </div>

    </div>
  );
}

// Individual Doughnut Card Component
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
      <Link to={`/doughnut/${product.product_id}`}>
        <button className="product-order">View more</button>
      </Link>
      )}
    </div>
  );
}

// Doughnut Detail Component
export function DoughnutDetail() {
  const { id } = useParams();
  const [doughnut, setDoughnut] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);
  useEffect(() => {
    fetch(`http://localhost:8080/doughnut/${id}`) // Fetch a single doughnut by ID
      .then((response) => response.json())
      .then((data) => setDoughnut(data))
      .catch((error) => console.error('Error fetching doughnut:', error));

      fetch(`http://localhost:8080/review/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error('Error fetching feedbacks:', error));
  }, [id]);
  const addToCart = () => {
    if (doughnut && quantity > doughnut.quantity) {
      alert(`Only ${doughnut.quantity} items available in stock. Please adjust the quantity.`);
      return;
    }
    axios.post('http://localhost:8080/cart', {
      userId,
      productId: doughnut.product_id,
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
    if (doughnut && quantity >= doughnut.quantity) {
      alert(`Only ${doughnut.quantity} items available in stock.`);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };
  const decreaseQuantity = () => quantity > 1 && setQuantity((prev) => prev - 1);

  if (!doughnut) return <h2>Loading...</h2>;

  return (
   <>
    <nav className="breadcrumb">
        <a href="/items">Products&nbsp;</a> /&nbsp;&nbsp;
        <a href="/doughnut">Doughnut&nbsp;</a> / &nbsp;<span>{doughnut.product_name}</span>
      </nav>

      <div className="product-detail">
        <div id="image">
          <img 
            src={doughnut.url} 
            alt={doughnut.product_name} 
            className="product-detail-image"
          />
        </div>
        
        <div id="content">
          <h2>{doughnut.product_name}</h2>
          <p className="product-price">Price: ₹{doughnut.price}</p>
          <p>{doughnut.description}</p>

          <div className="product-controls">
            <button className="product-qty" onClick={decreaseQuantity}>-</button>
            <span className="product-quantity">{quantity}</span>
            <button className="product-qty" onClick={increaseQuantity}>+</button>

            <div className="product-rating">
              {doughnut.rating ? (
                <span className="rating-box">
                  <span className="star-icon">★</span> {doughnut.rating}
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