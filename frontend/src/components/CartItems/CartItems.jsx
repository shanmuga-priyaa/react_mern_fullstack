// src/components/CartItems/CartItems.jsx
import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
    const {getTotalCartAmount,all_product, cartItems, removeFromCart } = useContext(ShopContext);

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format">
                                <img src={e.image} alt={e.name} className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${(e.new_price * cartItems[e.id]).toFixed(2)}</p>
                                <img 
                                    src={remove_icon} 
                                    onClick={() => removeFromCart(e.id)} 
                                    alt='Remove' 
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className='cartitems-down'>
              <div className='cartitems-total'>
                <h1>Cart Totals</h1>
                <div>
                  < div className ='cartitems-total-format'>
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                  <p>Shipping Fee</p>
                  <p>Free</p>
                </div>
                <hr/>
                <div className="cartitems-total-item">
                   <h3>Total</h3>
                   <h3>${getTotalCartAmount()}</h3>
                </div>
              </div>
              <button>PROCEED TO CHECKOUT</button>
              </div>
              <div className="cartitems-prmocode">
                <p>If you a promo code, Enter it here</p>
                <div className="cartitems-promobox">
                  <input type="text" placeholder='Promo code' />
                  <button>Submit</button>
                </div>
              </div>
            </div>
        </div>
    );
};

export default CartItems
