import React, { Component } from 'react';
import './Product.css';

import Header from '../Header/Header';

export default class Product extends Component {
    render(props) {
        console.log("LOOK HERE", this.props.location.state.image)
        let shirt = this.props.location.state.image ;
        // console.log("HEY YOU", this.props, props)
        return (
            <div className="solo-product-container">
                <Header />
                <div className="solo-product-display">  
                <img src={shirt} alt="shirt" />
                <p>Name: {this.props.location.state.name}</p>
                <p>Description: {this.props.location.state.description}</p>
                <p>Price: {this.props.location.state.price}</p>
                <button className="add-to-cart-button">ADD TO CART</button>    
                </div>
            </div>
        );
    }
}