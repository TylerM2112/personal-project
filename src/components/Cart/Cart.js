import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteFromCart, updateSubmitted, updateCustomerID, updateQuantity } from '../../redux/reducer';
import axios from 'axios';
import Checkout from '../Checkout/Checkout';


import './Cart.css';

import Header from '../Header/Header';

class Cart extends Component {
    constructor(props) {
        super();
        this.state = {
            ...props.user,
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
        // this.createACustomer = this.createACustomer.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
    }

    // componentWillReceiveProps(nextProps){
    //     if(this.state.user != nextProps.user){
    //       this.setState({
    //           myState: nextProps.user
    //       }); 
    //     }
    //   }

    componentDidUpdate() {
        console.log("UPDATING")
    }

    displayCartItems(props) {
        let displayedString = 'Your cart is empty, head over to the shop!';
        // console.log(this.props)
        return (
            this.props.user.cart.length !== 0 ?
                this.props.user.cart.map((e) => {
                    let productId = e.id
                    let index = this.state.cart.findIndex((e) => e.id === productId);
                    return (
                        <div className="cart-item-displayed" id={e.id} key={e.id}>
                            <img src={e.image} alt="item" />

                            <div className="search-product-info">
                                Name: {e.name}
                                <br />
                                Price: {e.price.toFixed(2)}
                                <br />
                                Gender: {e.gender === "man" ? "Men's" : "Woman's"}
                                <br />
                                Size: {e.size}
                                <br />
                                {console.log("Props or not", this.props.user.cart[index].quantity)}
                                Quantity: {this.props.user.cart[index].quantity}
                            </div>
                            <label htmlFor="quantity" />
                            <input type="number" name="quantity" value={this.props.user.cart[index].quantity} id={e.id} onChange={(e) => this.updateQuantity(e)} />
                            <br />
                            <button value={e.id} onClick={(e) => { this.deleteFromCart(e.target.value) }}>REMOVE ITEM</button>
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
        this.state.cart.map((e) => {
            updatedTotal += (+e.price * +e.quantity)
        })
        if (this.state.cart.length !== 0) {
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
        let index = this.state.cart.findIndex((e) => e.id === +id);
        let updatedCart = this.state.cart;
        let updatedTotal = this.state.total;

        updatedTotal -= (+this.state.cart[index].price * this.state.cart[index].quantity);
        updatedCart.splice(index, 1);
        console.log("UPDATED CART", updatedCart)
        this.setState({
            total: updatedTotal,
            cart: updatedCart,
            ran: false,
        }, () => {
            const { cart, total } = this.state;
            console.log("STATE BEFORE REDUCER CALL", this.state)
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
                                // console.log("THIS IS CUSTOMER ID", res.data[0].id)
                                this.setState({
                                    customerId: res.data[0].id,
                                }), updateCustomerID(res.data[0].id)
                            })
                            console.log("IS THIS HAPPENING?", this.state)
                            updateSubmitted(true);

                        } else {
                            alert('Please fill in all the fields.')
                        }
                    }
                }
            }
        }
    }

    createOrder() {
        if (this.props.user.submitted === true) {
            console.log("CREATE ORDER PROP CHECK", this.props)
            axios.post('./api/orders', this.props).then(response => { }).catch(error => {
                console.log("createOrder/cart.js 145 error", error)
            })
        } else {
            alert('Please make sure you submit your shipping information!');
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
        console.log("RENDER CART LINE 93", this.state)
        return (
            <div className="cart-page-container">
                <Header />
                {!this.props.user.submitted && this.props.user.cart.length !== 0 ?
                    <div className="customer-form">
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
                    :
                    <div></div>
                }


                <div className="cart-content-container">
                    {this.displayCartItems()}
                </div>
                {this.displayCartTotal()}
                {this.props.user.submitted && this.props.user.cart.length !== 0 ?
                    <button className="checkout-button" onClick={this.createOrder}>Check Out</button> : <div></div>
                }
                <div>
                    <Checkout
                        name={'GENERIC SHOP TITLE'}
                        description={'100% AWESOME Tshirts!'}
                        amount={this.state.total}
                    />
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

export default connect(mapStateToProps, { deleteFromCart, updateSubmitted, updateCustomerID, updateQuantity })(Cart);
