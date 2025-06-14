import { charactersMapper } from "..";
import { charactersEmptyEpisodesMock, charactersMock } from "@/__mocks__";

describe("Test on charactersMapper", () => {
  it("Should change episodes id successfully", () => {
    const mappedData = charactersMapper(charactersMock);
    expect(mappedData.results[0].episode[0]).not.toEqual(
      charactersMock.results[0].episode[0]
    );
  });

  it("Should retuen an empty episode array", () => {
    const mappedData = charactersMapper(charactersEmptyEpisodesMock);
    expect(mappedData.results[0].episode.length).toBe(0);
  });
});
