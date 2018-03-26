import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/atom.jpeg';
import cartimage from '../../assets/cartimage.png';
import { updateNotAdmin, updateAdmin } from '../../redux/reducer';
import axios from 'axios';
import Cart from '../Cart/Cart';


import './Header.css';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            message: null,
            isAdmin: false,
            isOpen: false,
            cartOpen: false,
            cartCount: 0,
        }
        this.logout = this.logout.bind(this);
        this.isOpen = this.isOpen.bind(this);
        this.cartOpen = this.cartOpen.bind(this);
        this.updateCartCount = this.updateCartCount.bind(this);
    }
    componentDidMount() {
        axios.get('/api/session').then(res => {
            if (res.data.isAdmin === true) {
                this.props.updateAdmin();
                this.setState({
                    isAdmin: true,
                })
            }
        })
    }

    logout = () => {
        axios.post('/api/logout').then(response => {

            const { updateNotAdmin } = this.props;
            updateNotAdmin();
            window.location = "/";
        }).catch(error => {
            console.log(error)
        });
    };  

   

    isOpen() {
        this.setState({ isOpen: !this.state.isOpen })
    }
    cartOpen() {
        this.setState({ cartOpen: !this.state.cartOpen })
    }

    updateCartCount() {
        console.log("HERE IS NEXTPROPS", this.props.cart);
        if (this.state.cartCount === this.props.cart.length) {

        } else { 
            this.setState({
                cartCount: this.props.cart.length
            })
        }
        console.log(this.props.user)
        return this.props.cart.length;
    }


    render() {
        return (
            <div className="header-container">
                <div className="nav">
                    <div className="menu" onClick={this.isOpen}><div>☰</div></div>
                    <div className={this.state.isOpen ? "bin" : "closedBin"}>
                        {!this.props.user.isAdmin &&
                            <div className="">
                                <div>
                                    <Link to="/"><div className="nav-link-text">Home</div></Link>
                                </div>
                                <div>
                                    <Link to="/search"><div className="nav-link-text">Shop</div></Link>
                                </div>
                                <div>
                                    <Link to="/login"><div className="nav-link-text">Admin Login</div></Link>
                                </div>


                            </div>
                        }
                        {this.props.user.isAdmin &&
                            <div className="">
                                <Link to="/admin"><div className="nav-link-text">Admin Dashboard</div></Link>
                                <Link to="/search"><div className="nav-link-text">Inventory</div></Link>
                                <Link to="/orders"><div className="nav-link-text">Orders</div></Link>
                                <Link to="/"><div className="nav-link-text" onClick={this.logout}>Logout</div></Link>
                            </div>
                        }
                    </div>
                </div>
                <Link to="/"><div className="logo-container">
                    <img className="logo" src={logo} alt="logo" />
                </div></Link>
                <div className="cart-menu" onClick={this.cartOpen}>
                    <img src={cartimage} alt="cart" />
                    {this.state.cartCount}
                </div>
                {this.state.cartOpen ? <div className="cart"><Cart /></div> : "closedCart"}
            </div>
        );
    };
}

function mapStateToProps(state) {
    console.log("MAP PROPS STATE",state)
    const { user } = state;
    return {
        user,
    };
}

export default connect(mapStateToProps, { updateNotAdmin, updateAdmin })(Header);
