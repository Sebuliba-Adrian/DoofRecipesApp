import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import NavBar from "../navigation";
import { APIUrl } from "../../App";
import Message from "../message";
import CategoryModal from "./category-modal";
import Category from "./category";

export default class Categories extends Component {
  constructor(props) {
    super(props);
    
    this.handleNavPrev = this.handleNavPrev.bind(this);
    this.handleNavNext = this.handleNavNext.bind(this);
    
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    event.preventDefault();
    var pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
    if (/^[0-9]+$/.test(pageSize)) {
      this.props.updatePageSize(pageSize);
    } else {
      ReactDOM.findDOMNode(this.refs.pageSize).value = pageSize.substring(
        0,
        pageSize.length - 1
      );
    }
  }
  // end::handle-page-size-updates[]

  // tag::handle-nav[]


  handleNavPrev(event) {
    event.preventDefault();
    this.props.onNavigate(this.props.prev);
  }

  handleNavNext(event) {
    event.preventDefault();
    this.props.onNavigate(this.props.next);
  }

  
  
  render() {
    const {
      categories,
      request,
      viewRecipes,
      pageSize,
      next,
      prev,
      onNavigate
    } = this.props;

    console.log(prev+ "qwertyuik" )
    console.log(next + "qwertyuik");
    var categoryList = categories.map(category => (
      <Category
        key={category.id}
        category={category}
        request={request}
        viewRecipes={viewRecipes}
      />
    ));

    var navLinks = [];
    if (prev !== "None") {
      navLinks.push(<button key="prev" onClick={this.handleNavPrev}>
          &lt; &lt; Previous    </button>);
    }
    if (next !== "None") {
      navLinks.push(<button key="next" onClick={this.handleNavNext}>
          Next &gt; &gt;    </button>);
    }

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
              {categories &&
                categories.length !== 0 && (
                  <div>
                    <h6 className="card-text ml-4 pb-2">
                      Categories{" "}
                      <small className="text-muted">
                        select to view details
                      </small>
                    </h6>
                    <ul className="list-group list-group-flush">
                      {categoryList}
                    </ul>
                  </div>
                )}
            </div>
          </div>
          <div>{navLinks}</div>
        </div>
        <CategoryModal
          title="Create a category"
          action="Submit"
          theId="addCategoryModal"
          request={request}
        />
      </div>
    );
  }
}
