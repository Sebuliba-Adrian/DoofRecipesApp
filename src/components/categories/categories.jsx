import React, { Component } from 'react';
import CategoryModal from './categoryModal';
import Category from './category';

export default class Categories extends Component {
  constructor(props) {
    super(props);

    this.handleNavPrev = this.handleNavPrev.bind(this);
    this.handleNavNext = this.handleNavNext.bind(this);
  }
  
  /**
  * This method gets called whenever the user clicks the previous button of the categories
  * param{event}
  */
  handleNavPrev(event) {
    event.preventDefault();
    this.props.onNavigate(this.props.prev);
  }

  /**
  * This method gets called whenever the user clicks the next button of the categories
  */
  handleNavNext(event) {
    event.preventDefault();
    this.props.onNavigate(this.props.next);
  }

  render() {
    const { categories, request, viewRecipes, next, prev } = this.props;

    const categoryList = categories.map(category => (
      <Category
        key={category.id}
        category={category}
        request={request}
        viewRecipes={viewRecipes}
      />
    ));
    const navLinks = [];// Create an empty array
    //If the data from the api has previous url create a previous button on the screen
    if (prev !== 'None' && prev !== '') {
      navLinks.push(
        <li key={0} className="page-item">
          <a href className="page-link" tabIndex="-1" onClick={this.handleNavPrev} id="prev">
            &lt; &lt; Prev
          </a>
        </li>
      );
    }
    //If the data from the api has next url create a next button on the screen
    if (next !== 'None' && next !== '') {
      navLinks.push(
        <li key={1} className="page-item">
          <a className="page-link" tabIndex="-1" onClick={this.handleNavNext} id="next">
            Next &gt; &gt;
          </a>
        </li>
      );
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
              <nav aria-label="...">
                <ul className="pagination pagination-lg">{navLinks}</ul>
              </nav>
              {categories &&
                categories.length !== 0 && (
                  <div>
                    <h6 className="card-text ml-4 pb-2">
                      Categories{' '}
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
