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
            opened: false,
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
        let displayedOrders = this.state.orders.map((e, i, arr) => {
            return (
                i === 0 ? 
                    <div className="order-line-content" key={e.id}>  
                        {window.innerWidth <= 992 ?
                        <div>    
                            <div>{e.id}</div>
                            <div>{e.products}</div>
                                <div>{e.quantity}</div>
                            </div>    
                            :
                            
                            <div>
                            <div>{e.id}</div>
                            <div>{e.name}</div>
                            <div>{e.address}</div>
                            <div>{e.city}</div>
                            <div>{e.state}</div>
                            <div>{e.zip}</div>
                            <div>{e.product_name}</div>
                            <div>{e.products}</div>
                            <div>{e.gender}</div>
                            <div>{e.size}</div>
                            <div>{e.quantity}</div>
                            </div>}
                    </div>
                    
                    :
                    arr[i - 1].id === e.id ?
                    <div className="order-line-content" key={e.id}>
                        <div> </div>
                        <div> </div>
                        <div> </div>
                        <div> </div>
                        <div> </div>
                        <div> </div>
                        <div>{e.product_name}</div>
                        <div>{e.products}</div>
                        <div>{e.gender}</div>
                        <div>{e.size}</div>
                        <div>{e.quantity}</div>       
                    </div> 
                    :
                    <div className="order-line-content" key={e.id}>
                        <div>{e.id}</div>
                        <div>{e.name}</div>
                        <div>{e.address}</div>
                        <div>{e.city}</div>
                        <div>{e.state}</div>
                        <div>{e.zip}</div>
                        <div>{e.product_name}</div>
                        <div>{e.products}</div>
                        <div>{e.gender}</div>
                        <div>{e.size}</div>
                        <div>{e.quantity}</div>      
                    </div> 
                        
            )
        })
        return displayedOrders;
     }
    render() {

        return (
            <div>
                    <Header />
                <div className="orders-landing-container">
                    {this.props.state.isAdmin ?
                        <div>
                            <h1>ORDERS</h1>
                            {this.state.loaded ?
                                <div className="orders-content">
                                    {window.innerWidth < 992 ?
                                        <div className="column-header">
                                            <div>Order ID</div>
                                            <div>Product Name</div>
                                            <div>Quantity</div>
                                        </div>
                                        :
                                        <div className="column-header">
                                            <div>Order ID</div>
                                            <div>Name</div>
                                            <div>Address</div>
                                            <div>City</div>
                                            <div>State</div>
                                            <div>Zip</div>
                                            <div>Product Name</div>
                                            <div>Product ID</div>
                                            <div>Gender</div>
                                            <div>Size</div>
                                            <div>Quantity</div>
                                        </div>
                                    }

                                    {this.displayOrders()} </div>
                                    :
                                    <div>No Orders are Available.</div>
                               }
                          </div>
                        :
                        <div className="turn-back">Unauthorized! TURN BACK NOW!</div>
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

export default withRouter(connect(mapStateToProps, { updateAdmin })(Orders));
