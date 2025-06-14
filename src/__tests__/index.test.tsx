import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Component from "../pages/error";

describe("Test on Error page", () => {
  it("Should match with snapshot", () => {
    const { asFragment } = render(<Component />);
    expect(asFragment).toMatchSnapshot();
  });
});
