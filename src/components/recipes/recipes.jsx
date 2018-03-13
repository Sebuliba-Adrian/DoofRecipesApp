import React, { Component } from 'react';
import RecipeModal from './recipe-modal';
import Recipe from './recipe';

export default class Recipes extends Component {
  constructor(props) {
    super(props);

    this.handleNavPrev = this.handleNavPrev.bind(this);
    this.handleNavNext = this.handleNavNext.bind(this);
    // this.handleInput = this.handleInput.bind(this);
  }
  handleNavPrev(event) {
    event.preventDefault();
    this.props.onNavigate(this.props.prev);
  }

  handleNavNext(event) {
    event.preventDefault();
    this.props.onNavigate(this.props.next);
  }

  render() {
    const { recipes, selectedCategory, request, next, prev,
    } = this.props;

    const recipelist = recipes.map(recipe => (
      <Recipe
        key={recipe.id}
        recipe={recipe}
        request={request}
        selectedCategory={selectedCategory}
      />
    ));

    const navLinks = [];
    if (prev !== 'None' && prev !== '') {
      navLinks.push(
        <li key={0} className="page-item">
          <button className="page-link" tabIndex="-1" onClick={this.handleNavPrev}>
              &lt; &lt; Previous
          </button>
        </li>);
    }
    if (next !== 'None' && next !== '') {
      navLinks.push(
        <li key={1} className="page-item">
          <button className="page-link" tabIndex="-1" onClick={this.handleNavNext}>
            Next &gt; &gt;
          </button>
        </li>);
    }

    return (
      <div>
        <div className="container items-container">
          <div className="card mt-3 mb-3">
            <div className="card-block">
              <div className="d-flex w-100 justify-content-between mb-2">
                <button
                  className="btn btn-sm btn-cool-blue col-xs-12"
                  data-toggle="modal"
                  data-target="#addRecipeModal"
                >
                  <span className="fa fa-plus pull-left" /> Add Recipe
                </button>
              </div>
              <nav aria-label="...">
                <ul className="pagination pagination-lg">{navLinks}</ul>
              </nav>
              {!recipes ?
                <div>
                  <h6 className="card-text ml-4 pb-2 text-center text-cool-blue">
                  Select a category to view it's recipes
                  </h6>
              ) : recipes.length === 0 ? (
                  <h6 className="card-text ml-4 pb-2 text-center text-cool-blue">
                  No recipes in {selectedCategory.name}
                  </h6>
                </div>
               : (
                 <div>
                   <h6 className="card-text ml-4 pb-2 text-center text-cool-blue">
                    Recipes in {selectedCategory.name}
                   </h6>
                   <div className="container">
                     <div className="row">{recipelist}</div>
                   </div>
                 </div>
              )}
            </div>
          </div>
        </div>
        <RecipeModal
          title="Create a recipe"
          action="Submit"
          theId="addRecipeModal"
          request={request}
          selectedCategory={selectedCategory}
        />
      </div>
    );
  }
}
