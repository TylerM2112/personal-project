import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import './Search.css';


import Header from '../Header/Header';
import Footer from '../Footer/Footer';


class Search extends Component {

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
        let productsToDisplay = [];
        if (this.state.filteredProducts) {
            // eslint-disable-next-line
            this.state.filteredProducts.map((e) => {
                productsToDisplay.push(<div className="search-product-div" id={e.id} key={e.id}>
                            <div className="search-product-info">
                                <Link to={{
                                    pathname: `/product/${e.id}`,
                                    state: e
                                    }}>
                                <div className="search-product-image">
                                <img src={e.image} alt="item" />
                                </div></Link> 
                                <div className="search-product-info">
                                    Name: {e.name}
                                    <br />
                                    Price: {e.price}
                            {this.props.user.isAdmin &&
                            <div className="search-inventory-levels">   
                                Man Small Size:{e.man_small_size}
                                <br />
                                Man Medium Size:{e.man_medium_size}
                                <br />                              
                                Man Large Size:{e.man_large_size}
                                <br />
                                Man XLarge Size:{e.man_xlarge_size}
                                <br />
                                Woman's Small Size:{e.woman_small_size}
                                <br />
                                Woman's Medium Size:{e.woman_medium_size}
                                <br />
                                Woman's Large Size:{e.woman_large_size}
                                <br />
                                Woman's XLarge Size:{e.woman_xlarge_size}
                            </div>}
                                </div>    
                            </div>
                        </div>
                );

            });
        }
        // console.log("productsToDisplay", productsToDisplay);
        return productsToDisplay;
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
                </div>
                <div className="search-results">
                    {this.displayProducts()}
                </div>
                <Footer />
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

export default connect(mapStateToProps)(Search);