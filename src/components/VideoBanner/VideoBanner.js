import React from 'react';
import './VideoBanner.css';
import video from '../../assets/videoBanner2.mov';


const VideoBanner = () => {
    return (
            <div className="video-container">
                <video id="my-video" className="video" autoPlay="autoplay" loop="loop" muted="" width="300" height="150"><source  src="//ak7.picdn.net/shutterstock/videos/3754907/preview/stock-footage-blue-high-tech-waveform-seamless-loop.mp4"/></video>
            </div>
    );
};

export default VideoBanner;