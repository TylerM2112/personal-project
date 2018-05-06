import React from 'react';

import './LandingDivs.css';
import couple from '../../assets/couple.jpg';

const LandingDivs = () => {
  return (
    <div className="landingdivs-container">
      <div className="fp">
        <div className="fpi">
        </div>
        <div className="fpt">
          <h1>Extremely comfortable</h1>
          <p>Made from egyptian cotton believed to possess restorative properties!</p>
        </div>  
      </div>  
      <div className="fp">
        <div className="fpt">
          <h1>They Make Great Gift Ideas!</h1>
          <p>As long as it's the right size, shirts make an awesome gift!</p>
        </div> 
        <div className="spi">
        </div>
      </div>
      <div className="fp">
        <div className="tpi">
        </div>
        <div className="fpt">
          <h1>Humor Leveled Up!</h1>
          <p>Be the hit of the water cooler with funny slogans and catchy phrases!</p>
        </div>  
      </div>

    </div>  
  );
};

export default LandingDivs;