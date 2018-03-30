import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteFromCart, updateSubmitted, updateCustomerID, updateQuantity } from '../../redux/reducer';
import axios from 'axios';
import Checkout from '../Checkout/Checkout';
import { withRouter } from 'react-router-dom';


import './Cart.css';

class Cart extends Component {
    constructor(props) {
        super();
        this.state = {
            ...props,
            customerName: '',
            customerId: null,
            address: null,
            city: null,
            state: null,
            zip: null,
            ran: false,
        }
        this.displayCartItems = this.displayCartItems.bind(this);
        this.updateState = this.updateState.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
    }


    displayCartItems(props) {
        console.log(this.props.state.cart.length)
        
        let displayedString = <h4>Your cart is empty, head over to the shop!</h4>;
        return (
            
            this.props.state.cart.length !== 0 ?
                this.props.state.cart.map((e) => {
                    let productId = e.id
                    let index = this.props.state.cart.findIndex((e) => e.id === productId);
                    return (
                        <div className="cart-item-displayed" id={e.id} key={e.id}>
                        <div className="cart-image-container">    
                            <img className="cart-image" src={e.image} alt="item" />
                        </div>
                            <div className="search-product-info">
                                <p>{e.name}</p>
                                <p>${e.price.toFixed(2)}</p>
                                <p>{e.gender === "man" ? "Men's" : "Woman's"} {e.size}</p>
                                
                                <p>Quantity: {this.props.state.cart[index].quantity}</p>
                            </div>
                            <label htmlFor="quantity" />
                            <input type="number" name="quantity" value={this.props.state.cart[index].quantity} id={e.id} onChange={(e) => this.updateQuantity(e)} />
                            <br />
                            <button className="remove-button" value={e.id} onClick={(e) => { this.deleteFromCart(e.target.value) }}>REMOVE ITEM</button>
                        </div>
                    );
                })
                :
                <div className="empty-cart-message">
                    {displayedString}
                </div>
        )
    }

    displayCartTotal() {
        let updatedTotal = 0;
        this.props.state.cart.map((e) => {
            updatedTotal += (+e.price * +e.quantity)
        })
        if (this.props.state.cart.length !== 0) {
            if (this.state.ran !== true) {
                this.setState({
                    total: updatedTotal,
                    ran: true
                })
            }
            return (
                <div className="total-checkout-container">
                    <div className="total-display">
                        Total: {updatedTotal.toFixed(2)}
                    </div>
                </div>
            )
        }
    }

    deleteFromCart(id) {
        const { deleteFromCart } = this.props;
        let index = this.props.state.cart.findIndex((e) => e.id === +id);
        let updatedCart = this.props.state.cart;
        let updatedTotal = this.props.state.total;

        updatedTotal -= (+this.props.state.cart[index].price * this.props.state.cart[index].quantity);
        updatedCart.splice(index, 1);
        console.log("UPDATED CART", updatedCart)
        this.setState({
            total: updatedTotal,
            cart: updatedCart,
            ran: false,
        }, () => {
            const { cart, total } = this.state;
            // console.log("STATE BEFORE REDUCER CALL", this.state)
            deleteFromCart({
                cart,
                total,
            });
        });
        console.log("HEY ME", this.state)
        axios.post('/api/cartRemove', { state: this.state, total: updatedTotal }).then(res => {
        }).catch(error => {
            console.log("REMOVE FROM SESSION CART", error);
        })
    }

    updateState(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    submitForm() {
        const { updateSubmitted, updateCustomerID } = this.props;
        if (this.state.name !== null) {
            if (this.state.address !== null) {
                if (this.state.city !== null) {
                    if (this.state.state !== null) {
                        if (this.state.zip !== null && this.props.user.cart.length !== 0) {
                            let submitted = { ...this.state }
                            submitted.submitted = true;
                            axios.post('/api/customer', submitted).then(res => {
                                this.setState({
                                    customerId: res.data[0].id,
                                }), updateCustomerID(res.data[0].id)
                            })
                            updateSubmitted(true);

                        } else {
                            alert('Please fill in all the fields.')
                        }
                    }
                }
            }
        }
    }

    updateQuantity(e) {
        const { updateQuantity } = this.props;
        updateQuantity({ id: e.target.id, quantity: e.target.value });
        this.setState({
            ran: false 
        })
    }

    render() {
        
        return (
            <div className="cart-page-container">
            {console.log("TAKE A LOOK", this.state)}
                {!this.state.submitted &&
                    <div className="customer-form">
                    <h1>Please fill out your shipping information!</h1>    
                        <label htmlFor="name">Name</label>
                        <input name="customerName" type="text" onChange={(e) => this.updateState(e)} required />
                        <label htmlFor="address">Address</label>
                        <input name="address" type="text" onChange={(e) => this.updateState(e)} required />
                        <label htmlFor="city">City</label>
                        <input name="city" type="text" onChange={(e) => this.updateState(e)} required />
                        <label htmlFor="state">State</label>
                        <input name="state" type="text" onChange={(e) => this.updateState(e)} required />
                        <label htmlFor="zip">Zip</label>
                        <input name="zip" type="number" onChange={(e) => this.updateState(e)} required />
                        <input type="submit" onClick={this.submitForm} />
                    </div>
                }


                <div className="cart-content-container">
                    {this.displayCartItems()}
                </div>
                {this.displayCartTotal()}
                {this.props.submitted && this.props.cart[0] ?
                   <div className="checkout-containter">
                    <Checkout
                        name={'GENERIC SHOP TITLE'}
                        description={'100% AWESOME Tshirts!'}
                        amount={this.state.total}
                    />
                </div>  : <div></div>
                }
                
            </div>
        );
    }
}

function mapStateToProps(state) {

    return {
        state,
    };
}

export default withRouter(connect(mapStateToProps, { deleteFromCart, updateSubmitted, updateCustomerID, updateQuantity })(Cart));
