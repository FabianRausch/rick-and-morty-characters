import type { SingleEpisode } from "../interfaces";
import { idsMapper } from ".";

export const episodesMapper = (episodesData: SingleEpisode[]) => {
  return episodesData.map(({ characters, ...rest }) => ({
    ...rest,
    characters: idsMapper(characters),
  }));
};
