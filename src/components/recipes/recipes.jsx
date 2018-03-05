import React from "react";
import RecipeModal from "./recipe-modal";
import Recipe from "./recipe";

export default function Recipes(props) {
  return <div>
      <div className="container items-container">
        <div className="card mt-3 mb-3">
          <div className="card-block">
            <div className="d-flex w-100 justify-content-between mb-2">
              <h5>  </h5>
              <button className="btn btn-sm btn-cool-blue col-xs-12" data-toggle="modal" data-target="#addRecipeModal">
                <span className="fa fa-plus pull-left" /> Add Recipe
              </button>
            </div>
            <nav className="ml-4">
              <ul className="pagination pagination-sm">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabIndex="-1">
                    Previous
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
            {!props.recipes ? <h6 className="card-text ml-4 pb-2 text-center text-cool-blue">
                Select a category to view it's recipes
              </h6> : props.recipes.length === 0 ? <h6 className="card-text ml-4 pb-2 text-center text-cool-blue">
                No recipes in {props.selectedCategory.name}
              </h6> : <div>
                <h6 className="card-text ml-4 pb-2 text-center text-cool-blue">
                  Recipes in {props.selectedCategory.name}
                </h6>
                <ul className="list-group list-group-flush">
                  {props.recipes.map(recipe => (
                    <Recipe
                      key={recipe.id}
                      recipe={recipe}
                      request={props.request}
                      selectedCategory={props.selectedCategory}
                    />
                  ))}
                </ul>
              </div>}
          </div>
        </div>
      </div>
      <RecipeModal title="Create a recipe" action="Submit" theId="addRecipeModal" request={props.request} selectedCategory={props.selectedCategory} />
    </div>;
}
