import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteFromCart } from '../../redux/reducer';
import axios from 'axios';


import './Cart.css';

import Header from '../Header/Header';

class Cart extends Component {
    constructor(props) {
        super();
        this.state = {
            ...props.user
        }
        this.displayCartItems = this.displayCartItems.bind(this);
    }

    displayCartItems() {
        let displayedString = 'Your cart is empty, head over to the shop!';
        // console.log(this.props)
        return (
            this.props.user.cart.length !== 0 ?
                this.props.user.cart.map((e) => {
                    return (
                        <div className="cart-item-displayed" id={e.id} key={e.id}>
                            <img src={e.image} alt="item" />

                            <div className="search-product-info">
                                Name: {e.name}
                                <br />
                                Price: {e.price.toFixed(2)}
                            </div>
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
        if (this.state.cart.length !== 0) {
            return (
                <div className="total-checkout-container">
                    <div className="total-display">
                        Total: {+this.state.total.toFixed(2)}
                    </div>
                    <div className="check-out-button">
                        <button>CHECK OUT</button>
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

        updatedTotal -= (+this.state.cart[index].price);
        updatedCart.splice(index, 1);
        console.log("UPDATED CART", updatedCart)
        this.setState({
            total: updatedTotal,
            cart: updatedCart,
        }, () => {
            const { cart, total } = this.state;
            console.log("STATE BEFORE REDUCER CALL", this.state)
            deleteFromCart({
                cart,
                total,
            });
        });
        console.log("HEY ME", this.state)
        axios.post('/api/cartRemove', { state: this.state, total: updatedTotal}).then(res => {
        }).catch(error => {
            console.log("REMOVE FROM SESSION CART", error);
        })
    }

    render() {
        console.log("RENDER CART LINE 93", this.state)
        return (
            <div className="cart-page-container">
                <Header />
                <div className="cart-content-container">
                    {this.displayCartItems()}
                </div>
                {this.displayCartTotal()}
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

export default connect(mapStateToProps, { deleteFromCart })(Cart);
