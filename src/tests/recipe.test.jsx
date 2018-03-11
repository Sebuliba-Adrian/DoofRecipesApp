import React from "react";
import renderer from "react-test-renderer";
import Recipe from "../components/recipes/recipe";

const props = {
  key: 1,
  selectedCategory: {
    id: 1,
    name: "Selected Category",
    description: "This is the selected category",
    date_created: "Sun, 11 Feb 2018 11:31:50 GMT",
    date_modified: "Sun, 11 Feb 2018 11:31:50 GMT"
  },
  recipe: {
    id: 1,
    name: "Test Recipe",
    description: "This is a test recipe",
    date_created: "Sun, 11 Feb 2018 11:31:50 GMT",
    date_modified: "Sun, 11 Feb 2018 11:31:50 GMT",
   
  },
  request: jest.fn()
};
it("renders correctly", () => {
  const recipe = renderer.create(<Recipe {...props} />).toJSON();
  expect(recipe).toMatchSnapshot();
});
