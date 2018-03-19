import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateAdmin } from '../../redux/reducer';
import { withRouter } from 'react-router-dom';    

import './Orders.css';
import Header from '../Header/Header';

class Orders extends Component {
    constructor(props) { 
        super();
        this.state = {
            ...props.user,
            loaded: false,
            orders: [],
        }
        this.displayOrders = this.displayOrders.bind(this);
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
        axios.get('/api/orders').then(res => {
            console.log("ORDERS 18", res.data)
            this.setState({
                loaded: true,
                orders: res.data,
            });
        });
        
    }
    
    displayOrders() {
        let style = { borderTop: '1px solid black' };
        let displayedOrders = this.state.orders.map((e, i, arr) => {
            return (
                i === 0 ? 
                    <tr className="order-line-content" key={e.id} style={style}>        
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>{e.address}</td>
                        <td>{e.city}</td>
                        <td>{e.state}</td>
                        <td>{e.zip}</td>
                        <td>{e.product_name}</td>
                    <td>{e.products}</td>
                    <td>{e.gender}</td>
                    <td>{e.size}</td>
                    <td>{e.quantity}</td>    
                    </tr>
                    
                    :
                    arr[i - 1].id === e.id ?
                        <tr className="order-line-content" key={e.id} style={style}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{e.product_name}</td>
                    <td>{e.products}</td>
                    <td>{e.gender}</td>
                    <td>{e.size}</td>
                            <td>{e.quantity}</td>       
                    </tr> 
                    :
                        <tr className="order-line-content" key={e.id} style={style}>        
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>{e.address}</td>
                        <td>{e.city}</td>
                        <td>{e.state}</td>
                        <td>{e.zip}</td>
                        <td>{e.product_name}</td>
                    <td>{e.products}</td>
                    <td>{e.gender}</td>
                    <td>{e.size}</td>
                            <td>{e.quantity}</td>      
                    </tr> 
                        
            )
        })
        return displayedOrders;
     }
    render() {
        
        return (
            <div>
                {this.props.user.isAdmin &&
                    <Header />}
            <div className="orders-landing-container">
                {this.props.user.isAdmin ?   
                <div className="header-title">
                ORDERS
                    
                {this.state.loaded ?           
                    <table className="orders-content">
                        <tr><th>Order ID</th> <th>Name</th> <th>Address</th> <th>City</th> <th>State</th> <th>Zip</th> <th>Product Name</th> <th>Product ID</th> <th>Gender</th> <th>Size</th>  <th>Quantity</th></tr>
                        {this.displayOrders()}
                            </table>       
                    :
                            <div>No orders are available.</div>}
                    </div>
                    :
                <div className="turn-back">Unauthorized! TURN BACK NOW!</div>}
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

export default withRouter(connect(mapStateToProps, {updateAdmin})(Orders));
