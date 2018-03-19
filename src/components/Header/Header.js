import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/cleftHeart.jpg';
import { updateNotAdmin, updateAdmin } from '../../redux/reducer';
import axios from 'axios';

import './Header.css';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            message: null,
            isAdmin: false,
        }
        this.logout = this.logout.bind(this);

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


    render() {
        return (
            <div className="header-container">
                <Link to="/"><div className="logo-container">
                    <img className="logo" src={logo} alt="logo" />
                </div></Link>
                <div className="nav-bar-container">
                    {!this.props.user.isAdmin &&
                        <div className="nav-list">
                        <div>
                            <Link to="/login"><div className="nav-link-text">Admin Login</div></Link>
                        </div>
                        <div>
                            <Link to="/search"><div className="nav-link-text">Shop</div></Link>
                        </div>
                        <div>
                            <Link to="/cart"><div className="nav-link-text">Cart</div></Link>
                            </div>
                        </div>
                    }
                    {this.props.user.isAdmin &&
                        <div className="nav-list">
                            <Link to="/admin"><div className="nav-link-text">Admin Dashboard</div></Link>
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

export default connect(mapStateToProps, { updateNotAdmin, updateAdmin })(Header);
