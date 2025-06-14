import { getAllCharactersUseCase } from "@/core";
import type { AllCharactersData } from "@/interfaces";
import { useEffect, useState } from "react";

export const useCharacters = (firstValue?: AllCharactersData) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentData, setCurrentData] = useState<AllCharactersData | undefined>(
    firstValue
  );
  const [errorMessage, setErrorMessage] = useState<string>();

  const onPage = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    getAllCharactersUseCase({ page })
      .then((data) => {
        setCurrentData(data);
      })
      .catch(() => {
        setErrorMessage("something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setCurrentData(firstValue);
  }, [firstValue]);

  return {
    data: currentData,
    isLoading,
    onPage,
    page: currentPage,
    errorMessage,
  };
};
