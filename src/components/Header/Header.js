import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/cleftHeart.jpg';
import { updateNotAdmin } from '../../redux/reducer';
import axios from 'axios';

import './Header.css';

class Header extends Component {
    constructor() { 
        super();
        this.state = {
            message: null,
        }
        this.logout = this.logout.bind(this);

    }

    componentWillReceiveProps(props) {
        console.log(props)
    }
    
    logout = () => {
        axios.post('/api/logout').then(response => {
                 
            const { updateNotAdmin } = this.props;
            updateNotAdmin();
            window.location="/"; 
        }).catch(error => {
           console.log(error)
        });
    };

    
    render(){
        return (
            <div className="header-container">
                <div className="logo-container">
                    <Link to="/"><img className="logo" src={logo} alt="logo" /></Link>
                </div>
                <div className="nav-bar-container">
                    
                        {!this.props.user.isAdmin &&
                        <div className="nav-list">
                            <Link to="/login"><div className="nav-link-text">Admin Login</div></Link>
                            <Link to="/search"><div className="nav-link-text">Shop</div></Link>
                            <Link to="/cart"><div className="nav-link-text">Cart</div></Link>
                        </div>
                        }
                        {this.props.user.isAdmin && 
                        <div className="nav-list">   
                        <Link to="/admin"><div className="nav-link-text">Admin Homepage</div></Link>
                        <Link to="/search"><div className="nav-link-text">Inventory</div></Link>
                        <Link to="/orders"><div className="nav-link-text">Orders</div></Link>
                        <Link to="/"><div className="nav-link-text" onClick={this.logout}>Logout</div></Link>
                        </div>
                        }
                    
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    const { user } = state;

    return {
        user
    };
}

export default connect(mapStateToProps, { updateNotAdmin })(Header);
