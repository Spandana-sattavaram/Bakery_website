import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewPage.css';
import { useLocation } from 'react-router-dom';

function ReviewPage() {
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState([]);
  const [showRatingInput, setShowRatingInput] = useState({}); // Tracks visibility of rating input for each product
  const [ratings, setRatings] = useState({}); // Tracks rating for each product
  const [feedbackText, setFeedbackText] = useState({}); // Tracks feedback text for each product
  const location = useLocation();
  const { orderId } = location.state || {}; // Ensure this is getting the orderId properly

  //  Load user ID from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) setUserId(storedUserId);
  }, []);

  // Fetch products for review
  const fetchReviewData = () => {
    if (userId) {
      fetch(`http://localhost:8080/rev/${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched data:", data); // Log the fetched data to check the structure
          if (Array.isArray(data)) {
            setData(data);
          } else {
            console.error("Fetched data is not an array:", data);
            setData([]); // Set empty array in case of invalid response
          }
        })
        .catch((err) => {
          console.error('Error fetching review data:', err);
          setData([]); // Set empty array on error
        });
    }
  };

  useEffect(() => {
    fetchReviewData();
  }, [userId]);

  
  const handleStarClick = (productId, rating, oldRating, numberOfRatings) => {
    const newTotal = oldRating * numberOfRatings + rating; 
    const newNumberOfRatings = numberOfRatings + 1;
    const newAverage = newTotal / newNumberOfRatings; 
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: {
        rating: newAverage,
        totalRatings: newTotal,
        numberOfRatings: newNumberOfRatings,
      },
    }));
  };

  // Handle feedback text change
  const handleFeedbackChange = (productId, text) => {
    setFeedbackText((prevFeedback) => ({
      ...prevFeedback,
      [productId]: text,
    }));
  };

  // Handle review submission
  const submitReview = (productId) => {
    const ratingData = ratings[productId];
    const feedback = feedbackText[productId];

    if (!ratingData) {
      alert('Please select a rating before submitting.');
      return;
    }

    // Submit the review
    axios
      .post(`http://localhost:8080/review/submit`, {
        userId,
        orderId,
        productId,
        totalRatings: ratingData.rating,
        numberOfRatings: ratingData.numberOfRatings,
        feedback, // Include feedback in the request
      })
      .then((response) => {
        console.log(response.data.message);
        alert('Review submitted successfully!');
        setShowRatingInput((prev) => ({ ...prev, [productId]: false })); // Hide the rating input after submission
        setFeedbackText((prev) => ({ ...prev, [productId]: '' })); // Clear feedback text
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
        alert('You have already submitted review on this product');
      });
  };

  return (
    <div className="review-page">
      <section className="review-header">
        <h2>Review Your Products</h2>
        <p>Give your valuable feedback for the items you've purchased.</p>
      </section>

      {data.length === 0 ? (
        <p>No products found for review!</p>
      ) : (
        <div className="review-items">
          {data.map((item) => (
            <div key={item.product_id} className="review-item">
              <img src={item.url} alt={item.product_name} />
              <div className="item-details">
                <h3>{item.product_name}</h3>
                <p>₹{item.price.toFixed(2)}</p>

                {showRatingInput[item.product_id] ? (
                  <div className="rating-section">
                    {/* Star Ratings */}
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${
                            ratings[item.product_id]?.rating >= star ? 'filled' : ''
                          }`}
                          onClick={() =>
                            handleStarClick(
                              item.product_id,
                              star,
                              item.rating,
                              item.number_of_ratings
                            )
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    {/* Feedback Text Input */}
                    <textarea
                      placeholder="Write your feedback here..."
                      value={feedbackText[item.product_id] || ''}
                      onChange={(e) => handleFeedbackChange(item.product_id, e.target.value)}
                      className="feedback-textarea"
                    ></textarea>

                    {/* Submit Button */}
                    <button
                      onClick={() => submitReview(item.product_id)}
                      className="submit-review-button"
                    >
                      Submit Review
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      setShowRatingInput((prev) => ({
                        ...prev,
                        [item.product_id]: true,
                      }))
                    }
                    className="give-review-button"
                  >
                    Give Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewPage;