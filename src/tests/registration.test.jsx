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
  
});
