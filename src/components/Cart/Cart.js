import React, { Component } from 'react';
import shirt from '../../assets/t-shirt.jpg';

import './Cart.css';

import Header from '../Header/Header';

export default class Cart extends Component {
    render() {
        return (
            <div className="cart-page-container">
                <Header />
                <div className="cart-content-container">
                    <div className="cart-item">
                        <div className="cart-item-image">
                            <img className="cart-image" src={shirt} alt="tshirt" />
                        </div>
                        <div className="cart-item-info">
                            <p>Name: Cleft Heart T</p>
                            <p>Price: $45.88</p>
                            <p>Size: Small</p>
                            <div className="cart-quantity">
                                <label htmlFor="amount">Quantity</label>
                                <input id="amount" type="integer" />
                                <button id="down">++</button>
                                <button id="up">--</button>
                            </div>
                        </div>

                    </div>
                    
                </div><div className="total-container">
                        <p>Subtotal: $45.88</p>
                        <p>Tax: $2.22</p>
                        <p>Shipping: $7.00</p>
                        <p>Total: $55.00</p>
                        <button>CHECK OUT</button>
                    </div>
            </div>
        );
    }
}