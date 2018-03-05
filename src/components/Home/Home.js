import React, { Component } from 'react';

import './Home.css';

import Header from '../Header/Header.js';
import Featured from '../Featured/Featured';
import VideoBanner from '../VideoBanner/VideoBanner';
import Footer from '../Footer/Footer';

export default class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <Header /> 
                <VideoBanner />
                <Featured />
                <Footer />
            </div>
        );
    }
}