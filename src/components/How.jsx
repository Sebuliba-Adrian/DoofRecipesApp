import React from 'react';

const How = () => (
  <div className="text-center mt-5">
    <h3 className="text-cool-blue">How to get a secure password:</h3>
    <p className="text-muted">
      The password is run against five different validations such as, upper
      case, lower case, special character, and digits. These are done by using
      If the password does not pass one of the
       validations it will output a random password that will match the given guidelines.<br />
      - Ensure that the password is over 3 charactersand no more than 25 characters<br />
      - Ensure that both Uppercase and Lowercase are in your password<br />
      - Ensure that you have an integer and special characters<br />
      - Ensure that you have 8 to 20 characters in you password<br />
      {' '}
      <a className="card-link text-cool-blue" href="/registration">
        here
      </a>{' '}
      to register.
    </p>
  </div>
);
export default How;
