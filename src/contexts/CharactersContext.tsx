import type { AllCharactersData, SingleCharacter } from "@/interfaces";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CharactersContextData {
  allCharactersData: AllCharactersData | undefined;
  selectedCharacters: { [key: string]: SingleCharacter };
  setAllCharactersData: (data: AllCharactersData) => void;
  onSelectCharacters: (newCharacter: SingleCharacter, listId: string) => void;
}

const CharactersContext = createContext<CharactersContextData | undefined>(
  undefined
);

export const CharactersContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [allCharactersData, setAllCharactersData] = useState<
    AllCharactersData | undefined
  >(undefined);
  const [selectedCharacters, setSelectedCharacters] = useState<{
    [key: string]: SingleCharacter;
  }>({});

  const onSelectCharacters = (
    newCharacter: SingleCharacter,
    listId: string
  ) => {
    setSelectedCharacters((prev) => ({ ...prev, [listId]: newCharacter }));
  };

  return (
    <CharactersContext.Provider
      value={{
        allCharactersData,
        setAllCharactersData,
        selectedCharacters,
        onSelectCharacters,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};

export const useCharactersContext = () => {
  const context = useContext(CharactersContext);
  if (context === undefined) {
    throw new Error(
      "useMyContext must be used within a CharactersContextProvider"
    );
  }
  return context;
};
