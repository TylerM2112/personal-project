import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAdmin } from '../../redux/reducer';
import Header from '../Header/Header';
import axios from 'axios';

import './Login.css';
import Footer from '../Footer/Footer';


class Login extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            message: null,
        }
        this.login = this.login.bind(this);
        this.getMessage = this.getMessage.bind(this);
    }

    getMessage = error => error.response
        ? error.response.data
            ? error.response.data.message
            : JSON.stringify(error.response.data, null, 2)
        : error.message;

    login = () => {
        this.setState({ message: null });
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        axios.post('/api/login', {
            username,
            password
        }).then(response => {
            if (response.data === true) {
                const { updateAdmin } = this.props
                updateAdmin();
                this.setState({
                    user: response.data
                })
                this.props.history.push("/admin");
            }
        }).catch(error => {
            this.setState({ message: 'Uh-Oh! Something went wrong: ' + this.getMessage(error) });
        });
    };

    render() {
        const { message } = this.state;
        
        return (
            <div className="login-main-container">
                <Header />
                <div className="admin-login">
                    <h2>Admin Login</h2>
                    <div className="input-container">
                        Username: <input className="input-field" ref="username" />
                        Password: <input className="input-field" type="password" ref="password" />
                    </div>
                    
                    <div className="login-button-container">
                        <button className="login-button"onClick={this.login}>Login</button>
                    </div>   
                    <div> {message}</div>
                </div>
                <Footer />
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

export default connect(mapStateToProps, { updateAdmin })(Login);
