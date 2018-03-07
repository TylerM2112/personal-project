import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { updateName, updateDescription, updatePrice, updateManSmall, updateManMedium, updateManLarge, updateManXLarge, updateWomanSmall, updateWomanMedium, updateWomanLarge, updateWomanXLarge, updateImage } from '../../redux/reducer';

import './Product.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class Product extends Component {
    constructor(props) { 
        super();
        this.state = {
            ...props.location.state, newVal: 0,
        }
        this.updateProductDB = this.updateProductDB.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.whenClicked = this.whenClicked.bind(this);
    }

    // componentDidMount() {
    //     const id = params.id;
    //     axios.get(`/api/product/${id}`).then(res => {
    //         this.setState({
    //             ...res
    //         })
    //     })
    // }    

    whenClicked(e) {
        this.setState({
            [e.target.name]: this.state.newVal
        });
     }

    updateProductDB() {
        setTimeout(() => axios.put("/api/products", this.state).then(res => {
        }).catch(error => {
            console.log("update function error", error);
        }), 500);
    }
    
    handleChange(e) {
        this.setState({
            newVal: e.target.value
        });
        console.log(this.state);
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
                        <option value="" selected />
                        <option value="man">Men's</option>
                        <option value="woman" >Women's</option>
                    </select>
                    <select>
                        <option value="" selected />
                        <option value="small" >Small</option>
                        <option value="medium" >Medium</option>
                        <option value="large" >Large</option>
                        <option value="xlarge" >XLarge</option>
                    </select>
                    <button className="add-to-cart-button">ADD TO CART</button>
                    <div className="inventory-edit-list">
                        <p>Name: {this.state.name}</p>   
                        

                    <p>Men's Small: {this.state.man_small_size}</p>
                    <label htmlFor="manSmall">Men's Small Inventory:</label>
                        <input name="man_small_size" defaultValue={this.state.man_small_size} onChange={this.handleChange}/>
                        <button name="man_small_size" onClick={(e) => { { this.whenClicked(e) }; { this.updateProductDB() }  }}>Update</button>

                       

                    <p>Men's Medium: {this.state.man_medium_size}</p>
                    <label htmlFor="manMedium">Men's Medium Inventory:</label>
                    <input name="manMedium" value={this.state.man_medium_size} />
                    <button>Update</button>
                    <p>Men's Large: {this.state.man_large_size}</p>
                    <label htmlFor="manLarge">Men's Large Inventory:</label>
                    <input name="manLarge" value={this.state.man_large_size} />
                    <button>Update</button>
                    <p>Men's XLarge: {this.state.man_xlarge_size}</p>
                    <label htmlFor="manXLarge">Men's XLarge Inventory:</label>
                    <input name="manXLarge" value={this.state.man_xlarge_size} />
                    <button>Update</button>
                    <p>Women's Small: {this.state.woman_small_size}</p>
                    <label htmlFor="womanSmall">Women's Small Inventory:</label>
                    <input name="womanSmall" value={this.state.woman_small_size} />
                    <button>Update</button>
                    <p>Women's Medium: {this.state.woman_medium_size}</p>
                    <label htmlFor="womanMedium">Women's Medium Inventory:</label>
                    <input name="womanMedium" value={this.state.woman_medium_size} />
                    <button>Update</button>
                    <p>Women's Large: {this.state.woman_large_size}</p>
                    <label htmlFor="womanLarge">Women's Large Inventory:</label>
                    <input name="womanLarge" value={this.state.woman_large_size} />
                    <button>Update</button>
                    <p>Women's XLarge: {this.state.woman_xlarge_size}</p>
                    <label htmlFor="womanXLarge">Women's XLarge Inventory:</label>
                    <input name="womanXLarge" value={this.state.woman_xlarge_size} />
                        <button>Update</button>
                    </div>    
                </div>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { name, description, price, manSmallSize, manMediumSize, manLargeSize, manXLargeSize, womanSmallSize, womanMediumSize, womanLargeSize, womanXLargeSize, image } = state;

    return {
        name,
        description,
        price,
        manSmallSize,
        manMediumSize,
        manLargeSize,
        manXLargeSize,
        womanSmallSize,
        womanMediumSize,
        womanLargeSize,
        womanXLargeSize,
        image,
    };
}

const mapDispatchToProps = {
    updateName: updateName,
    updateDescription: updateDescription,
    updatePrice: updatePrice,
    updateManSmall: updateManSmall,
    updateManMedium: updateManMedium,
    updateManLarge: updateManLarge,
    updateManXLarge: updateManXLarge,
    updateWomanSmall: updateWomanSmall,
    updateWomanMedium: updateWomanMedium,
    updateWomanLarge: updateWomanLarge,
    updateWomanXLarge: updateWomanXLarge,
    updateImage: updateImage,

}

export default connect(mapStateToProps, mapDispatchToProps)(Product);