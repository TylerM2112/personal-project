import React, { Component } from 'react';

import './Home.css';

import Header from '../Header/Header.js';
import VideoBanner from '../VideoBanner/VideoBanner';
import MainTitle from '../MainTitle/MainTitle';
import Featured from '../Featured/Featured';
import Donation from '../Donation/Donation';

import Footer from '../Footer/Footer';

export default class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <Header /> 
                <VideoBanner />
                <MainTitle />
                <Featured />
                <Donation />
                <Footer />
            </div>
        );
    }
}