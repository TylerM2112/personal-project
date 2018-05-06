import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateName, updateDescription, updatePrice, updateManSmall, updateManMedium, updateManLarge, updateManXLarge, updateWomanSmall, updateWomanMedium, updateWomanLarge, updateWomanXLarge, updateImage, updateAdmin } from '../../redux/reducer';
import Header from '../Header/Header';
import './AddItem.css';

const CLOUDINARY_UPLOAD_PRESET = 'yoitcpgp';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/tylermiller/upload';

class AddItem extends Component {
    constructor(props) {
        super();
        this.state = {
            uploadedFile: '',
            uploadedFileCloudinaryURL: '',
            isAdmin: false,
        }
        this.submitItem = this.submitItem.bind(this);
        this.cancelAdd = this.cancelAdd.bind(this);
    }

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

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.state.isAdmin !== this.props.state.isAdmin) {
            return true;
        }
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }
    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.props.updateImage(response.body.secure_url);
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url,
                });
            }
        });
    }

    submitItem() {
        console.log("SUBMIT ITEM", this.props)
        axios.post('/api/products', this.props).then(res => {
        }).catch(error => {
            console.log("submit error", error);
        })
        window.location.reload();
    }

    cancelAdd() {
        this.props.history.push('/admin');
    }

    render() {
        console.log("LOOK", this.props);
        const { updateName, updateDescription, updatePrice, updateManSmall, updateManMedium, updateManLarge, updateManXLarge, updateWomanSmall, updateWomanMedium, updateWomanLarge, updateWomanXLarge } = this.props;
        return (
            <div>
                    <Header />
                <div className="add-home-container">
                    {this.props.state.isAdmin ?

                        <div className="add-item-container">
                            <div className="dropzone-container"> 
                                <Dropzone
                                    className="dropzone"
                                    multiple={false}
                                    accept="image/*"
                                    onDrop={this.onImageDrop.bind(this)}>
                                    <p>Drop an image or click to select a file to upload.</p>
                                </Dropzone>
                                {this.state.uploadedFileCloudinaryUrl === '' ? null :

                                <div className="dropzone-image-container">
                                    <img src={this.state.uploadedFileCloudinaryUrl} className="dropzone-image" alt="shirt" />
                                </div>}
                            </div>
                            <div className="additem-input-fields">
                                <div className="additem-text-fields">
                                    <label htmlFor="name">Name:</label>
                                    <input className="input-field" id="name" onChange={(e) => updateName(e.target.value)} />
                                    <label htmlFor="description">Description:</label>
                                    <input className="input-field" id="description" onChange={(e) => updateDescription(e.target.value)} />
                                    <label htmlFor="price">Price:</label>
                                    <input className="input-field" id="price" onChange={(e) => updatePrice(e.target.value)} />
                                </div>
                                <div className="additem-Inventory">
                                    <div className="additem-man-inventory-levels">
                                        
                                        <label htmlFor="man-small-size">Men's Small: </label>
                                        <input className="input-field" id="man-small-size" onChange={(e) => updateManSmall(e.target.value)} />
                                        <label htmlFor="man-medium-size">Medium: </label>
                                        <input className="input-field" id="man-medium-size" onChange={(e) => updateManMedium(e.target.value)} />
                                        <label htmlFor="man-large-size">Large: </label>
                                        <input className="input-field" id="man-large-size" onChange={(e) => updateManLarge(e.target.value)} />
                                        <label htmlFor="man-xlarge-size">XLarge: </label>
                                        <input className="input-field" id="man-xlarge-size" onChange={(e) => updateManXLarge(e.target.value)} />
                                    </div>
                                    <div className="additem-womens-inventory-levels">
                                        <label htmlFor="woman-small-size">Woman's Small: </label>
                                        <input className="input-field" id="woman-small-size" onChange={(e) => updateWomanSmall(e.target.value)} />
                                        <label htmlFor="woman-medium-size">Medium: </label>
                                        <input className="input-field" id="woman-medium-size" onChange={(e) => updateWomanMedium(e.target.value)} />
                                        <label htmlFor="woman-large-size">Large: </label>
                                        <input className="input-field" id="woman-large-size" onChange={(e) => updateWomanLarge(e.target.value)} />
                                        <label htmlFor="woman-xlarge-size">XLarge: </label>
                                        <input className="input-field" id="woman-xlarge-size" onChange={(e) => updateWomanXLarge(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <div className="additem-buttons-container">
                                <button className="additem-button" onClick={this.submitItem}>SUBMIT</button>
                                <button className="additem-button" onClick={this.cancelAdd}>CANCEL</button>
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
    const { name, description, price, manSmallSize, manMediumSize, manLargeSize, manXLargeSize, womanSmallSize, womanMediumSize, womanLargeSize, womanXLargeSize, image } = state;

    return {
        state,
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
    updateAdmin: updateAdmin,

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddItem));