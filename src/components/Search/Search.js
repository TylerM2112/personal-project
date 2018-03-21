import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateAdmin } from '../../redux/reducer';

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
            await axios.get('/api/products')
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
        // });
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
                        
                            <div className="search-product-image">
                                <img className="product-image" src={e.image} alt="item" />
                            </div>
                        </Link>
                            <div className="search-product-text">
                                {this.props.user.isAdmin &&
                                <div className="id-tag">
                                    <h1>Product ID:</h1>
                                    <p>{e.id}</p>
                                </div>} 
                                <div className="name-tag">
                                    <h1>Name:</h1><p>{e.name}</p>
                                </div>
                                <div className="price-tag">
                                <h1>Price:</h1><p> ${e.price}</p>
                                </div>
                            </div>
                    </div>
                        
                        {this.props.user.isAdmin &&
                            
                            <div className="search-inventory-levels">
                                <div className="men-inventory-levels">
                                    <h1>Men's Inventory</h1>
                                    <p>Small: {e.man_small_size}</p>
                                    <p>Medium: {e.man_medium_size}</p>
                                    <p>Large: {e.man_large_size}</p>
                                    <p>XLarge: {e.man_xlarge_size}</p>
                                </div>
                                <div className="women-inventory-levels">
                                    <h1> Women's Inventory</h1>   
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
                {this.props.user.isAdmin &&
                    <Header />}
            <div className="search-landing-container">
                <h1>Take a look around!</h1>
                <div className="search-filter-container">
                <div className="search-inputs-container">    
                    <label htmlFor="gender">Gender</label>    
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
                    <label htmlFor="size">Size</label> 
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
                    <label htmlFor="price">Price</label> 
                    <input name="price" className="input-field" onChange={(e) => {
                        let filter = { ...this.state.filter, price: e.target.value }
                        this.setState({ 
                            filter: filter
                        })
                        }} />
                    </div>    
                    <div className="">
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
    const { user } = state;

    return {
        user
    };
}

export default withRouter(connect(mapStateToProps, { updateAdmin })(Search));