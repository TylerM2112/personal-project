import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCart, updateAdmin } from '../../redux/reducer';

import './Product.css';
import Header from '../Header/Header';

class Product extends Component {
    constructor(props) {
        super();
        this.state = {
            ...props.location.state,
            inputVal: 0,
            gender: '',
            size: '',
            added: false,
        }
        this.updateProductDB = this.updateProductDB.bind(this);
        this.deleteProductDB = this.deleteProductDB.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
        this.backToSearch = this.backToSearch.bind(this);
        this.headToCart = this.headToCart.bind(this);
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
    }


    // Updates the information for the selected product to the db.
    updateProductDB(e) {
        this.setState({
            [e.target.name]: this.state.inputVal
        });
        setTimeout(() => axios.put("/api/products", this.state).then(res => {
        }).catch(error => {
            console.log("UPDATE FUNCTION ERROR", error);
        }), 200);
    }

    // Deletes product from the db.
    deleteProductDB() {
        console.log(this.state.id)
        axios.delete(`/api/product/${this.state.id}`).then(res => {
        }).catch(error => {
            console.log("DELETE FUNCTION ERROR", error);
        });
    }

    //Sets a variable in state equal to what is put in the input.
    handleChange(e) {
        this.setState({
            inputVal: e.target.value
        });
    }

    //Attached to OnClick for Adding Product to Cart
    addToCart() {
        const { updateCart } = this.props;
        const { id, image, name, price, gender, size, quantity } = this.state;
        if (this.state.size !== '') {
            if (this.state.gender !== '') {
                if (this.state.quantity !== 0) {
                    updateCart({
                        id: id,
                        name: name,
                        price: +price,
                        image: image,
                        gender: gender,
                        size: size,
                        quantity: quantity,
                    });
                    axios.post('/api/cart', this.props.user).then(res => {
                        this.setState({
                            added: true,
                        })
                    }).catch(error => {
                        console.log("ADD TO SESSION CART ERROR", error);
                    })
                    setTimeout(() => {
                        this.setState({ added: false })
                    }, 2000)
                } 
            }
        }
    }

    handleQuantity(e) {
        this.setState({
            quantity: e.target.value
        })
    }

    backToSearch() {
        this.props.history.push('/search');
    }
    headToCart() {
        this.props.history.push('/cart');
    }

