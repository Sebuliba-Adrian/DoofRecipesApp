import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "./navigation";
import Message from "./message";
import Categories from "./categories/categories";
import Recipes from "./recipes/recipes";
import { APIUrl } from "../App";
import axios from "axios";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      showing: "categories",
      message: null,
      categories: [],
      selectedCategory: null,
      recipes: []
    };
    if (this.state.token) {
      this.request("getCategories", "categories", "GET");
    }
  }

  componentDidMount() {
    axios.interceptors.request.use(config => {
      const token = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${this.state.token}`;
      return config;
    });
    axios
      .get(`${APIUrl}categories`)
      .then(res => {
        const { categories } = res.data;

        this.setState({ categories: categories });

        //     });
      })
      .catch(error => {
        this.setState({
          message:
            "You don't have any categories. Use the above button to add some.",
          categories: null
        });
      });
  }

  viewRecipes = selectedCategory => {
    this.setState({
      showing: "recipes",
      selectedCategory
    });
    this.request(
      "getRecipes",
      `categories/${selectedCategory.id}/recipes`,
      "GET"
    );
  };

  viewCategories = () => {
    this.request("getCategories", "categories", "GET");
    this.setState({
      showing: "categories",
      recipes: null,
      selectedCategory: null
    });
  };

  search = searchTerm => {
    if (searchTerm.length > 0) {
      this.request(
        "searchCategories",
        `categories?q=${searchTerm.substring(2)}`,
        "GET"
      );
    }
  };

  request = (action, urlEndPoint, requestMethod, requestBody) => {
    this.setState({ message: "Processing..." });
    if (action === "getCategory") {
      return axios
        .get(`${APIUrl}categories`)
        .then(response => {
          const { categories } = response.data;
          console.log(categories);

          this.setState({ message: null, categories: categories });

          //     });
        })
        .catch(function(error) {
          this.setState({
            message:
              "You don't have any categories. Use the above button to add some.",
            categories: null
          });
        });
    } else if (action === "searchCategories") {
      return axios
        .get(`${APIUrl}${urlEndPoint}`)
        .then(response => {
          const { categories } = response.data;
          console.log(categories);

          this.setState({ message: null, categories: categories });

          //     });
        })
        .catch(error => {
          this.setState({
            message: error.response.data.message,
            categories: null
          });
        });
    } else if (action === "addCategory") {
      const { name, description } = requestBody;

      return axios
        .post(`${APIUrl}${urlEndPoint}`, { name, description })
        .then(response => {
          let stateCopy = [
            ...this.state.categories,
            Object.assign({}, response.data)
          ];

          this.setState({
            categories: stateCopy,
            message: response.data.message
          });
          this.componentDidMount();
        })
        .catch(error => {
          if (error.response && error.response.data) {
            this.setState({
              message: error.response.data.message
            });
          }
        });
    } else if (action === "updateCategory") {
      const { name, description } = requestBody;

      return axios
        .put(`${APIUrl}${urlEndPoint}`, { name, description })
        .then(
          function(response) {
            let categoriesCopy = [...this.state.categories];
            //Find index of specific object using findIndex method.
            const objIndex = categoriesCopy.findIndex(
              category => category.id == requestBody.id
            );

            categoriesCopy[objIndex].name = requestBody.name;
            categoriesCopy[objIndex].description = requestBody.description;

            this.setState({
              message: response.data.message,
              categories: categoriesCopy
            });
            console.log(this.state.recipes);
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    } else if (action === "deleteCategory") {
      return axios.delete(`${APIUrl}${urlEndPoint}`).then(response => {
        const stateCopy = [...this.state.categories];
        //Find index of specific object using findIndex method.
        const objIndex = stateCopy.findIndex(
          category =>
            category.id ==
            parseInt(
              urlEndPoint.substring(urlEndPoint.lastIndexOf("/") + 1),
              10
            )
        );

        stateCopy.splice(objIndex, 1);

        this.setState({
          message: response.data.message,
          categories: stateCopy
        });
        this.componentDidMount();
      });
    } else if (action === "logoutUser") {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.setState({
        message: "Logged out successfully.",
        token: null
      });
    } else if (action === "getRecipes") {
      return axios
        .get(`${APIUrl}${urlEndPoint}`)
        .then(res => {
          const { recipes } = res.data;

          this.setState({
            message: null,
            recipes: recipes
          });
        })
        .catch(error => {
          this.setState({
            message:
              "You don't have any recipes in this category. Use the add button above to add some.",
            recipes: []
          });
        });
    } else if (action === "addRecipe") {
      const { name, description } = requestBody;

      return axios
        .post(`${APIUrl}${urlEndPoint}`, { name, description })
        .then(response => {
          let stateCopy = [
            ...this.state.recipes,
            Object.assign({}, response.data)
          ];

          this.setState({
            recipes: stateCopy,
            message: response.data.message
          });
        })
        .catch(error => {
          if (error.response && error.response.data) {
            this.setState({ message: error.response.data.message });
          }
        });
    } else if (action === "updateRecipe") {
      const { name, description } = requestBody;

      return axios
        .put(`${APIUrl}${urlEndPoint}`, { name, description })
        .then(
          function(response) {
            let recipesCopy = [...this.state.recipes];
            //Find index of specific object using findIndex method.
            const objIndex = recipesCopy.findIndex(
              recipe => recipe.id == requestBody.id
            );

            recipesCopy[objIndex].name = requestBody.name;
            recipesCopy[objIndex].description = requestBody.description;

            this.setState({
              message: response.data.message,
              recipes: recipesCopy
            });
            console.log(this.state);
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    } else if (action === "deleteRecipe") {
      return axios.delete(`${APIUrl}${urlEndPoint}`).then(response => {
        const stateCopy = [...this.state.recipes];
        //Find index of specific object using findIndex method.
        const objIndex = stateCopy.findIndex(
          recipe =>
            recipe.id ==
            parseInt(
              urlEndPoint.substring(urlEndPoint.lastIndexOf("/") + 1),
              10
            )
        );

        stateCopy.splice(objIndex, 1);

        this.setState({
          message: response.data.message,
          recipes: stateCopy
        });
      });
    }
  };

  render() {
    if (!this.state.token) {
      return (
        <Redirect
          to={{ pathname: "/", data: { message: this.state.message } }}
        />
      );
    }
    return (
      <div>
        <div className="custom-navbar bg-cool-blue">
          <NavBar
            request={this.request}
            viewCategories={this.viewCategories}
            search={this.search}
          />
        </div>
        {this.state != null &&
          this.state.message && <Message message={this.state.message} />}
        {this.state.showing === "categories" ? (
          <Categories
            categories={this.state.categories}
            request={this.request}
            viewRecipes={this.viewRecipes}
          />
        ) : (
          <Recipes
            selectedCategory={this.state.selectedCategory}
            recipes={this.state.recipes}
            request={this.request}
            viewCategories={this.viewCategories}
          />
        )}
      </div>
    );
  }
}
