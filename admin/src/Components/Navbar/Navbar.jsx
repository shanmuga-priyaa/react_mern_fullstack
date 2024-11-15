import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/navlogo.jpg'
import navprofile from '../../assets/navprofile.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="" className="nav-logo" />
      <h3>Style-N-You</h3>
      <hr/>
      <h4>Admin Pannel</h4>
      <img src={navprofile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar
