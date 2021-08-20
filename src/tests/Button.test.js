import React from "react";
import ReactDOM from "react-dom";
import {render, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import renderer from "react-test-renderer";

import Button from "../components/Button";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Button />, div);
});

it("renders button correctly", () => {
  const {getByTestId} = render(<Button label={"Click Me"} />);
  expect(getByTestId("button")).toHaveTextContent("Click Me");
});

it("matches snapshot", () => {
  const tree = renderer.create(<Button label={"Test"} />).toJSON();
  expect(tree).toMatchSnapshot();
});
