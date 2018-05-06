import React from 'react';
import { Link } from 'react-router-dom';
import './MainTitle.css';

const MainTitle = () => {
    return (
        <div className="maintitle-div">
            <div className="title-content-container">
                <div className="storename-content">
                    <h1>middlewear</h1>
                </div>
                <div className="header-content">
                    <h1>MULTI THREADED T-SHIRTS!</h1>
                </div>
                <div className="button-container">
                    <Link to="/search"><button className="shop-button">SHOP NOW</button></Link>
                </div>
            </div>
        </div>
    );
};

export default MainTitle;