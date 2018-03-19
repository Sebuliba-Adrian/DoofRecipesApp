import React, { Component } from 'react';
import axios from 'axios';
import Logo from '../logo';
import Message from '../message';
import LineWithText from './lineWithText';
import Footer from './footer';
import { APIUrl } from '../../App';
import InlineError from './InLineError';


export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }
  
  /**
  * This lifecycle hook calls a snackbar notifiction whenever a user performs any CRUD operation 
  * from the dashboard which causes a change in component state
  */
  componentDidUpdate() {
    if (this.state.message && !this.state.registered && this.previousMessage !==
      this.state.message) {
      this.previousMessage = this.state.message;
      this.snackbar.className = 'show';
      this.snackbar.innerHTML = this.state.message;
      setTimeout(() => {
        if (this.snackbar) {
          this.snackbar.className = this.snackbar.className.replace('show', '');
        }
      }, 3000);
    }
  }

  /*
  *Triggered by the onchange event whevenever user inputs data, which in turn changes the state
  * @param {target} represents the input field on which the interactions are taking place
  * */
  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });

  };
/*
*This is a helper method for password validation
* @param {password} password field
* @param {confm_password} confirm password field
* */
validate = (password, confm_password) => {
   const errors = {};

  if (password !== confm_password) errors.password = "Passwords do not match";
  return errors;
};
  
//This method initializes state
  getDefaultState = () => ({
    registered: false, message: null, username: '', email: '', password: '', confm_password:'', errors: {},
  });

 //This method is used to submit user details from the registration form
  submitUserDetails = (event) => {
    const{password, confm_password} = this.state;
    const errors = this.validate(password, confm_password);
    this.setState({ errors });
    event.preventDefault();
    if(Object.keys(errors).length === 0) this.registerUser();
  };
  
  //This is a hlaper method to perform an api call to register a new user
  registerUser = () => {
    this.setState({
      message: 'Trying to register...',
    });

    const { username, email, password } = this.state;
    //An POST api call to register a new user
    axios
      .post(`${APIUrl}auth/register`, {
        username,
        password,
        email,
      })
      .then((response) => {
        this.setState({
          registered: true,
          message:
            'Account created. Please login to proceed.',
        });
      })
      .catch((error) => {
        if (error.response) {
          const key = Object.keys(error.response.data.message)[0];
          switch (key) {
            case 'username':
              const message = error.response.data.message.username;
              this.setState({
                message: 'Oops! ' + message,
              });
              break;
            case 'password':
              const message1 = error.response.data.message.password;
              this.setState({
                message:
                  'Oops! password ' + message1,
              });
              break;
            case 'email':
              const message2 = error.response.data.message.email;
              this.setState({
                message: 'Oops! email ' + message2,
              });
              break;
            default:
              this.setState({
                message:
                  'An error occured please try again',
              });
          }
        }
      });
  };

  render() {
    const{errors} = this.state;
    //If user is successfully registered, redirect to login page 
    if (this.state.registered) {
      this.props.history.replace('/login', {
        message: this.state.message,
      });
    }
    return <div className="App ">
        <div className="row">
          <div className="col-md-4 offset-md-4 col-xs-10 offset-xs-2 ">
            <div className="card mt-5 p-5">
              <div className="card-block">
                <Logo />
                <LineWithText lineText="REGISTER" />
                {this.state.message != null && <Message message={this.state.message} />}
                <form onSubmit={this.submitUserDetails}>
                  <input type="text" id="username" className="form-control mb-1" placeholder="Username" name="username" value={this.state.username} onChange={this.onInputChange} required />
                  <input type="email" id="email" className="form-control mb-1" placeholder="Email" name="email" value={this.state.email} onChange={this.onInputChange} required />
                  <input type="password" id="password" className="form-control mb-1" placeholder="Password" name="password" value={this.state.password} onChange={this.onInputChange}  required />
                  {errors.password && <InlineError text={errors.password} />}
                  <span>
                    <div className="help-tip">
                      <p>
                        Ensure that the password has atleast 2 unique
                        special characters, numbers, and atleast 1 lowercase
                        and an uppercase character
                      </p>
                    </div>
                  </span>
                  <input type="password" id="confirm_password" className="form-control mb-1" placeholder="Confirm password" name="confm_password" value={this.state.confirmpassword} onChange={this.onInputChange} required />
                  {errors.password && <InlineError text={errors.password} />}
                  <button className="btn btn-primary btn-sm col-md-12" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <Footer message="Have an account? " link="/login" linkText="Log in" />
            <div id="snackbar" ref={snackbar => {
                this.snackbar = snackbar;
              }} />
          </div>
        </div>
      </div>;
  }
}
