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
                    <ul className="nav-list">
                        {!this.props.user.isAdmin &&
                            <Link to="/login"><li className="nav-link-text">Admin Login</li></Link> 
                        }
                        {this.props.user.isAdmin && 
                        <Link to="/"><li className="nav-link-text" onClick={this.logout}>Logout</li></Link>
                        }
                        <Link to="/search"><li className="nav-link-text">Shop</li></Link>
                        <li className="nav-link-text">Orders</li>
                        <Link to="/cart"><li className="nav-link-text">Cart</li></Link>
                    </ul>
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
