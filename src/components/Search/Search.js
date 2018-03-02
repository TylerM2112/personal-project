import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Search.css';


import Header from '../Header/Header';


export default class Search extends Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            message: null,
            products: [],
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        });
        axios.get('/api/products').then(res => {
            this.setState({
                loading: false,
                products: res.data
            });
        });
    }

    render() {
        const { products } = this.state;
    return (
        <div className="search-landing-container">
            <Header />
            <div className="search-filter-buttons">
                <button>GENDER</button>
                <button>PRICE</button>
                <button>SIZE</button>
                <Link to="/additem"><button>ADD ITEM</button></Link>
            </div>
            <div className="search-results">
                {products.map((e) => {
                    return (
                    <div className="search-product-div" id={e.id}>
                        <img src={e.image} alt="item" /> <br /> {e.name} {e.price}<button className="add-to-cart-button">ADD TO CART</button>
                        </div>
                )})}
            </div>
        </div>
    );
}
}