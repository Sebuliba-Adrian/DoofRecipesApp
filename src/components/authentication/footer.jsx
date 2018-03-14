import React from 'react';
import PropTypes from 'prop-types';

export default function Footer({ message, link, linkText }) {
  return (
    <div className="card mt-2">
      <div className="card-block">
        <p className="card-text text-center message">
          {message}
          <a href={link} className="card-link">{linkText}</a>
          <a href="/instructions" className="card-link">How To</a>
        </p>
      </div>
    </div>
  );
}

Footer.propTypes = {
  message: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

