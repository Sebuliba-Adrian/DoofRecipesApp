import React from 'react';
import CategoryModal from './categoryModal';
import ConfirmDelete from '../confirmDelete';

export default function Category(props) {
  //This method handles click events when a category in the list has been clicked to prevent page reload
  function handleClick(event) {
    event.preventDefault(); // Prevents page from reloading
  }

  //This method gets recipes  whenever a user clicks on a category in a list
  function viewRecipes(event) { 
    event.preventDefault(); // preveents page from reloading
    props.viewRecipes(props.category); // Prop that takes in the seelected category
  }

  return (
    <div>
      <a
        href="/#"
        onClick={viewRecipes}
        className="list-group-item list-group-item-action flex-column align-items-start animated lightSpeedIn"
      >
        <div className="d-flex w-100 justify-content-between ">
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
              id="edit"
              className="fa fa-lg fa-pencil-square-o mr-2"
              data-toggle="modal"
              data-target={`#${props.category.id}`}
              data-backdrop="static"
              data-keyboard="false"
              onClick={handleClick}
              role="presentation"
            />
            <div
              id="delete"
              className="fa fa-lg fa-trash-o ml-2"
              data-toggle="modal"
              data-target={`#deleteCategoryModel${props.category.id}`}
              data-backdrop="static"
              data-keyboard="false"
              onClick={handleClick}
              role="presentation"
            />
          </div>
        </div>
        <br />
        <h4 className="mb-1">{props.category.name}</h4>
        <p className="mb-1">{props.category.description}</p>
        <small className="text-muted">
          <strong>Created: </strong>
          {props.category.date_created.substring(4)}
        </small>
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
