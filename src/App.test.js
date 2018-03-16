import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import App from "./App";
import Adapter from "enzyme-adapter-react-16";

global.localStorage = {
  setItem: () => {},
  getItem: () => {}
};
configure({ adapter: new Adapter() });

describe("Test recipes", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders correctly", () => {
    const component = shallow(<App />);
    console.log(component.instance());
    expect(component).toHaveLength(1);
  });
});
