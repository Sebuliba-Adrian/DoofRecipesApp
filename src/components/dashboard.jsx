import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import NavBar from './navigation';
import Categories from './categories/categories';
import Recipes from './recipes/recipes';
import { APIUrl } from '../App';

import LoadingSpinner from './loadingSpinner';

export default class Dashboard extends Component {
  /**
  * Initialize state in the constructor
  */
  constructor(props) {
    super(props);

    this.previousMessage = '';
    this.state = {
      token: localStorage.getItem('token'),
      message: 'Processing...',
      categories: [],
      selectedCategory: {},
      recipes: [],
      pageSize: 4,
      pages: 0,
      count: 0,
      total: 0,
      next: '',
      prev: '',
      recnext: '',
      recprev: '',
      isLoading: false,
    };
  }

  /*
  * Loads/fetches data from the Api after mounting component
  * */
  componentDidMount() {
    if (this.state.token) {
      this.request('getCategories', 'categories', 'GET');
    }
  }
  
  /*
  * Displays message in snackbar whenever component state changes
  * */
  componentDidUpdate() {
    if (
      this.state.message !== '' &&
      this.state.token &&
      this.previousMessage !== this.state.message
    ) {
      this.previousMessage = this.state.message;
      if (this.snackbar) {
        this.snackbar.className = 'show';
        this.snackbar.innerHTML = this.state.message;
        setTimeout(() => {
          this.snackbar.className = this.snackbar.className.replace('show', '');
        }, 3000);
      }
    }
  }
  
  /*
  * Navigates through the categories on every click
  * @param (navUri) when previous or next categories exist
  * */
  onNavigateCategories(navUri) {
    this.request('navigateCategories', navUri, 'GET');
  }

  /*
  * Navigates through the recipes on every click
  * @param (navUri) when previous or next recipes exist
  * */
  onNavigateRecipes(navUri) {
    this.request('navigateRecipes', navUri, 'GET');
  }

  loadFromServer(pageSize) {
    this.request('getCategories', `categories?limit=${pageSize}`, 'GET');
  }

  /*
  * Displays the recipes present for each category clicked
  * @param (selectedCategory) selected category
  * */
  viewRecipes = (selectedCategory) => {
    this.setState({
      selectedCategory,
      message: '',
      recipes: [],
      recnext: '',
      recprev: '',
    });
    
    /*
    * Does an api call to fetch recipes in a particular category
    * @param {getRecipes} an action to get recipes
    * @param {urlEndPoint} url endpoint to the recipes
    * @param {requestMethod} a GET request to the api
    * */
    this.request(
      'getRecipes',
      `categories/${selectedCategory.id}/recipes?limit=${this.state.pageSize}`,
      'GET',
    );
  };
  
  /*
  * Displays the categories after making an api get request
  * */
  viewCategories = () => {
    this.request('getCategories', 'categories', 'GET');
    this.setState({
      recipes: [],
      selectedCategory: {},
    });
  };
  
  /*
  * Seaches through the categories
  * */
  search = (searchTerm) => {
    if (searchTerm.length > 0) {
      this.request(
        'searchCategories',
        `categories?q=${searchTerm.substring(2)}`,
        'GET',
      );
    }
  };

  updatePageSize(pageSize) {
    if (pageSize !== this.state.pageSize) {
      this.loadFromServer(pageSize);
    }
  }

