import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className='description-nav-box'>Reviews(120)</div>
      </div>
      <div className="descriptionbox-description">
        <p>At Style Your Self, we believe that fashion is more than just clothing; it's a form of self-expression. Our curated collection of trendy dresses, stylish accessories, and everyday essentials caters to every individual's unique taste and lifestyle.</p>
        <p>Explore our exclusive collections, where quality meets affordability, and experience a shopping journey that's not only enjoyable but also tailored to empower your personal style. Join our community of fashion lovers and elevate your wardrobe today</p>
      </div>
    </div>
  )
}
export default DescriptionBox
