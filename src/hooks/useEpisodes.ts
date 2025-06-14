import { getMultipleEpisodesUseCase } from "@/core";
import type { SingleEpisode } from "@/interfaces";
import { useEffect, useState } from "react";

export const useEpisodes = (episodeIds: string[]) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [episodes, setEpisodes] = useState<SingleEpisode[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleGetEpisodes = () => {
    setIsLoading(true);
    getMultipleEpisodesUseCase({ episodeIds })
      .then((data) => {
        setEpisodes(data);
      })
      .catch(() => {
        setErrorMessage("something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!episodeIds.length) return;
    handleGetEpisodes();
  }, [episodeIds]);

  return {
    episodes,
    isLoading,
    errorMessage,
  };
};
