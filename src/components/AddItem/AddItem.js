import React, { Component } from 'react';
import Header from '../Header/Header';
import axios from 'axios';

import './AddItem.css';

export default class AddItem extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            price: 0,
            manSmallSize: 0,
            manMediumSize: 0,
            manLargeSize: 0,
            manXLargeSize: 0,
            womanSmallSize: 0,
            womanMediumSize: 0,
            womanLargeSize: 0,
            womanXLargeSize: 0,
        }
        this.submitItem = this.submitItem.bind(this);
    }
    
    submitItem() {
        axios.post('/api/products', this.state).then(res => {
            
        }).catch(error => { 
            console.log("submit error", error);
        })
    }
    

    render() {
        console.log(this.state)
        return (
            <div className="add-home-container">
                <Header />
                <div className="add-item-box">
                    <img src="./t-shirt.jpg" alt="tshirt" />
                    <label htmlFor="name">Name</label>
                    <input id="name" onChange={(e) => { 
                        this.setState({
                            name: e.target.value
                        })
                    }}/>
                    <label htmlFor="description">description</label>
                    <input id="description" onChange={(e) => { 
                        this.setState({
                            description: e.target.value
                        })
                    }}/>
                    <label htmlFor="price">price</label>
                    <input id="price" onChange={(e) => { 
                        this.setState({
                            price: e.target.value
                        })
                    }}/>
                    <label htmlFor="man-small-size">man-small-size</label>
                    <input id="man-small-size" onChange={(e) => { 
                        this.setState({
                            manSmallSize: e.target.value
                        })
                    }} />
                    <label htmlFor="man-medium-size">man-medium-size</label>
                    <input id="man-medium-size" onChange={(e) => { 
                        this.setState({
                            manMediumSize: e.target.value
                        })
                    }} />
                    <label htmlFor="man-large-size">man-large-size</label>
                    <input id="man-large-size" onChange={(e) => { 
                        this.setState({
                            manLargeSize: e.target.value
                        })
                    }} />
                    <label htmlFor="man-xlarge-size">man-xlarge-size</label>
                    <input id="man-xlarge-size" onChange={(e) => { 
                        this.setState({
                            manXLargeSize: e.target.value
                        })
                    }} />
                    <label htmlFor="woman-small-size">woman-small-size</label>
                    <input id="woman-small-size" onChange={(e) => { 
                        this.setState({
                            womanSmallSize: e.target.value
                        })
                    }} />
                    <label htmlFor="woman-medium-size">woman-medium-size</label>
                    <input id="woman-medium-size" onChange={(e) => { 
                        this.setState({
                            womanMediumSize: e.target.value
                        })
                    }} />
                    <label htmlFor="woman-large-size">woman-large-size</label>
                    <input id="woman-large-size" onChange={(e) => { 
                        this.setState({
                            womanLargeSize: e.target.value
                        })
                    }} />
                    <label htmlFor="woman-xlarge-size">woman-xlarge-size</label>
                    <input id="woman-xlarge-size" onChange={(e) => { 
                        this.setState({
                            womanXLargeSize: e.target.value
                        })
                    }}/>
                    <div className="buttons-container">
                        <button onClick={this.submitItem}>SUBMIT</button>
                        <button>CANCEL</button>    
                    </div>
                </div>
            </div>
        );
    }
}