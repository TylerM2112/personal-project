import React from 'react';
import './Featured.css';

const Featured = () => {
    return (
        <div className="feature-div">
        <h1 className="featured-headline">FEATURED</h1>
        <div className="featured-container">   
        <div className="featured-item">
                <img className="featured-image" src="./t-shirt.jpg" alt="tshirt" />
                <span />
                <p>Name:</p>
                <p>Price:</p>
                <select>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    <option value="X-Large">X-Large</option>
                </select>
                <button className="add-to-cart-button">ADD TO CART</button>
            </div>
            <div className="featured-item">
                <img className="featured-image" src="./t-shirt.jpg" alt="tshirt" />
                <span />
                <p>Name:</p>
                <p>Price:</p>
                <select>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    <option value="X-Large">X-Large</option>
                </select>
                <button className="add-to-cart-button">ADD TO CART</button>
            </div>
            <div className="featured-item">
                <img className="featured-image" src="./t-shirt.jpg" alt="tshirt" />
                <span />
                <p>Name:</p>
                <p>Price:</p>
                <select>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    <option value="X-Large">X-Large</option>
                </select>
                <button className="add-to-cart-button">ADD TO CART</button>
            </div>
            </div>
        </div>    
    );
};

export default Featured;