import { episodesMapper } from "..";
import { episodesMock } from "@/__mocks__";

describe("Test on episodesMapper", () => {
  it("Should change Episodes id successfully", () => {
    const mappedData = episodesMapper(episodesMock);
    expect(mappedData[0].characters[0]).not.toEqual(
      episodesMock[0].characters[0]
    );
  });
});
