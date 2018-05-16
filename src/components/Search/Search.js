import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateAdmin, setCart, setTotal } from '../../redux/reducer';

import './Search.css';
import Header from '../Header/Header';

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

    productGrabber = async () => {
        const data = await axios.get('/api/products');
        // .then(res => {
        this.setState({
            loading: false,
            products: data.data,
            filteredProducts: data.data,
        });
    }

    componentDidMount() {
        axios.get('/api/session').then(res => {
            console.log("MUBMOMUMBO", res.data)
            this.props.setCart(res.data.cart);
            this.props.setTotal(res.data.total);
            if (res.data.isAdmin === true) {
                this.props.updateAdmin();
                this.setState({
                    isAdmin: true,
                })
            }
        })
        this.setState({
            loading: true
        });
        this.productGrabber();
    }


    filterProducts() {
        const { gender, size, price } = this.state.filter;
        let filterProducts = this.state.products.slice();
        console.log(filterProducts);
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
                productsToDisplay.push(
                    <div className="search-product-container">
                        <div className="search-image-text-container" id={e.id} key={e.id}>
                            <Link to={{
                                pathname: `/product/${e.id}`,
                                state: e
                            }}>

                                <div className="product-image-container">
                                    <img className="product-image" src={e.image} alt="item" />
                                </div>
                            </Link>
                            <div className="search-product-text">
                                {this.props.state.isAdmin &&
                                    <div className="id-tag">
                                        <h4>Product ID:</h4>
                                        <p>{e.id}</p>
                                    </div>}
                                <div className="name-tag">
                                    <p><strong>{e.name}</strong></p>
                                </div>
                                <div className="price-tag">
                                    <p>${e.price}</p>
                                </div>
                            </div>
                        </div>

                        {this.props.state.isAdmin &&

                            <div className="search-inventory-levels">
                                <div className="men-inventory-levels">
                                    <h4>Men's Inventory</h4>
                                    <p>Small: {e.man_small_size}</p>
                                    <p>Medium: {e.man_medium_size}</p>
                                    <p>Large: {e.man_large_size}</p>
                                    <p>XLarge: {e.man_xlarge_size}</p>
                                </div>
                                <div className="women-inventory-levels">
                                    <h4> Women's Inventory</h4>
                                    <p>Small: {e.woman_small_size}</p>
                                    <p>Medium: {e.woman_medium_size}</p>
                                    <p>Large: {e.woman_large_size}</p>
                                    <p>XLarge: {e.woman_xlarge_size}</p>
                                </div>
                            </div>}
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
            <div>
                <Header />
                <div className="search-landing-container">
                    <div className="search-inputs-container">
                        <div className="filter-container">
                            <label htmlFor="gender">Gender:</label>
                            <select name="gender" className="input-field" onChange={(e) => {
                                let filter = { ...this.state.filter, gender: e.target.value }
                                this.setState({
                                    filter: filter
                                })
                            }}>
                                <option value="" defaultValue />
                                <option value="man">Men's</option>
                                <option value="woman" >Women's</option>
                            </select>
                        </div>
                        <div className="filter-container">
                            <label htmlFor="size">Size:</label>
                            <select name="size" className="input-field" onChange={(e) => {
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
                        </div>
                        <div className="filter-container">
                            <label htmlFor="price">Price:</label>
                            <input name="price" className="input-field price" onChange={(e) => {
                                let filter = { ...this.state.filter, price: e.target.value }
                                this.setState({
                                    filter: filter
                                })
                            }} />
                        </div>
                    </div>
                    <div className="filter-button-container">
                        <div className="filter-button-holder">
                            <button className="filter-button" onClick={this.filterProducts}>FILTER</button>
                        </div>
                    </div>
                    <div className="search-results">
                        {this.displayProducts()}
                    </div>
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

export default withRouter(connect(mapStateToProps, { updateAdmin, setCart, setTotal })(Search));