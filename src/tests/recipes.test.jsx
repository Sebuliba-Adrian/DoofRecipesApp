import React from "react";
import renderer from "react-test-renderer";
import { mount, configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Recipes from "../components/recipes/recipes";
configure({ adapter: new Adapter() });

const props = {
  selectedCategory: {
    id: 1,
    name: "Selected Category",
    description: "This is the selected category",
    date_created: "Sun, 11 Feb 2018 11:31:50 GMT",
    date_modified: "Sun, 11 Feb 2018 11:31:50 GMT"
  },
  recipes: [
    {
      id: 1,
      name: "Test recipe",
      description: "This is a test recipe",
      date_created: "Sun, 11 Feb 2018 11:31:50 GMT",
      date_modified: "Sun, 11 Feb 2018 11:31:50 GMT"
    },
    {
      id: 2,
      name: "Test recipe 2",
      description: "This is a test recipe 2",
      created_at: "Wed, 20 Sep 2017 11:31:50 GMT",
      updated_at: "Wed, 20 Sep 2017 11:31:50 GMT"
    }
  ],
  prev: "prev",
  next: "next",
  onNavigate: jest.fn(),
  request: jest.fn()
};


it("renders correctly", () => {
  const recipes = renderer.create(<Recipes {...props} />).toJSON();
  expect(recipes).toMatchSnapshot();
});
it("calls preventDefaults", () => {
  const wrapper = shallow(<Recipes {...props} />);
  wrapper.find("#prev").simulate("click", { preventDefault() {} });

 
});
it("also calls preventDefaults", () => {
  const wrapper = shallow(<Recipes {...props} />);
  wrapper.find("#next").simulate("click", { preventDefault() {} });
});


