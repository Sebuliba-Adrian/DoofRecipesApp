import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../navigation';
import { APIUrl } from '../../App';
import Message from '../message';
import CategoryModal from './category-modal';
import Category from './category';
import axios from 'axios';

export default class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            categories: null,
            message: null,
        };
        // if (this.state.token !== null) {

        //     console.log(this.state.token);
        //     this.categoryTransaction('getCategories', 'categories', 'GET');
        // }
    }

    logoutUser = () => {
        this.categoryTransaction('logoutUser', 'logout', 'GET');
    }

    componentDidMount(){

        axios.interceptors.request.use(config => {
          const token = localStorage.getItem("token");
          config.headers.Authorization = `Bearer ${this.state.token}`;
          return config;
        });
        axios
          .get(`${APIUrl}categories`)
          .then(res => {
            const returns = res.data;
            console.log(returns);

            this.setState({ message: null, categories: returns });

            //     });
          })
          .catch(function(error) {
            this.setState({
              message:
                "You don't have any categories. Use the above button to add some.",
              categories: null
            });
          });
    }
    categoryTransaction = (action, urlEndPoint, requestMethod, requestBody) => {
        this.setState({
            message: 'Processing...',
        });

        switch (requestMethod) {

    
            case "POST": {
                console.log("This is a post request in action")
                const { name, description } = requestBody;

                axios.post(`${APIUrl}${urlEndPoint}`, { name, description })
                    .then((response) => {
                        console.log("xxxxxxxx" + response.data.message)
                        const stateCopy = Object.assign({}, this.state.categories);
                        stateCopy.categories = [...Object.values(this.state.categories)[0], response.data]


                        this.setState({
                            categories: stateCopy,
                            message: response.data.message
                        });
                    })
                    .catch((error) => {
                        if (error.response && error.response.data) {
                            this.setState({
                                message: error.response.data.message,
                            });
                        }
                    });}
                break;

            case "PUT": {
                const { name, description } = requestBody;
                

                axios.put(`${APIUrl}${urlEndPoint}`, { name, description })
                    .then(function (response) {
                        
                        const stateCopy = Object.assign({}, this.state.categories);
                        //Find index of specific object using findIndex method.    
                        const objIndex = stateCopy.categories.findIndex(category => category.id == requestBody.id);
                       
                        stateCopy.categories[objIndex].name=requestBody.name;
                        stateCopy.categories[objIndex].description = requestBody.description;
                           
                        
                        this.setState({
                            message: 'Category successfully updated.',
                            categories: stateCopy,
                        });
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error)
                    });
                             }
                break;

            case "DELETE":
            
                axios.delete(`${APIUrl}${urlEndPoint}`)
                  .then(res => {
                    
                    const stateCopy = Object.assign({}, this.state.categories);
                    //Find index of specific object using findIndex method.
                    const objIndex = stateCopy.categories.findIndex(category => category.id ==parseInt(urlEndPoint.substring(urlEndPoint.lastIndexOf("/") + 1), 10));
                    stateCopy.categories.splice(objIndex, 1);
                    debugger;

                    this.setState({
                        message:"Category successfully deleted.",
                        categories: stateCopy
                    });
                  });

                break;



            default:

                localStorage.removeItem('token');
                localStorage.removeItem('username');
                this.setState({
                    message: 'You have successfully logged out.',
                });
                break;







        }

    }

    categoryRow = (category, index) => {

        return (
            <Category
                key={category.id}
                category={category}
                setActiveCategory={this.setActiveCategory}
                categoryTransaction={this.categoryTransaction}
            />);

    }

    search(){
     
        alert("this.refs.keyword.value"); 

    }




    render() {
        const { categories, message } = this.state;
        if (!this.state.token) {
            return <Redirect to={{ pathname: '/login', data: { message: message } }} />;
        }
        return (
            <div>
                <div className="custom-navbar">
                    <NavBar search={this.search} logoutUser={this.logoutUser} />
                </div>
                <div className="container">
                    <div className="card mt-3 mb-3">
                        <div className="card-block">
                            <div className="d-flex w-100 justify-content-between mb-2">
                                <p />
                                <button
                                    className="btn btn-sm btn-primary col-xs-12"
                                    data-toggle="modal"
                                    data-target="#addCategoryModal"
                                ><span className="fa fa-plus pull-left" /> Add category</button>
                            </div>
                            {
                                this.state != null && message &&
                                <Message
                                    message={message}
                                />
                            }
                            {
                                this.state && categories && categories.length !== 0 &&
                                <div>
                                    <h6 className="card-text ml-4 pb-2">
                                        Categories <small className="text-muted">select to view details</small>
                                    </h6>
                                    <ul className="list-group list-group-flush">
                                        {categories.categories.map(this.categoryRow)}
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <CategoryModal
                    title="Create a category"
                    action="Submit"
                    theId="addCategoryModal"
                    categoryTransaction={this.categoryTransaction}
                />
            </div>
        );
    }
}
