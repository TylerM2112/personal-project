import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

import logo from '../../assets/atom.jpeg'

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="logo-container-footer">
                <Link to="/"><img className="logo-footer" src={logo} alt="logo" /></Link>
            </div>
            <div className="nav-bar-container-footer">
                <ul className="nav-list-footer">
                    <li className="nav-link-text-footer">Twitter</li>
                    <li className="nav-link-text-footer">Facebook</li>
                    <li className="nav-link-text-footer">Instagram</li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;