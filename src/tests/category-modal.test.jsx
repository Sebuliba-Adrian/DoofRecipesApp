import React from "react";
import renderer from "react-test-renderer";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CategoryModal from "../components/categories/category-modal";

const props = {
  theId: "addCategoryModal",
  category: {
    id: 1,
    name: "Test Category",
    description: "This is a test category",
    date_created: "Sun, 11 Feb 2018 11:31:50 GMT",
    date_modified: "Sun, 11 Feb 2018 11:31:50 GMT"
  },
  request: jest.fn()
};

describe("Category modal tests", () => {
  configure({ adapter: new Adapter() });
  const categoryMod = mount(<CategoryModal {...props} />);
  const instance = categoryMod.instance();

  it("renders correctly", () => {
    const categoryModal = renderer
      .create(<CategoryModal {...props} />)
      .toJSON();
    expect(categoryModal).toMatchSnapshot();
  });



  it("Updates name in state on change", () => {
    const name = categoryMod.find("[type='text']").at(0);
    name.simulate("change", {
      target: {
        name: "name",
        value: "Test category"
      }
    });
    expect(categoryMod.state().name).toEqual("Test category");
  });
  it("submits category details", () => {
    const button = categoryMod.find("button").at(2);
    button.simulate("click");
    expect(props.request).toHaveBeenCalled();
    categoryMod.setProps({ theId: "updateCategory" });
    button.simulate("click");
    expect(props.request).toHaveBeenCalled();
  });
});
