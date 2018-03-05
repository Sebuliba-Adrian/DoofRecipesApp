import React from "react";
import DateDisplay from "../display-date";
import CategoryModal from "./category-modal";
import ConfirmDelete from "../confirm-delete";

export default function Category(props) {
  console.log(props);
  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  function viewRecipes(event) {
    event.preventDefault();
    props.viewRecipes(props.category);
  }

  return (
      <div>
    <a
      href=""
      onClick={viewRecipes}
      className="list-group-item list-group-item-action flex-column align-items-start"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-2 hidden-sm-down">
            <DateDisplay date={props.category.date_created} />
          </div>
          <div className="col-md-10 col-sm-12">
            <div className="d-flex w-100 justify-content-between">
              <div>
                {props.category.date_modified && (
                  <small className="text-muted">
                    <strong>Updated: </strong>
                    {props.category.date_modified.substring(4)}
                  </small>
                )}
              </div>
              <div>
                <div
                  className="fa fa-lg fa-pencil-square-o mr-2"
                  data-toggle="modal"
                  data-target={`#${props.category.id}`}
                  data-backdrop="static"
                  data-keyboard="false"
                  onClick={handleClick}
                />
                <div
                  className="fa fa-lg fa-trash-o ml-2"
                  data-toggle="modal"
                  data-target={`#deleteCategoryModel${props.category.id}`}
                  data-backdrop="static"
                  data-keyboard="false"
                  onClick={handleClick}
                />
              </div>
            </div>
            <br />
            <h4 className="mb-1">{props.category.name}</h4>
            <h6>{props.category.description}</h6>
          </div>
        </div>
      </div>
       </a>
      <CategoryModal
        title="Edit a category"
        action="Submit"
        theId={props.category.id}
        category={props.category}
        request={props.request}
      />
     
      <ConfirmDelete
        theId={`deleteCategoryModel${props.category.id}`}
        category={props.category}
        request={props.request}
      />
      </div>
    
  );
}
