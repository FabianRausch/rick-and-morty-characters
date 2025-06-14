import React from "react";
import { render } from "@testing-library/react";
import Component from "..";

describe("Test on Error page", () => {
  it("Should match with snapshot", () => {
    const { asFragment } = render(<Component />);
    expect(asFragment).toMatchSnapshot();
  });
});
