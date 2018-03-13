import React from 'react';
import PropTypes from 'prop-types';

export default function Message({ message }) {
  return (
    <div
      className="message alert alert-dismissible fade show alert-info no-border-corners"
      role="alert"
    >
      <button
        type="button"
        className="close fa fa-close align-middle"
        data-dismiss="alert"
      />
      {message}
    </div>
  );
}
Message.propTypes = {
  message: PropTypes.string.isRequired,
};
