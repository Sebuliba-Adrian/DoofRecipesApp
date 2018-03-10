import React from "react";
import RecipeModal from "./recipe-modal";
import ConfirmDelete from "../confirm-delete";

export default function Recipe(props) {
  return <div className="col-6">
      <div className="card animated zoomIn">
        <div className="card-block">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills text-center">
              <div className="btn-group float-right" role="group" aria-label="Basic example">
                <a href="" className="card-link" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target={`#${props.recipe.id}`}>
                  Edit
                </a>
                <a href="" className="card-link" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target={`#deleteRecipeModel${props.recipe.id}`}>
                  Delete
                </a>
              </div>
            </ul>
          </div>
          <h5 className="card-title">{props.recipe.name}</h5>
          <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>
            {props.recipe.description}
          </p>
        </div>
      </div>

      <RecipeModal title="Edit a recipe" action="Submit" theId={props.recipe.id} recipe={props.recipe} selectedCategory={props.selectedCategory} request={props.request} />
      <ConfirmDelete theId={`deleteRecipeModel${props.recipe.id}`} recipe={props.recipe} selectedCategory={props.selectedCategory} request={props.request} />
    </div>;
}
