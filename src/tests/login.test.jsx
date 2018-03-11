import React from "react";
import { mount, configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { BrowserRouter } from "react-router-dom";

import renderer from "react-test-renderer";
import LoginPage from "../components/authentication/login";

const props = {
  location: {
    data: {
      message: "Test message"
    }
  },
  history: {
    replace: jest.fn()
  }
};

global.localStorage = {
  setItem: () => {},
  getItem: () => {}
};

describe("<LoginPage />", () => {

  it("renders three <Foo /> components", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <LoginPage {...props} />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  
 



  



});
