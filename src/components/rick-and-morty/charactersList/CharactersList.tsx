import { useCharacters } from "@/hooks";
import { CharacterItem } from "../characterItem/CharacterItem";
import type { SingleCharacter } from "@/interfaces";
import { useState } from "react";
import { Pagination } from "../../shared/pagination/Pagination";
import { useCharactersContext } from "@/contexts/CharactersContext";

interface Props {
  listId: string;
}
export const CharactersList = ({ listId }: Props) => {
  const { onSelectCharacters, allCharactersData, selectedCharacters } =
    useCharactersContext();

  const { data, isLoading, page, onPage } = useCharacters(allCharactersData);
  const [selectedCharacter, setSelectedCharacter] = useState<
    SingleCharacter | undefined
  >(undefined);

  if (!data) return;

  const { results, info } = data;

  const onSelect = (selectedId: number) => {
    const alreadySelected = Object.values(selectedCharacters).find(
      ({ id }) => id === selectedId
    );
    if (alreadySelected) return;
    const character = results.find(({ id }) => id === selectedId);
    onSelectCharacters(character!, listId);
    setSelectedCharacter(character);
  };

  return (
    <div className="w-full border border-[--foreground] p-4 rounded-xl  h-fit ">
      <div className="flex flex-row flex-wrap justify-between mb-4">
        <h2 className="text-xl font-extrabold ">Characters</h2>
        {selectedCharacter && <p className="p-0">{selectedCharacter.name}</p>}
      </div>
      {isLoading ? (
        <p className="animate-pulse">Loading...</p>
      ) : (
        <div className="flex flex-wrap lg:grid grid-cols-2 gap-4">
          {results.map((character) => (
            <CharacterItem
              key={character.id}
              {...character}
              isSelected={character.id == selectedCharacter?.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}

      <Pagination
        totalResults={info.count}
        page={page}
        pageSize={results.length}
        onPage={onPage}
      />
    </div>
  );
};
