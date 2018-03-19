import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConfirmDelete from '../components/confirmDelete';

const props = {
  theId: "deleteCategoryModel1",
  category: {
    id: 1,
    name: "Test Category",
    description: "This is a test category",
    date_created: "Sun, 11 Feb 2018 11:31:50 GMT"
  },
  selectedCategory: {
    id: 1,
    name: "Test Category",
    description: "This is a test category",
    date_created: "Sun, 11 Feb 2018 11:31:50 GMT"
  },
  recipe: {
    id: 1,
    name: 'Test Category',
    description: 'This is a test category',
    date_created: 'Sun, 11 Feb 2018 11:31:50 GMT',
  },
  request: jest.fn(),
  viewRecipes: jest.fn()
};

describe("Confirm delete tests", () => {
  configure({ adapter: new Adapter() });
  const confirmDel = mount(<ConfirmDelete {...props} />);
  const instance = confirmDel.instance();

  it('renders correctly', () => {
    const confirmDelete = renderer
      .create(<ConfirmDelete {...props} />)
      .toJSON();
    expect(confirmDelete).toMatchSnapshot();
  });

  it('Triggers delete', () => {
    const button = confirmDel.find("button").at(2);
    button.simulate("click");
    expect(props.request).toHaveBeenCalled();
    confirmDel.setProps({ theId: "deleteItemModel1" });
    button.simulate("click");
    expect(props.request).toHaveBeenCalled();
  });
  it('Triggers cancel delete', () => {
    const wrapper = shallow(<ConfirmDelete {...props} />);
    wrapper.find("#cancel").simulate("click", { stopPropagation() {} });
  });
});
