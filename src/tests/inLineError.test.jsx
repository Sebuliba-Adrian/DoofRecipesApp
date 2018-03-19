import React from 'react';
import renderer from 'react-test-renderer';
import InLineError from '../components/authentication/InLineError';

it('renders correctly', () => {
  const inLineError = renderer.create(<InLineError text="err.." />).toJSON();
  expect(inLineError).toMatchSnapshot();
});
