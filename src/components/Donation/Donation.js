import React from 'react';
import './Donation.css';

const Donation = () => {
    return (
        <div className="donation-div">
            <div className="donation-text">
            <div>    
                    <h1>Doing our part to help:</h1>
                </div>
                <div>
                    <p>Every six months we choose a different non-profit coding education organization to donate a percentage of  sales to.</p>
                </div>
                <div>
                    <p>This round, 5% of sales will be donated to <strong><a className="donation-link" href="https://girlswhocode.com/" target="_">Girls Who Code</a></strong>!</p>
                </div>
            </div>
        </div>
    );
};

export default Donation;