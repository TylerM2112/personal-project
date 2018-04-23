import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateAdmin } from '../../redux/reducer';
import axios from 'axios';

import './Admin.css';
import Header from '../Header/Header';

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
            <div>
                <Header />
            <div className="admin-home-container">
                {this.props.state.isAdmin ?   
                    <div className="admin-container">
                        <div className="admin-title">
                        <h1>Admin Dashboard</h1>
                        </div>    
                        <div className="admin-options">
                            <Link to="/search"><button className="option-button" >Search Inventory</button></Link>
                            <Link to="/additem"><button className="option-button">Add Inventory</button></Link>
                            <a href="https://dashboard.stripe.com/test/dashboard" target="_"><button className="option-button bottom">Stripe Dashboard</button></a>
                        </div>        
                </div>
            :
               <div className="unauthorized-container"><div className="turn-back"><h1>UNAUTHORIZED! TURN BACK NOW!</h1></div></div>
                }  
                </div>
                </div>
        );
    }
}

function mapStateToProps(state) {

    return {
        state
    };
}

export default connect(mapStateToProps, {updateAdmin})(Admin);