    render() {
        // console.log("THIS IS STATE", this.state)
        const { name, description, price, image, man_small_size, man_medium_size, man_large_size, man_xlarge_size, woman_small_size, woman_medium_size, woman_large_size, woman_xlarge_size } = this.state;

        return (
            <div>
                {this.props.user.isAdmin &&
                    <Header />}
                <div className="solo-product-container">
                    {this.state.added === true ?
                        <div className="add-cart-message">
                            <h4>Item added to cart!</h4>
                        </div>
                        :
                        <div></div>}

                    {!this.props.user.isAdmin &&
                        <div className="solo-product-display">
                            <div className="solo-product-image">
                                <img src={image} alt="shirt" />
                            </div>
                            <div className="solo-info-container">
                                <div className="solo-product-text">
                                    <div>
                                        <p><strong>{name}</strong></p>
                                    </div>
                                    <div>
                                        <p> ${price}</p>
                                    </div>
                                </div>
                                <div className="solo-product-selects">
                                    <label>Gender</label>
                                    <select name="filters" onChange={(e) => {
                                        this.setState({
                                            gender: e.target.value
                                        })

                                    }} required>
                                        <option value="" defaultValue />
                                        <option value="man">Men's</option>
                                        <option value="woman" >Women's</option>
                                    </select>
                                    <label>Size</label>
                                    <select name="filters" onChange={(e) => {
                                        this.setState({
                                            size: e.target.value,
                                        })
                                    }} required>
                                        <option value="" defaultValue />
                                        <option value="small" >Small</option>
                                        <option value="medium" >Medium</option>
                                        <option value="large" >Large</option>
                                        <option value="xlarge" >XLarge</option>
                                    </select>
                                    <label htmlFor="quantity">Quantity</label>
                                    <input name="quantity" onChange={(e) => this.handleQuantity(e)} required />
                                </div>
                            </div>
                            <div className="add-to-button-container">
                                <button className="add-to-button" onClick={() => { this.addToCart() }}>ADD TO CART</button>
                            </div>
                        </div>}
                    {this.props.user.isAdmin &&
                        <div className="solo-product-display">
                            <div className="solo-product-image">
                                <img src={image} alt="shirt" />
                            </div>
                            <div className="inventory-input-container">
                                <label htmlFor="changeInput">Update Input:</label>
                                <input name="changeInput" onChange={(e) => this.handleChange(e)} />
                            </div>
                            <div className="solo-text-updates">
                                <div className="solo-product-text">
                                    <h4>Name:</h4><p>{name}</p>
                                    <h4>Description:</h4><p> {description}</p>
                                    <h4>Price:</h4><p> ${price}</p>
                                </div>
                                <div className="product-text-updates">

                                    <div className="inventory-input-container">
                                        <button className="update-button" name="name"
                                            onClick={(e) => this.updateProductDB(e)}>Update</button>
                                        <p>Name</p>
                                    </div>

                                    <div className="inventory-input-container">
                                        <button className="update-button" name="description"
                                            onClick={(e) => this.updateProductDB(e)}>Update</button>
                                        <p>Description</p>
                                    </div>
                                    <div className="inventory-input-container">
                                        <button className="update-button" name="price"
                                            onClick={(e) => this.updateProductDB(e)}>Update</button>
                                        <p>Price</p>
                                    </div>
                                </div>
                            </div>
                            <div className="inventory-edit-list">


                                <div className="inventory-updates">
                                    <h4>Men's Sizes</h4>
                                    <div className="inventory-input-container">
                                        <button className="update-button" name="man_small_size"
                                            onClick={(e) => this.updateProductDB(e)}>Update</button>
                                        <p>Small: {man_small_size}</p>
                                    </div>

                                    <div className="inventory-input-container">
                                        <button className="update-button" name="man_medium_size"
                                            onClick={(e) => this.updateProductDB(e)}>Update
                                            </button>
                                        <p>Medium: {man_medium_size}</p>
                                    </div>
                                    <div className="inventory-input-container">
                                        <button className="update-button" name="man_large_size"
                                            onClick={(e) => this.updateProductDB(e)}>Update</button>
                                        <p>Large: {man_large_size}</p>
                                    </div>
                                    <div className="inventory-input-container">
                                        <button className="update-button" name="man_xlarge_size"
                                            onClick={(e) => this.updateProductDB(e)}>Update</button>
                                        <p>XLarge: {man_xlarge_size}</p>
                                    </div>
                                </div>

                                <div className="inventory-updates">
                                    <div>
                                        <h4>Women's Sizes</h4>
                                    </div>
                                    <div className="inventory-input-container">
                                        <button className="update-button" name="woman_small_size"
                                            onClick={(e) => this.updateProductDB(e)}>Update</button>
                                        <p>Small: {woman_small_size}</p>
                                    </div>
                                    <div className="inventory-input-container">
                                        <button className="update-button" name="woman_medium_size"
                                            onClick={(e) => this.updateProductDB(e)}>Update</button>
                                        <p>Medium: {woman_medium_size}</p>
                                    </div>
                                    <div className="inventory-input-container">
                                        <button className="update-button" name="woman_large_size"
                                            onClick={(e) => this.updateProductDB(e)}>Update</button>
                                        <p>Large: {woman_large_size}</p>
                                    </div>
                                    <div className="inventory-input-container">
                                        <button className="update-button" name="woman_xlarge_size"
                                            onClick={(e) => this.updateProductDB(e)}>Update</button>
                                        <p>XLarge: {woman_xlarge_size}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="delete-button-container">
                                <Link to="/search"><button className="delete-button" onClick={this.deleteProductDB}>DELETE</button></Link>
                            </div>
                        </div>}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { user, product } = state;

    return {
        user,
        product
    };
}

export default withRouter(connect(mapStateToProps, { updateCart, updateAdmin })(Product));