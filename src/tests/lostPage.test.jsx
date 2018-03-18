import React from "react";
import renderer from "react-test-renderer";
import LostPage from "../components/lostPage";

it("renders correctly", () => {
  const lostPage = renderer.create(<LostPage />).toJSON();
  expect(lostPage).toMatchSnapshot();
});
