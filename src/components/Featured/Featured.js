import React from 'react';
import './Featured.css';

const Featured = () => {
    return (
        <div className="feature-div">
        <div className="feature-title">    
                <p>FEATURED IN</p>
            </div>    
            <div className="featuredin-container">
                <div className="featured-logo-container"><img className="featured-logo" src="//cdn.shopify.com/s/files/1/0134/5202/files/inc_300x_300x.png?v=1484154915" alt="featured"/></div>
                <div className="featured-logo-container"><img className="featured-logo" src="//cdn.shopify.com/s/files/1/0134/5202/files/tedx_300x_300x.png?v=1484154939" alt="featured" /></div>
                <div className="featured-logo-container"><img className="featured-logo" src="//cdn.shopify.com/s/files/1/0134/5202/files/wwd_300x_300x.png?v=1484154963" alt="featured"/></div>
                <div className="featured-logo-container"><img className="featured-logo" src="//cdn.shopify.com/s/files/1/0134/5202/files/wired_300x_300x.png?v=1484154927" alt="featured"/></div>
                <div className="featured-logo-container"><img className="featured-logo" src="//cdn.shopify.com/s/files/1/0134/5202/files/forbes_300x_300x.png?v=1484154951" alt="featured"/></div>
                <div className="featured-logo-container"><img className="featured-logo" src="//cdn.shopify.com/s/files/1/0134/5202/files/npr_300x_300x.png?v=1484154974" alt="featured"/></div>
            </div>    
        </div>    
    );
};

export default Featured;