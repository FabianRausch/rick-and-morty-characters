import type { AllCharactersData } from "../interfaces";
import { idsMapper } from ".";

export const charactersMapper = (allCharactersData: AllCharactersData) => {
  const { info, results } = allCharactersData;

  const mappedResults = results.map(({ episode, ...rest }) => ({
    ...rest,
    episode: idsMapper(episode),
  }));

  return {
    info,
    results: mappedResults,
  };
};
