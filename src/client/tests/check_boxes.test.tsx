import React from "react";
import { View } from "react-native";
import renderer from "react-test-renderer";
import Checkboxes from "../components/check_boxes";
it("has 1 child", () => {
  jest.mock("react-native-elements/", () => {
    return { Checkbox: <></> };
  });
  jest.resetModules();
  jest.resetAllMocks();
  jest.useFakeTimers(); // <-- Add this
  const tree = renderer.create(<Checkboxes setAllChecksFilled={(arg: boolean) => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
