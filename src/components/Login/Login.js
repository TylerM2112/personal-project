import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAdmin} from '../../redux/reducer';

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
                this.props.history.push("/admin");
            }
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
                    {!user.isAdmin &&
                        <div className="admin-login">
                            <h2>Admin Login</h2>
                            {inputFields}
                            <button onClick={this.login}>Log in</button>
                        </div>}
                        <div> { message }</div>
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

export default connect(mapStateToProps, {updateAdmin})(Login);