  /*
  * A multipurpose method that does an api call/request
  * @param {action} an action to trigger a particular request
  * @param {urlEndPoint} url endpoint to the resource
  * @param {requestMethod} a GET request to the api
  * @param {requestBody} an optional request body
  * */
  request = (action, urlEndPoint, requestMethod, requestBody) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${
      this.state.token
    }`;
    if (action === 'getCategories') {
      //Make a GET request to get all the categories 
      return axios
        .get(`${APIUrl}categories`)
        .then((response) => {
          const {
            categories,
            count,
            next, prev, pages,
          } = response.data;
          this.setState({
            message: '',
            categories,
            pageSize: count,
            next,
            prev,
            pages,
            isLoading: false,
          });
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            this.setState({
              message: error.response.data.message,
              categories: [],
            });
          }
        });
    } else if (action === 'searchCategories') {
      //Make a GET request to search through the categories
      return axios
        .get(`${APIUrl}${urlEndPoint}`)
        .then((response) => {
          const { categories } = response.data;

          this.setState({
            message: '',
            categories,
          });

        })
        .catch((error) => {
          this.setState({
            message: error.response.data.message,
            categories: [],
          });
        });
    } else if (action === 'navigateCategories') {
      //Make a get request to navigate through the categories
      return axios
        .get(`${urlEndPoint}`)
        .then((response) => {
          const {
            categories, count, prev, next,
          } = response.data;

          this.setState({
            message: '',
            categories,
            pageSize: count,
            prev,
            next,
          });
        })
        .catch((error) => {
           if(error.response){
          this.setState({
            message: error.response.data.message,
            categories: [],
          });
        }
        });
    } else if (action === 'addCategory') {
      const { name, description } = requestBody;
      //Make a post request to add a new category
      return axios
        .post(`${APIUrl}${urlEndPoint}`, {
          name,
          description,
        })
        .then((response) => {
          const stateCopy = [
            ...this.state.categories,
            Object.assign({}, response.data),
          ];

          this.setState({
            categories: stateCopy,
            message: response.data.message,
          });
          this.componentDidMount();
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            this.setState({
              message: error.response.data.message,
            });
          }
        });
    } else if (action === 'updateCategory') {
      const { name, description } = requestBody;
      //Make a put request to update a specific recipe
      return axios
        .put(`${APIUrl}${urlEndPoint}`, {
          name,
          description,
        })
        .then((response) => {
          const categoriesCopy = [...this.state.categories];
          // Find index of specific object using findIndex method.
          const objIndex = categoriesCopy.findIndex(category => category.id === requestBody.id);

          categoriesCopy[objIndex].name = requestBody.name;
          categoriesCopy[objIndex].description = requestBody.description;

          this.setState({
            message: response.data.message,
            categories: categoriesCopy,
          });
        })
        .catch((error) => {
          if (error.response) {
            this.setState({ message: 'Error updating category' });
          }
        });
    } else if (action === 'deleteCategory') {
      //Make a delete request to delete a specific category
      return axios.delete(`${APIUrl}${urlEndPoint}`).then((response) => {
        const {
          categories, prev, next, pages,
        } = this.state;
        const stateCopy = [...categories];
        // Find index of specific object using findIndex method.
        const objIndex = stateCopy.findIndex(category =>
          category.id ===
            parseInt(
              urlEndPoint.substring(urlEndPoint.lastIndexOf('/') + 1),
              10,
            ));

        stateCopy.splice(objIndex, 1);

        this.setState({
          message: response.data.message,
          categories: stateCopy,
          recipes: [],
          next,
          prev,
        });
        
        //Finds the last number on the url's end
        const prevo = prev === 'None' ? 0 : parseInt(prev.match(/\d+$/)[0], 10);
        if (categories.length === 1 && pages !== 1) {
          this.request('getCategories', `categories/?page=${prevo}`, 'GET');
        }
      }).catch((error)=>{
        if(error.response){

        this.setState({
          message:
            "You don't have any recipes in this category. Use the add button above to add some.",
        });

        }
      });
    } else if (action === 'logoutUser') {
      //Clear local storage of the token 
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.setState({
        message: 'Logged out successfully.',
        token: '',
      });
    } else if (action === 'getRecipes') {
      //Make a get request to navigate through all the recipes
      return axios
        .get(`${APIUrl}${urlEndPoint}`)
        .then((response) => {
          const {
            recipes, count, prev, next, total,
          } = response.data;

          this.setState({
            message: '',
            recipes,
            count,
            recprev: prev,
            recnext: next,
            total,
          });
        })
        .catch((error) => {
          if (error.response) {
            this.setState({
              message:
              "You don't have any recipes in this category. Use the add button above to add some.",
              recipes: [],
            });
          }
        });
    } else if (action === 'navigateRecipes') {
      //Make a get request to navigate though the recipes
      return axios
        .get(`${urlEndPoint}`)
        .then((response) => {
          const {
            recipes, count, prev, next,
          } = response.data;
          this.setState({
            message: '',
            recipes,
            pageSize: count,
            recprev: prev,
            recnext: next,
          });
        })
        .catch((error) => {
          if(error.response){
          this.setState({
            message: error.response.data.message,
            categories: [],
          });
        }
        });
    } else if (action === 'addRecipe') {
      const { name, description } = requestBody;
      //make a post request to add new recipes
      return axios
        .post(`${APIUrl}${urlEndPoint}`, {
          name,
          description,
        })
        .then((response) => {
          const stateCopy = [
            ...this.state.recipes,
            Object.assign({}, response.data),
          ];

          this.setState({
            recipes: stateCopy,
            message: response.data.message,
          });

          this.request(
            'getRecipes',
            `categories/${this.state.selectedCategory.id}/recipes?limit=${4}`,
            'GET',
          );
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            this.setState({
              message: error.response.data.message.name,
            });
          }
        });
    } else if (action === 'updateRecipe') {
      const { name, description } = requestBody;
      //Make a put request to update recipes
      return axios
        .put(`${APIUrl}${urlEndPoint}`, {
          name,
          description,
        })
        .then((response) => {
          const recipesCopy = [...this.state.recipes];
          // Find index of specific object using findIndex method.
          const objIndex = recipesCopy.findIndex(recipe => recipe.id === requestBody.id);

          recipesCopy[objIndex].name = requestBody.name;
          recipesCopy[objIndex].description = requestBody.description;

          this.setState({
            message: response.data.message,
            recipes: recipesCopy,
          });
        })
        .catch((error) => {
          if (error.response) {
            this.setState({
              message: 'Error updating recipe',
            });
          }
        });
    } else if (action === 'deleteRecipe') {
      const {
        recipes, recnext, recprev, total, count,
      } = this.state;
      //Make a delete request to delete recipes
      return axios.delete(`${APIUrl}${urlEndPoint}`).then((response) => {
        const stateCopy = [...recipes];
        // Find index of specific object using findIndex method.
        const objIndex = stateCopy.findIndex(recipe => recipe.id === parseInt(
          urlEndPoint.substring(urlEndPoint.lastIndexOf('/') + 1),
          10,
        ));

        stateCopy.splice(objIndex, 1);

        this.setState({
          message: response.data.message,
          recipes: stateCopy,
          recprev,
          recnext,
          total,
          count,
        });

        //This statememt returns the last number on the url endpoint 
        const prevo = recprev === 'None' ? 0 : parseInt(recprev.match(/\d+$/)[0], 10);

        if (recipes.length === 1) {
          this.request(
            'getRecipe',
            `categories/${
              this.state.selectedCategory.id
            }/recipes?page=${prevo}`,
            'GET',
          );
        }
      }).catch((error)=>{
        if(error.response){
          this.setState({ message: "Error deleting recipe" });
        }

      });
    }
  };

  render() {
    const { isLoading } = this.state;
    //Redirect to login page if the token is not available any more
    if (!this.state.token) {
      this.props.history.replace('/login', { message: this.state.message });
    }
    return (
      <div className="row App-dashboard">
      <div className="container-fluid App-dashboard" styles={{ maxWidth: '500px' }}>
        <div className="custom-navbar bg-cool-blue">
          <NavBar
            request={this.request}
            viewCategories={this.viewCategories}
            search={this.search}
          />
        </div>
        <div className="row">
          <div className="col-4 categories">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <Categories
                pageSize={this.state.pageSize}
                next={this.state.next}
                prev={this.state.prev}
                updatePageSize={this.updatePageSize}
                onNavigate={this.onNavigateCategories}
                categories={this.state.categories}
                request={this.request}
                viewRecipes={this.viewRecipes}
              />
            )}
          </div>
          <div className="col-8 recipes">
            <Recipes
              pageSize={this.state.pageSize}
              next={this.state.recnext}
              prev={this.state.recprev}
              updatePageSize={this.updatePageSize}
              onNavigate={this.onNavigateRecipes}
              selectedCategory={this.state.selectedCategory}
              recipes={this.state.recipes}
              request={this.request}
              viewCategories={this.viewCategories}
            />
          </div>
        </div>

        <div
          id="snackbar"
          ref={(snackbar) => {
            this.snackbar = snackbar;
          }}
        />
      </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
