import React, { Component } from "react";
import Logo from "../logo";
import Message from "../message";
import LineWithText from "./line-with-text";
import Footer from "./footer";
import { APIUrl } from "../../App";
import axios from "axios";

export default class LoginPage extends Component {
                 constructor(props) {
                   super(props);
                   let isLoggedIn = false;
                   let message = null;
                   if (localStorage.getItem("token") != null) {
                     isLoggedIn = true;
                   }
                   if (this.props.location.data != null) {
                     message = this.props.location.data.message;
                   }
                   this.state = { message: "", isLoggedIn, username: "", password: "" };
                 }

                 componentDidMount() {
                   this.showSnackbar();
                 }

                 componentDidUpdate() {
                   this.showSnackbar();
                 }

                 onInputChange = ({ target }) => {
                   this.setState({
                     [target.name]: target.value
                   });
                 };

                 submitUserCredentials = event => {
                   event.preventDefault();
                   this.loginUser();
                 };

                 loginUser = () => {
                   this.setState({
                     message: "Trying to login..."
                   });

                   const { username, password } = this.state;
                   axios
                     .post(`${APIUrl}auth/login`, {
                       username,
                       password
                     })
                     .then(response => {
                       localStorage.setItem("token", response.data.access_token);
                       localStorage.setItem("username", this.state.username);
                       this.setState({
                         isLoggedIn: true,
                         message: "",
                         password: ""
                       });

                       this.setState({
                         message: "Login Successful"
                       });
                     })
                     .catch(error => {
                       if (error.response) {
                         this.setState({
                           message: error.response.data.message
                         });
                       }
                     });
                 };

                 showSnackbar() {
                   if (this.state.message && !this.state.isLoggedIn && this.previousMessage !== this.state.message) {
                     this.previousMessage = this.state.message;
                     if (this.snackbar) {
                       this.snackbar.className = "show";
                       this.snackbar.innerHTML = this.state.message;
                       setTimeout(() => {
                         if (this.snackbar) {
                           this.snackbar.className = this.snackbar.className.replace("show", "");
                         }
                       }, 3000);
                     }
                   }
                 }
                 render() {
                   if (this.state.isLoggedIn) {
                     this.props.history.replace("/dashboard");
                   }
                   return <div className="col-md-4 offset-md-4 col-xs-10 offset-xs-2">
                       <div className="card mt-5 p-4">
                         <div className="card-block">
                           <Logo />
                           <LineWithText lineText="LOGIN" />
                           {this.state.message && <Message message={this.state.message} />}
                           <form onSubmit={this.submitUserCredentials}>
                             <input type="text" className="form-control mb-1" placeholder="Username" name="username" value={this.state.username} onChange={this.onInputChange} required />
                             <input className="form-control mb-2" type="password" name="password" value={this.state.password} onChange={this.onInputChange} placeholder="Password" required />
                             <button className="btn btn-primary btn-sm col-md-12" type="submit">
                               Submit
                             </button>
                           </form>
                         </div>
                       </div>
                       <Footer message="Don't have an account? " link="/registration" linkText="Register" />
                        <div id="snackbar" ref={(snackbar) => { this.snackbar = snackbar; }} />
                     </div>;
                 }
               }
