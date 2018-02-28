import React, { Component } from 'react';
import Header from '../Header/Header';

import './AddItem.css';

export default class AddItem extends Component {
    render() {
        return (
            <div className="add-home-container">
                <Header />
                <div className="add-item-box">
                    <img src="./t-shirt.jpg" alt="tshirt" />
                    <label htmlFor="name">Name</label>
                    <input id="name" />
                    <label htmlFor="description">description</label>
                    <input id="description" />
                    <label htmlFor="price">price</label>
                    <input id="price" />
                    <select>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="X-Large">X-Large</option>
                    </select>
                    <label htmlFor="quantity">quantity</label>
                    <input id="quantity" />
                    <div className="buttons-container">
                        <button>SUBMIT</button>
                        <button>CANCEL</button>    
                    </div>
                </div>
            </div>
        );
    }
}