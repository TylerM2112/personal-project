import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="logo-container">
                <img className="logo" src="./cleftHeart.jpg" alt="logo" />    
            </div>
            <div>
            <ul className="nav-list">
                    <li className="nav-link-text">Twitter</li>
                    <li className="nav-link-text">Facebook</li>
                    <li className="nav-link-text">Instagram</li>
                    <li className="nav-link-text">YouTube</li>
                </ul>
                </div>
        </div>
    );
};

export default Footer;