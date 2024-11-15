import React, { useState, useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import './Navbar.css';
import logo from '../Assets/logo.jpg';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const [isMenuVisible, setIsMenuVisible] = useState(false); 
    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="" width={100} />
                <p>Style-N-You</p>
            </div>
            <div className='menu_bar'>
            <button className='nav-menu-toggle' onClick={toggleMenu} style={{ width : "70px" }}>
                &#9776;
            </button>
            </div>
            <ul className={`nav-menu ${isMenuVisible ? 'nav-menu-visible' : ''}`}>
                <li onClick={() => { setMenu("shop"); setIsMenuVisible(false); }}>
                    <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>
                    {menu === "shop" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("mens"); setIsMenuVisible(false); }}>
                    <Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>
                    {menu === "mens" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("womens"); setIsMenuVisible(false); }}>
                    <Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link>
                    {menu === "womens" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("Kids"); setIsMenuVisible(false); }}>
                    <Link style={{ textDecoration: 'none' }} to='/Kids'>Kids</Link>
                    {menu === "Kids" ? <hr /> : <></>}
                </li>
            </ul>
            <div className='nav-login-cart'>
                {localStorage.getItem("auth-token") ? (
                    <button onClick={() => { localStorage.removeItem("auth-token"); window.location.replace("/") }}>
                        Logout
                    </button>
                ) : (
                    <Link to='/login'><button>Login</button></Link>
                )}
                <Link to='/cart'>
                    <img src={cart_icon} alt="cart" />
                </Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>
        </div>
    );
};

export default Navbar;
