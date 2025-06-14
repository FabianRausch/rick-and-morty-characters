import { CharacterListsContainer, EpisodeListsContainer } from "@/components";

export const RickAndMorty = () => {
  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-16">
        <CharacterListsContainer />
        <EpisodeListsContainer />
      </div>
    </div>
  );
};
