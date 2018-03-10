import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Cart.css';

import Header from '../Header/Header';

class Cart extends Component {
    constructor() {
        super();
        this.state = {

        }
     }
    render() {
        return (
            <div className="cart-page-container">
                <Header />
                <div className="cart-content-container">
                    
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state;

    return {
        user
    };
}

export default connect(mapStateToProps)(Cart);
