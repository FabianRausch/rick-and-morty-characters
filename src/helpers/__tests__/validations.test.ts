import { isPositiveInteger } from "..";

describe("Test on validations", () => {
  it("Should isPositiveInteger be true ", () => {
    expect(isPositiveInteger("1")).toBeTruthy();
  });

  it("Should isPositiveInteger be true with ('10')", () => {
    expect(isPositiveInteger("10")).toBeTruthy();
  });

  it("Should isPositiveInteger be fasle with ('e') ", () => {
    expect(isPositiveInteger("e")).toBeFalsy();
  });

  it("Should isPositiveInteger be fasle with ('1.2') ", () => {
    expect(isPositiveInteger("1.2")).toBeFalsy();
  });

  it("Should isPositiveInteger be fasle with ('0') ", () => {
    expect(isPositiveInteger("1.2")).toBeFalsy();
  });

  it("Should isPositiveInteger be fasle with ('-1') ", () => {
    expect(isPositiveInteger("-1")).toBeFalsy();
  });
});
