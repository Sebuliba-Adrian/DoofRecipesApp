import React from 'react';

const LostPage = () => (
  <div className="text-center mt-5">
    <h3 className="text-cool-blue">404 page not found</h3>
    <p className="text-muted">
     Oops!! Page you are looking for is not found
      -__- Click{' '}
      <a className="card-link text-cool-blue" href="/login">
        here
      </a>{' '}
      to login.
    </p>
  </div>
);
export default LostPage;
