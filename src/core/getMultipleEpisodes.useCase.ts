import { SingleEpisode } from "@/interfaces";
import { isPositiveInteger } from "@/helpers";
import { episodesMapper } from "@/mappers";

interface Props {
  episodeIds: string[];
}

const API_URL = process.env.NEXT_PUBLIC_RICK_AND_MORTY_API;

export const getMultipleEpisodesUseCase = async ({
  episodeIds,
}: Props): Promise<SingleEpisode[]> => {
  try {
    const uniqueIds = [...new Set(episodeIds)];
    const validIds = uniqueIds.filter((episodeId) =>
      isPositiveInteger(episodeId)
    );
    if (!validIds.length)
      throw new Error(
        `Error on getMultipleEpisodesUseCase episodesId path is empty `
      );

    const resp = await fetch(`${API_URL}/episode/${validIds.toString()}`, {
      next: { revalidate: 3600 },
    });

    if (!resp.ok) throw new Error(`Error on service ==> ${resp.url}`);

    const data: SingleEpisode[] = await resp.json();
    return episodesMapper(data);
  } catch (error) {
    console.log("Error on getMultipleEpisodesUseCase =>", error);
    throw new Error("Something went wrong");
  }
};
