import React from "react";
import renderer from "react-test-renderer";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RecipeModal from "../components/recipes/recipeModal";

const props = {
  theId: "addRecipeModal",
  title: "Create recipe",
  action: "Create",
  selectedCategory: {
    id: 1,
    name: "Selected Category",
    description: "This is the selected category",
    date_created: "Sun, 11 Feb 2018 11:31:50 GMT",
    date_modified: "Sun, 11 Feb 2018 11:31:50 GMT"
  },
  recipe: {
    id: 1,
    name: "Test Category",
    description: "This is a test category",
    date_created: "Sun, 11 Feb 2018 11:31:50 GMT",
    date_modified: "Sun, 11 Feb 2018 11:31:50 GMT"
  },
  request: jest.fn()
};

describe("Recipe modal tests", () => {
  configure({ adapter: new Adapter() });
  const recipeMod = mount(<RecipeModal {...props} />);
  const instance = recipeMod.instance();

  it("renders correctly", () => {
    const recipeModal = renderer.create(<RecipeModal {...props} />).toJSON();
    expect(recipeModal).toMatchSnapshot();
  });

  it("Updates name in state on change", () => {
    const name = recipeMod.find("[type='text']").at(0);
    name.simulate("change", {
      target: {
        name: "name",
        value: "Test recipe"
      }
    });

    expect(recipeMod.state().name).toEqual("Test recipe");
  });

  it("submits recipe details", () => {
    const button = recipeMod.find("button").at(2);
    button.simulate("click");
    expect(props.request).toHaveBeenCalled();
    recipeMod.setProps({ theId: "updateRecipe" });
    button.simulate("click");
    expect(props.request).toHaveBeenCalled();
  });
});
