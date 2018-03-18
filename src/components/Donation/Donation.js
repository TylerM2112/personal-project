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
                    <p>Each year we choose a different non-profit coding education organization to donate a percentage of  sales to.</p>
                </div>
                <div>
                    <p>This year, 5% of sales will be donated to <strong>Girls Who Code</strong></p>
                </div>
                <div>
                    Take a moment and check them out <a href="https://girlswhocode.com/" target="_">HERE</a>
                    </div>
            </div>
        </div>
    );
};

export default Donation;