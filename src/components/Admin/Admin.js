import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateAdmin } from '../../redux/reducer';
import axios from 'axios';

import './Admin.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class Admin extends Component {

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

    render() {
        return (
            <div className="admin-home-container">
                <Header />
                {this.props.user.isAdmin ?   
                    <div className="admin-container">
                        <div className="admin-title">
                        Admin Dashboard    
                        </div>    
                        <div className="admin-options">
                              
                        <div className="button-links"> 
                            <Link to="/search"><button>Search Inventory</button></Link>
                        </div>
                        <div className="button-links">                         
                            <Link to="/additem"><button>Add Inventory</button></Link>
                        </div>
                        <div className="button-links"> 
                            <Link to="/orders"><button>Orders</button></Link>
                        </div>
                        <div className="button-links">                         
                            <a href="https://dashboard.stripe.com/test/dashboard" target="_"><button>Stripe Dashboard</button></a>
                            </div>
                        </div>        
                </div>
            :
                <div className="turn-back">Unauthorized, TURN BACK NOW!</div>
                }
            <Footer />    
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

export default connect(mapStateToProps, {updateAdmin})(Admin);