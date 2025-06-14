import { idsMapper } from "..";
import { longIds } from "@/__mocks__";

describe("Test on idsMapper", () => {
  it("Should change id successfully", () => {
    const mappedData = idsMapper(longIds);
    expect(mappedData[0]).not.toEqual(longIds[0]);
  });
});
