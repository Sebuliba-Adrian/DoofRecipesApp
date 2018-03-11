import React from "react";
import renderer from "react-test-renderer";
import LoadingSpinner from "../components/loadingSpinner";


it("renders correctly", () => {
  const loadingSpinner = renderer.create(<LoadingSpinner />).toJSON();
  expect(LoadingSpinner).toMatchSnapshot();
});
