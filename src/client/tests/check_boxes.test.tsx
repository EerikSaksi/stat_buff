import React from "react";
import renderer from "react-test-renderer";
import Checkboxes from "../components/check_boxes";
it("has 1 child", () => {
  const tree = renderer.create(<Checkboxes setAllChecksFilled={(arg: boolean) => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
