import React, { Component } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { connect } from 'react-redux';
import { updateName, updateDescription, updatePrice, updateManSmall, updateManMedium, updateManLarge, updateManXLarge, updateWomanSmall, updateWomanMedium, updateWomanLarge, updateWomanXLarge, updateImage, updateAdmin } from '../../redux/reducer';

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

    componentDidUpdate(prevProps, prevState){
        if (prevProps.user.isAdmin !== this.props.user.isAdmin) {
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
            <div className="add-home-container">
                <Header />
                {console.log(this.props.user.isAdmin)}
                {this.props.user.isAdmin ?
                (<div className="add-item-box">
                    <Dropzone
                        multiple={false}
                        accept="image/*"
                        onDrop={this.onImageDrop.bind(this)}>
                        <p>Drop an image or click to select a file to upload.</p>
                    </Dropzone>
                    <div>
        {this.state.uploadedFileCloudinaryUrl === '' ? null :
        <div>
          <p>{this.state.uploadedFile.name}</p>
          <img src={this.state.uploadedFileCloudinaryUrl} alt="shirt" />
        </div>}
                    <label htmlFor="name">Name</label>
                    <input id="name" onChange={(e) => updateName(e.target.value)} />
                    <label htmlFor="description">description</label>
                    <input id="description" onChange={(e) => updateDescription(e.target.value)} />
                    <label htmlFor="price">price</label>
                    <input id="price" onChange={(e) => updatePrice(e.target.value)} />
                    <label htmlFor="man-small-size">man-small-size</label>
                    <input id="man-small-size" onChange={(e) => updateManSmall(e.target.value)} />
                    <label htmlFor="man-medium-size">man-medium-size</label>
                    <input id="man-medium-size" onChange={(e) => updateManMedium(e.target.value)} />
                    <label htmlFor="man-large-size">man-large-size</label>
                    <input id="man-large-size" onChange={(e) => updateManLarge(e.target.value)} />
                    <label htmlFor="man-xlarge-size">man-xlarge-size</label>
                    <input id="man-xlarge-size" onChange={(e) => updateManXLarge(e.target.value)} />
                    <label htmlFor="woman-small-size">woman-small-size</label>
                    <input id="woman-small-size" onChange={(e) => updateWomanSmall(e.target.value)} />
                    <label htmlFor="woman-medium-size">woman-medium-size</label>
                    <input id="woman-medium-size" onChange={(e) => updateWomanMedium(e.target.value)} />
                    <label htmlFor="woman-large-size">woman-large-size</label>
                    <input id="woman-large-size" onChange={(e) => updateWomanLarge(e.target.value)} />
                    <label htmlFor="woman-xlarge-size">woman-xlarge-size</label>
                    <input id="woman-xlarge-size" onChange={(e) => updateWomanXLarge(e.target.value)} />
                    <div className="buttons-container">
                        <button onClick={this.submitItem}>SUBMIT</button> 
                                <button onClick={this.cancelAdd}>CANCEL</button>
                    </div>
                </div>
                </div>)
                :
                <div>UNAUTHORIZED, TURN BACK NOW! 3...2...1...</div>
            
                }
            </div>    
        );
    }
}

function mapStateToProps(state) {
    const { user, name, description, price, manSmallSize, manMediumSize, manLargeSize, manXLargeSize, womanSmallSize, womanMediumSize, womanLargeSize, womanXLargeSize, image } = state;

    return {
        user,
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

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);