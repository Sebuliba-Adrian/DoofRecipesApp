import React from 'react';
import PropTypes from 'prop-types';

export default function ConfirmDelete(props) {
  function deleteAction(event) {
    if (props.theId.indexOf('deleteCategoryModel') > -1) {
      props.request(
        'deleteCategory',
        `categories/${props.category.id}`,
        'DELETE',
      );
    } else {
      props.request(
        'deleteRecipe',
        `categories/${props.selectedCategory.id}/recipes/${props.recipe.id}`,
        'DELETE',
      );
    }
    event.stopPropagation();
  }
  function cancelDelete(event) {
    event.stopPropagation();
  }
  return (
    <div className="modal fade" id={props.theId} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Delete
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
          <div className="modal-body">Are you sure you want to delete?</div>
          <div className="modal-footer">
            <button
              id="cancel"
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={cancelDelete}
            >
              Cancel
            </button>

            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={deleteAction}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ConfirmDelete.propTypes = {
  theId: PropTypes.string.isRequired,
  request: PropTypes.func.isRequired,
  selectedCategory: PropTypes.shape({ id: '' }),
  category: PropTypes.shape({ id: '' }),
  recipe: PropTypes.shape({ id: '' }),
};

ConfirmDelete.defaultProps = {
  selectedCategory: { id: '' },
  category: { id: '' },
  recipe: { id: '' },
};
