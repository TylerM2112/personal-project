import React from 'react';
import './VideoBanner.css';
import { Link } from 'react-router-dom';
import video from '../../assets/videoBanner2.mov';


const VideoBanner = () => {
    return (
        <div className="title-content-container">
            <div className="video-container">
                <video id="my-video" className="video" autoPlay="autoplay" loop="loop" muted="" width="300" height="150"><source  src="//ak7.picdn.net/shutterstock/videos/3754907/preview/stock-footage-blue-high-tech-waveform-seamless-loop.mp4"/></video>
            </div>
            <div className="title-content-text">
                <h1>GENERIC SHOP TITLE</h1>
                <span />
                <h4>"Leading innovator in E-Commerce" -Prestige World Wide</h4>
                <span />
                <Link to="/search"><button className="shop-button">SHOP NOW</button></Link>
            </div>
        </div>
    );
};

export default VideoBanner;