import React from 'react';
import './Offers.css';
import exclusive_image from '../Assets/exclusive_image.png';

const Offers = () => {
  return (
    <div class="hero-banner">
    <div class="content-wrapper">
      <div class="text-content">
        <h1>New Arrivals</h1>
        <h2>Offers for you</h2>
        <p>only on best sellers products</p>
        <button class="cta-button">Click Me</button>
      </div>
      <div class="image-wrapper">
        <img src={exclusive_image} alt="Shopper with bags" class="hero-image" />
      </div>
    </div>
  </div>
  );
};

export default Offers;