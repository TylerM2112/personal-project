import React, { Component } from 'react';
import './Search.css';

import Header from '../Header/Header';


export default class Search extends Component {
    render() {
        return (
            <div className="search-landing-container">
                <Header />
                <div className="search-filter-buttons">
                    <button>GENDER</button>
                    <button>PRICE</button>
                    <button>SIZE</button>
                </div>
                <div className="search-results">
                    WOAH, I AM THE SEARCH!
                </div>
            </div>
        );
    }
}