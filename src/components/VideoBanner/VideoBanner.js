import React from 'react';
import './VideoBanner.css';
import video from '../../assets/videoBanner2.mov';


const VideoBanner = () => {
    return (
            <div className="video-container">
                <video id="my-video" className="video" autoPlay="autoplay" loop="loop" muted="" width="300" height="150"><source  src="//ak2.picdn.net/shutterstock/videos/11748722/preview/stock-footage-flying-over-a-futuristic-circuit-board-with-moving-electrons-ending-on-the-cpu-transparent-blue-te.mp4"/></video>
            </div>
    );
};

export default VideoBanner;