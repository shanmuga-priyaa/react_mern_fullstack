import React from 'react'
import './Hero.css'
// import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_img from '../Assets/hero_image.png'
const Hero = () => {
  return (
    <section class="hero-section">
    <div class="hero-content">
        <div class="text-content">
            <div class="new-collections">NEW COLLECTIONS</div>
            <h1 class="main-heading">EXPLORE FRESH STYLES FOR EVERY OCCASION</h1>
            <a href={arrow_icon} class="cta-button">Newest Styles</a>
        </div>
        <div class="hero-image">
            <img src={hero_img} alt="Fashion model with shopping bags" />
        </div>
    </div>
</section>
  )
}

export default Hero
