import React, { Component } from 'react';
import axios from 'axios';
import Logo from '../logo';
import Message from '../message';
import LineWithText from './line-with-text';
import Footer from './footer';
import { APIUrl } from '../../App';


export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

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

                 onInputChange = ({ target }) => {
                   this.setState({
                     [target.name]: target.value,
                   });
                 };

                 getDefaultState = () => ({
                   registered: false, message: null, username: '', email: '', password: '',
                 });

                 submitUserDetails = (event) => {
                   event.preventDefault();
                   this.registerUser();
                 };

                 registerUser = () => {
                   this.setState({
                     message: 'Trying to register...',
                   });

                   const { username, email, password } = this.state;

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
                                 <input type="password" id="password" className="form-control mb-1" placeholder="Password" name="password" value={this.state.password} onChange={this.onInputChange} required />

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
