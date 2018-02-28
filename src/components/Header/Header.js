import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className="header-container">
            <div className="logo-container">
                <img className="logo" src="./cleftHeart.jpg" alt="logo" />    
            </div>
            <div className="nav-bar-container">
                <ul className="nav-list">
                    <li className="nav-link-text">Login</li>
                    <li className="nav-link-text">Browse</li>
                    <li className="nav-link-text">Inventory</li>
                    <li className="nav-link-text">Orders</li>
                </ul>    
            </div>    
        </div>    
    );
};

export default Header;