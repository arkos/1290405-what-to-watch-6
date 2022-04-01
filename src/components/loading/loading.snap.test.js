import React from "react";
import { render } from "@testing-library/react";
import Loading from "./loading";

it(`Should Loading render correctly`, () => {
  const { container } = render(<Loading />);

  expect(container).toMatchSnapshot();
});
