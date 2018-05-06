import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './Home.css';

import Header from '../Header/Header';
import VideoBanner from '../VideoBanner/VideoBanner';
import MainTitle from '../MainTitle/MainTitle';
import Featured from '../Featured/Featured';
import LandingDivs from '../LandingDivs/LandingDivs';

class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="home-container">
                    <VideoBanner />
                    <MainTitle />
                    <Featured />
                    <LandingDivs />
                </div>
            </div>    
        );
    }
}

function mapStateToProps(state) {

    return {
        state
    };
}

export default withRouter(connect(mapStateToProps)(Home));