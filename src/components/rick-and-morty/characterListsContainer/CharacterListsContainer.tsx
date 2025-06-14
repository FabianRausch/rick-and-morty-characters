import { CharactersList } from "../charactersList/CharactersList";

const CHARACTERS_LIST = ["1", "2"];

export const CharacterListsContainer = () => {
  return (
    <div className="flex flex-wrap md:flex-nowrap flex-row w-full gap-4">
      {CHARACTERS_LIST.map((list) => (
        <CharactersList key={list} listId={list} />
      ))}
    </div>
  );
};
