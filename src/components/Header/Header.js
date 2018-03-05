import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/cleftHeart.jpg'; 

const Header = () => {
    return (
        <div className="header-container">
            <div className="logo-container">
                <Link to="/"><img className="logo" src={logo} alt="logo" /></Link>    
            </div>
            <div className="nav-bar-container">
                <ul className="nav-list">
                    <li className="nav-link-text">Admin</li>
                    <Link to="/search"><li className="nav-link-text">Shop</li></Link>
                    <li className="nav-link-text">Orders</li>
                </ul>    
            </div>    
        </div>    
    );
};

export default Header;