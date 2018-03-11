import React from "react";
import renderer from "react-test-renderer";
import Categories from "../components/categories/categories";

const props = {
  categories: [
    {
      id: 1,
      name: "Test Category",
      description: "This is a test category",
      date_created: "Sun, 11 Feb 2018 11:31:50 GMT",
      date_modified: "Sun,11 Feb 2018 11:31:50 GMT"
    },
    {
      id: 2,
      name: "Test Category 2",
      description: "This is a test category 2",
      date_created: "Sun, 11 Sep 2018 11:31:50 GMT",
      date_modified: "Sun, 11 Sep 2018 11:31:50 GMT"
    }
  ],
  request: jest.fn(),
  viewRecipes: jest.fn()
};
it("renders correctly", () => {
  const tree = renderer.create(<Categories {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
