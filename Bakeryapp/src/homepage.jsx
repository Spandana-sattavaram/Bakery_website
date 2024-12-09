import React from "react";
import Slider from "react-slick"; // For carousel
import "./homepage.css";
import "slick-carousel/slick/slick.css"; // Slick styles
import "slick-carousel/slick/slick-theme.css"; // Slick theme
import { useNavigate } from "react-router-dom";
const products = [
  { id: 10006, name: "Black Forest", price: "650", image: "Blackforest.png" },
  { id: 10009, name: "Chocolate Croissant", price: "120", image: "Chocolatecroissant.png" },
  { id: 10019, name: "Doughnut", price: "200", image: "RedVelvetDonuts.png" },
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    text: "The food was fresh, flavorful, and left everyone impressed. Their attention to detail and commitment to customer satisfaction were evident throughout the entire process.",
    customer: "Prestige Group",
    logo: "customer1-logo.png", // Replace with actual logo paths
  },
  {
    id: 2,
    text: "Absolutely delightful cakes and pastries! They made our special occasion even more memorable.",
    customer: "Happy Client",
    logo: "customer2-logo.png",
  },
  {
    id: 3,
    text: "Amazing service and delicious treats! Highly recommend to anyone who loves baked goods.",
    customer: "Event Organizers",
    logo: "customer3-logo.png",
  },
];

function TestimonialCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="testimonial-container">
      <h3>Don't just take our word for it.</h3>
      <p>A word from the lovely customers</p>
      <div className="testimonal-inner">
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-slide">
            <blockquote>{testimonial.text}</blockquote>
            <p className="testimonial-customer">— {testimonial.customer}</p>
          </div>
        ))}
      </Slider>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const navigate=useNavigate();
  function Click(pid)
  {
    if (pid === 10006)
      navigate("/cakes/10006");
    else if (pid === 10009)
      navigate("/croissants/10009");
    else
      navigate("/doughnut/10019");
  }
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <p className="product-name">{product.name}</p>
      <p className="product-price">Price: ₹{product.price}</p>
      <button className="product-order" onClick={() => Click(product.id)}>View More</button>
    </div>
  );
}

function HomePage() {
    const navigate=useNavigate();
    function Menuopen()
    {
        navigate("/items");
    }
  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <h2>Welcome to Random Bakers!</h2>
        <p>Freshly baked goods, made with love.</p>
        <button className="hero-btn" onClick={Menuopen}>Explore Our Menu</button>
      </div>

      {/* Featured Products */}
      <div className="featured">
        <h3>Chef's Favorites</h3>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <TestimonialCarousel />
    </div>
  );
}

export default HomePage;