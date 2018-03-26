import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Logo from '../logo';
import Message from '../message';
import LineWithText from './lineWithText';
import Footer from './footer';
import { APIUrl } from '../../App';

export default class LoginPage extends Component {
  /**
  * Initialize state in the constructor
  */
  constructor(props) {
    super(props);
    let isLoggedIn = false;
    let message = null;
    if (localStorage.getItem('token') != null) {
      isLoggedIn = true;
    }
    if (this.props.location.data != null) {
      message = this.props.location.data.message;
    }
    this.state = {
      message: '', isLoggedIn, username: '', password: '',
    };
  }
  
  //This lifecycle hook calls a snackbar notification when the user initially logins in successfully
  componentDidMount() {
    this.showSnackbar();
  }
  
  
  /**
  * This lifecycle hook calls a snackbar notifiaction whenever a user performs any CRUD operation 
  * from the dashboard which causes a change in component state
  */
  componentDidUpdate() {
    this.showSnackbar();
  }
  
  /*
  *Triggered by the onchange event whevenever user inputs data, which in turn changes the state
  * @param {target} represents the input field on which the interactions are taiking place
  * */
  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };
  
  /*
  *Triggered by the onSubmit event whevenever user submits the form
  * @param (event) represents the event object
  * */
  submitUserCredentials = (event) => {
    event.preventDefault();
    this.loginUser();
  };
  
  /*
  *Called by the submitUserCredentials to do an api POST request to login a user
  * */
  loginUser = () => {
    this.setState({
      message: 'Trying to login...',
    });

    const { username, password } = this.state;
    //Makes an api POST request to login a user to the application
    axios
      .post(`${APIUrl}auth/login`, {
        username,
        password,
      })
      .then((response) => {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('username', this.state.username);
        this.setState({
          isLoggedIn: true,
          message: '',
          password: '',
        });

        this.setState({
          message: 'Login Successful',
        });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            message: error.response.data.message,
          });
        }
      });
  };
  //This method is called whenever the user attempts to login by showing them the appropriate notifucation message
  showSnackbar() {
    if (this.state.message && !this.state.isLoggedIn && this.previousMessage
    !== this.state.message) {
      this.previousMessage = this.state.message;
      if (this.snackbar) {
        this.snackbar.className = 'show';
        this.snackbar.innerHTML = this.state.message;
        setTimeout(() => {
          if (this.snackbar) {
            this.snackbar.className = this.snackbar.className.replace('show', '');
          }
        }, 3000);
      }
    }
  }
  render() {
    //If the user is successfuly logged in, they are redirected to the dashboard
    if (this.state.isLoggedIn) {
      this.props.history.replace('/dashboard');
    }
    return <div className="App ">
        <div className="row">
          <div className="col-md-4 offset-md-4 col-xs-10 offset-xs-2">
            <div className="card mt-5 p-4">
              <div className="card-block">
                <Logo />
                <LineWithText lineText="LOGIN" />
                {this.state.message && <Message message={this.state.message} />}
                <form onSubmit={this.submitUserCredentials}>
                  <input type="text" className="form-control mb-1" id="username" placeholder="Username" name="username" value={this.state.username} onChange={this.onInputChange} required />
                  <input className="form-control mb-2" id="password" type="password" name="password" value={this.state.password} onChange={this.onInputChange} placeholder="Password" required />
                  <button id='submit' className="btn btn-primary btn-sm col-md-12" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <Footer message="Don't have an account? " link="/registration" linkText="Register" />
            <div id="snackbar" ref={snackbar => {
                this.snackbar = snackbar;
              }} />
          </div>
        </div>
      </div>;
    

  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
