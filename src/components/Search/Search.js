import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Search.css';


import Header from '../Header/Header';
import Footer from '../Footer/Footer';


export default class Search extends Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            message: null,
            products: [],
            filteredProducts: [],
            filter: {
                gender: '',
                size: '',
                price: 0,
            }
        }
        this.displayProducts = this.displayProducts.bind(this);
        this.filterProducts = this.filterProducts.bind(this);
        // this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        this.setState({
            loading: true
        });
        axios.get('/api/products').then(res => {
            this.setState({
                loading: false,
                products: res.data,
                filteredProducts: res.data,
            });
        });
    }

    filterProducts() {
        const { gender, size, price } = this.state.filter;
        let filterProducts = this.state.products.slice();
        if (gender) {
            // eslint-disable-next-line
            filterProducts = filterProducts.filter(products => {
                if (+products[`${gender}_small_size`] !== 0) return products;
                if (+products[`${gender}_medium_size`] !== 0) return products;
                if (+products[`${gender}_large_size`] !== 0) return products;
                if (+products[`${gender}_xlarge_size`] !== 0) return products;
            });

        }
        if (size) {
            // eslint-disable-next-line
            filterProducts = filterProducts.filter(products => {
                if (gender) {
                    if (+products[`${gender}_${size}_size`] !== 0) { return products }
                }
                // if (gender === "woman") {
                //     if (+products[`woman_${size}_size`] !== 0) { return products }
                // }
            });
        }
        if (price) {
            // eslint-disable-next-line
            filterProducts = filterProducts.filter(products => {
                if (+products.price <= `${price}`) { return products }
            });

        }
        // console.log("FILTERS", filterProducts);
        this.setState({
            filteredProducts: filterProducts
        });
    }

    displayProducts() {
        let html = [];
        if (this.state.filteredProducts) {
            // eslint-disable-next-line
            this.state.filteredProducts.map((e) => {
                html.push(<Link to={{
                    pathname: `/product/${e.id}`,
                    state: e
                }}><div className="search-product-div" id={e.id} key={e.id}>
                        <img src={e.image} alt="item" /> <br /> Name: {e.name} Price: {e.price}<button className="add-to-cart-button">ADD TO CART</button>
                    </div></Link>);

            });
        }
        // console.log("HTML", html);
        return html;
    }
    
    render() {
        // console.log(this.state.filter);
        // console.log("HELLO");
        return (
            <div className="search-landing-container">
                <Header />
                <h1>Take a look around!</h1>
                <div className="search-filter-buttons">
                    <select name="filters" onChange={(e) => {
                        let filter = { ...this.state.filter, gender: e.target.value }
                        this.setState({
                            filter: filter
                        })
                    }}>
                        <option value="" defaultValue />
                        <option value="man">Men's</option>
                        <option value="woman" >Women's</option>
                    </select>
                    <select name="filters" onChange={(e) => {
                        let filter = { ...this.state.filter, size: e.target.value }
                        this.setState({
                            filter: filter
                        })
                    }}>
                        <option value="" defaultValue />
                        <option value="small" >Small</option>
                        <option value="medium" >Medium</option>
                        <option value="large" >Large</option>
                        <option value="xlarge" >XLarge</option>
                    </select>
                    <input onChange={(e) => {
                        let filter = { ...this.state.filter, price: e.target.value }
                        this.setState({
                            filter: filter
                        })
                    }} />
                    <button onClick={this.filterProducts}>FILTER</button>
                    <Link to="/additem"><button>ADD ITEM</button></Link>
                </div>
                <div className="search-results">
                    {this.displayProducts()}
                </div>
                <Footer />
            </div>
        );
    }
}