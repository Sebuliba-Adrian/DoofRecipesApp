import React, { Component } from "react";

export default class RecipeModal extends Component {
  constructor(props) {
    super(props);
    if (props.recipe) {
      this.state = props.recipe;
    } else {
      this.state = {
        name: "",
        description: ""
      };
    }
    this.defaultState = this.state;
  }

  onInputChange = ({ target }) => {
    let { value, name } = target;

    this.setState({
      [name]: value
    });
  };

  handleClick = event => {
    event.stopPropagation();
  };

  submitData = event => {
      console.log(this.state.name);
      console.log(this.state.description);
    if (this.props.theId === "addRecipeModal") {
      this.props.request(
        "addRecipe",
        `categories/${this.props.selectedCategory.id}/recipes`,
        "POST",
        this.state
      );
    } else {
      this.props.request(
        "updateRecipe",
        `categories/${this.props.selectedCategory.id}/recipes/${this.state.id}`,
        "PUT",
        this.state
      );
    }
    event.stopPropagation();
    this.resetState(event);
  };
  resetState = event => {
    event.stopPropagation();
    this.setState(this.defaultState);
  };
  render() {
    return (
      <div
        className="modal fade"
        id={this.props.theId}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {this.props.name}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <label htmlFor="name">Name</label>
              <div className="input-group" onChange={this.onInputChange}>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={this.onInputChange}
                  value={this.state.name}
                />
              </div>
              <br />
              <label htmlFor="description">Description</label>
              <div className="input-group">
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={this.onInputChange}
                  value={this.state.description}
                />
              </div>
              <br />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.resetState}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={this.submitData}
              >
                {this.props.action}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
