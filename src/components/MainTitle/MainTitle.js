import React from 'react';
import { Link } from 'react-router-dom';
import './MainTitle.css';

const MainTitle = () => {
    return (
        <div className="title-content-container">
            <div className="header-content">    
                <h1>GENERIC SHOP TITLE</h1>
            </div>
            <div className="button-container">
                <Link to="/search"><button className="shop-button">SHOP NOW</button></Link>
            </div>
        </div>    
    );
};

export default MainTitle;