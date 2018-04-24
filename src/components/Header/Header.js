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
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.state.isAdmin !== this.props.state.isAdmin) {
            return true;
        }
    }

    componentDidMount() {
        axios.get('/api/session').then(res => {
            if (res.data.isAdmin === true) {
                this.props.updateAdmin();
                this.setState({
                    isAdmin: true,
                    cart: this.props.cart,
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
        // console.log("HERE IS NEXTPROPS", this.props.cart);
        if (this.state.cartCount === this.props.state.cart.length) {

        } else {
            this.setState({
                cartCount: this.props.state.cart.length
            })
        }
        return this.state.cartCount;
    }


    render() {
        console.log("NEW NEW NEW", this.props)
        return (
            <div className="header-container">
             <Link to="/"><div className="logo-container-large">
                        <img className="logo" src={logo} alt="logo" /></div>
                    </Link>
                <div className="nav">
                    <div className="menu" onClick={this.isOpen}><div className="hamburger-div">☰</div></div>
                    <div className={this.state.isOpen ? "bin" : "closedBin"}>
                        {!this.props.state.isAdmin &&
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
                        {this.props.state.isAdmin &&
                            <div className="nav-link-container">
                                <Link to="/admin"><div className="nav-link-text">Dashboard</div></Link>
                                <Link to="/search"><div className="nav-link-text">Inventory</div></Link>
                                <Link to="/additem"><div className="nav-link-text">Add Inventory</div></Link>
                                <Link to="/"><div className="nav-link-text" onClick={this.logout}>Logout</div></Link>
                            </div>
                        }
                    </div>
                    <div className="nav-bar-large">
                        {!this.props.state.isAdmin &&
                            <div className="nav-link-container">
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
                        {this.props.state.isAdmin &&
                            <div className="nav-link-container">
                                <Link to="/admin"><div className="nav-link-text">Dashboard</div></Link>
                                <Link to="/search"><div className="nav-link-text">Inventory</div></Link>
                                <Link to="/additem"><div className="nav-link-text">Add Inventory</div></Link>
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
                    <div className="cartCount">
                        {this.updateCartCount()}
                    </div>
                </div>
                {this.state.cartOpen ? <div className="cart"><Cart /></div> : <div className="closedCart"></div>}
            </div>
        );
    };
}

function mapStateToProps(state) {
    console.log("MAP PROPS STATE", state)
    return {
        state,
    };
}

export default connect(mapStateToProps, { updateNotAdmin, updateAdmin })(Header);
