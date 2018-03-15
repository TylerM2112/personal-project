import React from 'react';
import { Link } from 'react-router-dom';
import './MainTitle.css';

const MainTitle = () => {
    return (
        <div className="title-content-container">
            <div className="title-content-text">
                <h1>GENERIC SHOP TITLE</h1>
                <span />
                <h4>"Leading innovator in E-Commerce" -Prestige World Wide</h4>
                <span />
                <Link to="/search"><button className="shop-button">SHOP NOW</button></Link>
            </div>
        </div>
    );
};

export default MainTitle;