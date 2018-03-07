import React from "react";
import DateDisplay from "../display-date";
import RecipeModal from "./recipe-modal";
import ConfirmDelete from "../confirm-delete";

export default function Recipe(props) {
  return (
    <div>
      <div className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="container">
          <div className="row">
            <div className="col-md-2 hidden-sm-down">
              <DateDisplay date={props.recipe.date_created} />
            </div>
            <div className="col-md-10 item-data">
              <div className="d-flex w-100 justify-content-between">
                <div>
                  <div
                    className="fa fa-lg fa-pencil-square-o mr-2"
                    data-toggle="modal"
                    data-backdrop="static"
                    data-keyboard="false"
                    data-target={`#${props.recipe.id}`}
                  />
                  <div
                    className="fa fa-lg fa-trash-o ml-2"
                    data-toggle="modal"
                    data-backdrop="static"
                    data-keyboard="false"
                    data-target={`#deleteRecipeModel${props.recipe.id}`}
                  />
                </div>
              </div>
              <h5 className="mb-1 text-cool-blue">{props.recipe.name}</h5>
              <h6 className="text-muted">{props.recipe.description}</h6>
              <div>
                {props.recipe.date_modified && (
                  <small className="text-muted">
                    <strong>Updated: </strong>
                    {props.recipe.date_modified.substring(4)}
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecipeModal
        title="Edit a recipe"
        action="Submit"
        theId={props.recipe.id}
        recipe={props.recipe}
        selectedCategory={props.selectedCategory}
        request={props.request}
      />
      <ConfirmDelete
        theId={`deleteRecipeModel${props.recipe.id}`}
        recipe={props.recipe}
        selectedCategory={props.selectedCategory}
        request={props.request}
      />
    </div>
  );
}
