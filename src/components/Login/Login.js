import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAdmin, updateNotAdmin } from '../../redux/reducer';

import Header from '../Header/Header';

import axios from 'axios';


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
             }
        }).catch(error => {
            this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
        });
    };

    logout = () => {
        axios.post('/api/logout').then(response => {
            const { updateNotAdmin } = this.props;
            updateNotAdmin();
            this.setState({
                user: '',
            })
            this.props.history.push("/");
        }).catch(error => {
            this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
        });
    };


    render() {
        const { message } = this.state;
        const { user } = this.state;
        console.log(this.props);
        const inputFields = <div>
            Username: <input ref="username" />
            {' '}
            Password: <input type="password" ref="password" />
            {' '}
        </div>
        return (
            <div className="login-main-container">
            <Header />    
                <div className="App-intro">
                    {!user &&
                        <div className="admin-login">
                            <h2>Admin Login</h2>
                            {inputFields}
                            <button onClick={this.login}>Log in</button>
                        </div>}
                    {message}
                    {console.log("rendered", user.isAdmin)}
                    {user && <div className="login-success">
                        <h2>Status:</h2>
                        <div>You have successfully logged in!</div>
                        <button onClick={this.logout}>Log out</button>
                    </div>}
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

export default connect(mapStateToProps, {updateAdmin, updateNotAdmin})(Login);
