import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Footer from '../components/authentication/footer';

const props = {
  message: 'success',
  link: '/login',
  linkText: 'login',
};

it('renders correctly', () => {
  const footer = renderer
    .create(
    <BrowserRouter>
        <Footer {...props} />
      </BrowserRouter>)
    .toJSON();
  expect(footer).toMatchSnapshot();
});
