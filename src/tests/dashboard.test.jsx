import React from "react";
import renderer from "react-test-renderer";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Dashboard from "../components/dashboard";

global.localStorage = {
  setItem: () => {},
  removeItem: () => {},
  getItem: () => "t0k3n"
};
const props = {
  history: {
    replace: jest.fn()
  }
};

jest.useFakeTimers();

describe("Dashboard tests", () => {
  configure({ adapter: new Adapter() });
  it("renders correctly", () => {
    const dashbrd = renderer.create(<Dashboard {...props} />).toJSON();
    expect(dashbrd).toMatchSnapshot();
  });

 
  });

