import React from 'react';
import { Link } from 'react-router-dom';
import './MainTitle.css';

const MainTitle = () => {
    return (
        <div className="title-content-container">
            <div className="storename-content">    
                <h1>middlewear</h1>
            </div>
            <div className="header-content">
                <h1>UNIVERSAL DEV</h1>
                <h1> T-SHIRT</h1>
                <h1>REPOSITORY</h1>
            </div>
            <div className="quote-div">
                <p><strong>WARP TO THE STORE</strong></p>
            </div>
            <div className="button-container">
                <Link to="/search"><button className="shop-button">SHOP WARP</button></Link>
            </div>
        </div>    
    );
};

export default MainTitle;