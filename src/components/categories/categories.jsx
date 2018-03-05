import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../navigation";
import { APIUrl } from "../../App";
import Message from "../message";
import CategoryModal from "./category-modal";
import Category from "./category";

export default function Categories(props) {


  return (
    <div>
      <div className="container">
        <div className="card mt-3 mb-3">
          <div className="card-block">
            <div className="d-flex w-100 justify-content-between mb-2">
              <p />
              <button
                className="btn btn-sm btn-primary col-xs-12"
                data-toggle="modal"
                data-target="#addCategoryModal"
              >
                <span className="fa fa-plus pull-left" /> Add category
              </button>
            </div>
            {props.categories &&
              props.categories.length !== 0 && (
                <div>
                  <h6 className="card-text ml-4 pb-2">
                    Categories{" "}
                    <small className="text-muted">select to view details</small>
                  </h6>
                  <ul className="list-group list-group-flush">
                    {props.categories.map(category => (
                        
                      <Category
                        key={category.id}
                        category={category}
                        request={props.request}
                        viewRecipes={props.viewRecipes}
                      />
                    )) }
                  </ul>
                </div>
              )}
          </div>
        </div>
      </div>
      <CategoryModal
        title="Create a category"
        action="Submit"
        theId="addCategoryModal"
        request={props.request}
      />
    </div>
  );
}
