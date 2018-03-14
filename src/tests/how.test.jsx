import React from 'react';
import renderer from 'react-test-renderer';
import How from '../components/How';

it('renders correctly', () => {
  const how = renderer.create(<How />).toJSON();
  expect(how).toMatchSnapshot();
});
