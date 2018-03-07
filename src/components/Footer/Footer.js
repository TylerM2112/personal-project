import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

import logo from '../../assets/cleftHeart.jpg'

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="logo-container">
                <Link to="/"><img className="logo" src={logo} alt="logo" /></Link>
            </div>
            <div className="nav-bar-container">
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