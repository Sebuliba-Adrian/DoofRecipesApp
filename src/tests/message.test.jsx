import React from "react";
import renderer from "react-test-renderer";
import Message from "../components/message";

const props = {
  message: ""
}
it("renders correctly", () => {
  const message= renderer.create(<Message {...props} />).toJSON();
  expect(message).toMatchSnapshot();
});
