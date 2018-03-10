import React, { Component } from "react";

export default class CategoryModal extends Component {
  constructor(props) {
    super(props);
    if (props.category) {
      this.state = props.category;
    } else {
      this.state = {
        name: "",
        description: ""
      };
    }
  }

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  submitData = event => {
      event.stopPropagation();
      event.preventDefault();
    if (this.props.theId === "addCategoryModal") {
      this.props.request("addCategory", "categories", "POST", this.state);
      this.setState({ name: "", description: "" });
    } else {
      this.props.request(
        "updateCategory",
        `categories/${this.state.id}`,
        "PUT",
        this.state
      );
    }
    event.stopPropagation();
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
                {this.props.title}
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
                  maxLength="140" 
                  rows="7"
                  onChange={this.onInputChange}
                  value={this.state.description}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.handleClick}
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
