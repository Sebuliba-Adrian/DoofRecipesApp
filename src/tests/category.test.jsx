import React from "react";
import renderer from "react-test-renderer";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Category from "../components/categories/category";

const props = {
  key: 1,
  category: {
    id: 1,
    name: "Test category",
    description: "This is a test category",
    date_created: "Wed, 20 Feb 2018 11:31:50 GMT",
    date_modified: "Wed, 20 Feb 2018 11:31:50 GMT"
  },
  request: jest.fn(),
  viewRecipes: jest.fn()
};

describe("Test recipes", () => {
  it("renders correctly", () => {
    const category = renderer.create(<category {...props} />).toJSON();
    expect(category).toMatchSnapshot();
  });

  configure({ adapter: new Adapter() });
  const category = mount(<Category {...props} />);
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve({})
    });
  });
  it("Shows  recipes", () => {
    const categoryrow = category.find("a");
    categoryrow.simulate("click");
    expect(props.viewRecipes).toHaveBeenCalled();
  });
});
