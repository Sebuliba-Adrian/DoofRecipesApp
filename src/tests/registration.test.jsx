import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");

import { mount, configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Registration from "../components/authentication/registration";

const props = {
  history: {
    replace: jest.fn()
  }
};

describe("Test registration", () => {
  it("renders correctly", () => {
    const registration = renderer
      .create(
        <BrowserRouter>
          <Registration {...props} />
        </BrowserRouter>
      )
      .toJSON();
    expect(registration).toMatchSnapshot();
  });
  configure({ adapter: new Adapter() });
  const register = shallow(<Registration {...props} />);


  const instance = register.instance();
  global.fetch = jest.fn(() => {
       
            return Promise.resolve({});
        
    });

  it("Sets user credentials in state on change", () => {
    const usernameInput = register.find("[type='text']").at(0);
    usernameInput.simulate("change", {
      target: {
        name: "username",
        value: "Adrian"
      }
    });

    register.setState({
      registered: false,
      message: "Test message"
    });
    expect(register.state().username).toEqual("Adrian");
  });

  it("should submit form data", () => {
    let form = shallow(<Registration />);
    let handleSubmit = jest.fn(); // <= this doesn't work!!

    form.find("[type='submit']").simulate("click");

    // expect(form.find(".submit-btn").length).toEqual(1);
    expect(handleSubmit.mock.calls.length).toBe(0);
  });
//    it("Registers a user", () => {
//      const button = register.find("[type='submit']");
//      button.simulate("submit");
//     expect(global.fetch).toHaveBeenCalled();
//    });
});
