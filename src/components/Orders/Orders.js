import React, { Component } from 'react';
import axios from 'axios';

import './Orders.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';    

class Orders extends Component {
    constructor() { 
        super();
        this.state = {
            loaded: false,
            orders: [],
        }
        this.displayOrders = this.displayOrders.bind(this);
    }

    componentDidMount() {
        axios.get('/api/orders').then(res => {
            console.log("ORDERS 18", res.data)
            this.setState({
                loaded: true,
                orders: res.data,
            });
        });
    }
    
    displayOrders() {
        let displayedOrders = this.state.orders.map((e) => {
            return (
                <tr className="order-line-content" key={e.id}>
                    <td>{e.id}</td> <td>{e.name}</td> <td>{e.address}</td> <td>{e.city}</td> <td>{e.state}</td> <td>{e.zip}</td> <td>{e.product_name}</td> <td>{e.products}</td> <td>{e.gender}</td> <td>{e.size}</td>  <td>{e.quantity}</td>    
                    </tr>     
            )
        })
        return displayedOrders;
     }
    render() {
        return (
            <div className="orders-landing-container">
                <Header />
                <div className="header-title">
                ORDERS    
                </div>    
                {this.state.loaded ?
                <table className="orders-content">    
                <tr><th>Order ID</th> <th>Name</th> <th>Address</th> <th>City</th> <th>State</th> <th>Zip</th> <th>Product Name</th> <th>Product ID</th> <th>Gender</th> <th>Size</th>  <th>Quantity</th></tr>          
                {this.displayOrders()}  
                </table>
                    : <div>No orders are available.</div>}
                <Footer />
            </div>
        );
    }
}

export default Orders;