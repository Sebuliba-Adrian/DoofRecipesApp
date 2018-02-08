import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../logo';
import Message from '../message';
import LineWithText from './line-with-text';
import Footer from './footer';
import { APIUrl } from '../../App';
import axios from 'axios';

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = this.getDefaultState();
    }

    onInputChange = ({ target }) => {
        this.setState({
            [target.name]: target.value,
        });
    }

    getDefaultState = () => ({
        registered: false,
        message: null,
        username: '',
        email: '',
        password: ''
    })

    submitUserDetails = (event) => {

        event.preventDefault();
        this.registerUser();
    }

    registerUser = () => {
        this.setState({
            message: 'Trying to register...'
        });

        const { username, email, password } = this.state

        axios.post(`${APIUrl}auth/register`, { username, password, email })
            .then((response) => {
                this.setState({
                    registered: true,
                    message: 'Account created. Please login to proceed.',
                });
            })
            .catch((error) => {
                if (error) {

                    let key = Object.keys(error.response.data.message)[0];
                    switch (key) {
                        case "username":
                            let message = error.response.data.message.username;
                            this.setState({
                                message: "Oops! "+ message,
                            });
                            break;
                        case "password":
                            let message1 = error.response.data.message.password;
                            this.setState({
                                message: "Oops! password " + message1,
                            });
                            break;
                        case "email":
                            let message2 = error.response.data.message.email;
                            this.setState({
                                message: "Oops! email " + message2,
                            });
                            break;
                        default:
                            this.setState({
                                message: 'An error occured please try again',
                            });
                    }

                }




            });


    }



    render() {
        if (this.state.registered) {
            return <Redirect to={{ pathname: '/login', data: { message: this.state.message } }} />;
        }
        return (
            <div className="col-md-4 offset-md-4 col-xs-10 offset-xs-2">
                <div className="card mt-5 p-5">
                    <div className="card-block">
                        <Logo />
                        <LineWithText lineText="REGISTER" />
                        {this.state.message != null &&
                            <Message
                                message={this.state.message}
                            />
                        }
                        <form onSubmit={this.submitUserDetails}>

                            <input
                                type="text"
                                className="form-control mb-1"
                                placeholder="Username"
                                name="username"
                                value={this.state.username}
                                onChange={this.onInputChange}
                                required
                            />
                            <input
                                type="email"
                                className="form-control mb-1"
                                placeholder="Email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onInputChange}
                                required
                            />
                            <input
                                type="password"
                                className="form-control mb-1"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onInputChange}
                                required
                            />

                            <button className="btn btn-primary btn-sm col-md-12"
                                type="submit">Submit</button>
                        </form>

                    </div>
                </div>
                <Footer message="Have an account? " link="/login" linkText="Log in" />
            </div>);
    }
}
