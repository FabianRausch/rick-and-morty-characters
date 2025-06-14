import { useCharactersContext } from "@/contexts/CharactersContext";
import { EpisodeList } from "../episodesList/EpisodesList";
import { useEpisodes } from "@/hooks";
import { useEffect, useState } from "react";

export const EpisodeListsContainer = () => {
  const { selectedCharacters } = useCharactersContext();
  const [episodeIds, setEpisodeIds] = useState<string[]>([]);
  const { episodes, isLoading } = useEpisodes(episodeIds);

  useEffect(() => {
    if (Object.values(selectedCharacters).length < 2) return;
    let tempEpisodes: string[] = [];
    for (const character of Object.values(selectedCharacters)) {
      tempEpisodes = [...tempEpisodes, ...character.episode];
    }
    setEpisodeIds(tempEpisodes);
  }, [selectedCharacters]);

  if (Object.values(selectedCharacters).length < 2) return;

  return (
    <>
      {isLoading ? (
        <p className="animate-pulse">Loading...</p>
      ) : (
        <div className="flex flex-wrap gap-2 justify-evenly">
          <EpisodeList
            title={"Episodes with only:"}
            description={selectedCharacters["1"].name}
            episodes={episodes.filter((episode) =>
              episode.characters.includes(selectedCharacters["1"].id.toString())
            )}
          />
          <EpisodeList
            title={"Shared episodes with:"}
            description={`${selectedCharacters["1"].name} & ${selectedCharacters["2"].name}`}
            episodes={episodes.filter(
              (episode) =>
                episode.characters.includes(
                  selectedCharacters["1"].id.toString()
                ) &&
                episode.characters.includes(
                  selectedCharacters["2"].id.toString()
                )
            )}
          />
          <EpisodeList
            title={"Episodes with only:"}
            description={selectedCharacters["2"].name}
            episodes={episodes.filter((episode) =>
              episode.characters.includes(selectedCharacters["2"].id.toString())
            )}
          />
        </div>
      )}
    </>
  );
};
