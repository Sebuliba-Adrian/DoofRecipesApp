import React from "react";
import renderer from "react-test-renderer";
import LineWithText from "../components/authentication/lineWithText";

const props = {
  lineText: "login"
};

it("renders correctly", () => {
  const lineWithText = renderer.create(<LineWithText {...props} />).toJSON();
  expect(lineWithText).toMatchSnapshot();
});
