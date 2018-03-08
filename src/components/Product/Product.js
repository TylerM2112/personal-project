import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Product.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class Product extends Component {
    constructor(props) {
        super();
        this.state = {
            ...props.location.state,
            inputVal: 0,
        }
        this.updateProductDB = this.updateProductDB.bind(this);
        this.deleteProductDB = this.deleteProductDB.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    updateProductDB(e) {
        this.setState({
            [e.target.name]: this.state.inputVal
        });
        setTimeout(() => axios.put("/api/products", this.state).then(res => {
        }).catch(error => {
            console.log("UPDATE FUNCTION ERROR", error);
        }), 200);
    }

    deleteProductDB() {
        axios.delete(`/api/product/${this.state.id}`).then(res => {
        }).catch(error => {
            console.log("DELETE FUNCTION ERROR", error);
        });
    }
    
    handleChange(e) {
        this.setState({
            inputVal: e.target.value
        });
     }

    render(props) {
        
        let shirt = this.props.location.state.image;
        // console.log("LOOK HERE", this.state)
        // console.log("HEY YOU", this.props, props)
        return (
            <div className="solo-product-container">
                <Header />
                <div className="solo-product-display">
                    <img src={shirt} alt="shirt" />
                    <p>Name: {this.props.location.state.name}</p>
                    <p>Description: {this.props.location.state.description}</p>
                    <p>Price: {this.props.location.state.price}</p>
                    <select>
                        <option value="" defaultValue />
                        <option value="man">Men's</option>
                        <option value="woman" >Women's</option>
                    </select>
                    <select>
                        <option value="" defaultValue />
                        <option value="small" >Small</option>
                        <option value="medium" >Medium</option>
                        <option value="large" >Large</option>
                        <option value="xlarge" >XLarge</option>
                    </select>
                    <button className="add-to-cart-button">ADD TO CART</button>
                    <div className="inventory-edit-list">
                        <p>Name: {this.state.name}</p>   
                        
                        <label htmlFor="changeInput">Update Input</label>                        
                        <input name="changeInput" onChange={(e) => this.handleChange(e)} />

                    <p>Men's Small: {this.state.man_small_size}</p>
                        <button name="man_small_size"
                            onClick={(e) => this.updateProductDB(e)}>Update</button>

                        <p>Men's Medium: {this.state.man_medium_size}</p>
                        <button name="man_medium_size"
                            onClick={(e) => this.updateProductDB(e)}>Update</button>
                       
                        <p>Men's Large: {this.state.man_large_size}</p>
                        <button name="man_large_size"
                            onClick={(e) => this.updateProductDB(e)}>Update</button>

                    <p>Men's XLarge: {this.state.man_xlarge_size}</p>
                        <button name="man_xlarge_size"
                            onClick={(e) => this.updateProductDB(e)}>Update</button>

                    <p>Women's Small: {this.state.woman_small_size}</p>
                        <button name="woman_small_size"
                            onClick={(e) => this.updateProductDB(e)}>Update</button>

                    <p>Women's Medium: {this.state.woman_medium_size}</p>
                        <button name="woman_medium_size"
                            onClick={(e) => this.updateProductDB(e)}>Update</button>

                    <p>Women's Large: {this.state.woman_large_size}</p>
                        <button name="woman_large_size"
                            onClick={(e) => this.updateProductDB(e)}>Update</button>

                    <p>Women's XLarge: {this.state.woman_xlarge_size}</p>
                        <button name="woman_xlarge_size"
                            onClick={(e) => this.updateProductDB(e)}>Update</button>
                    </div> 
                    <Link to="/search"><button onClick={this.deleteProductDB}>DELETE PRODUCT</button></Link>
                </div>
                <Footer />
            </div>
        );
    }
}
export default Product;