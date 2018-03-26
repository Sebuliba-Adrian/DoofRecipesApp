import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Categories from '../components/categories/categories';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
const props = {
  categories: [
    {
      id: 1,
      name: 'Test Category',
      description: 'This is a test category',
      date_created: 'Sun, 11 Feb 2018 11:31:50 GMT',
      date_modified: 'Sun,11 Feb 2018 11:31:50 GMT'
    },
    {
      id: 2,
      name: 'Test Category 2',
      description: 'This is a test category 2',
      date_created: 'Sun, 11 Sep 2018 11:31:50 GMT',
      date_modified: 'Sun, 11 Sep 2018 11:31:50 GMT'
    }
  ],
  prev: 'prev',
  next: 'next',
  onNavigate: jest.fn(),
  request: jest.fn(),
  viewRecipes: jest.fn()
};
it('renders correctly', () => {
  const tree = renderer.create(<Categories {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctlc', () => {
  const tree = shallow(<Categories {...props} />);
  expect(tree).toHaveLength(1);
});

it('calls preventDefault', () => {
  const wrapper = shallow(<Categories {...props} />);
  wrapper.find('#prev').simulate('click', { preventDefault() {} });
});
it('also calls preventDefaults', () => {
  const wrapper = shallow(<Categories {...props} />);
  wrapper.find('#next').simulate('click', { preventDefault() {} });
});