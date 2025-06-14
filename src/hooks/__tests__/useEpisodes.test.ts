import { renderHook, waitFor } from "@testing-library/react";
import { useEpisodes } from "..";
import { mappedEpisodesApiResponse } from "@/__mocks__";

jest.mock("@/core", () => ({
  getMultipleEpisodesUseCase: jest.fn(),
}));
import { getMultipleEpisodesUseCase } from "@/core";

const mockGetMultipleEpisodesUseCase = getMultipleEpisodesUseCase as jest.Mock;

describe("Test on useEpisodes hook", () => {
  beforeEach(() => {
    mockGetMultipleEpisodesUseCase.mockClear();
    mockGetMultipleEpisodesUseCase.mockResolvedValue(mappedEpisodesApiResponse);
  });

  test("should fetch episodes and update state on successful response", async () => {
    const episodeIds = ["1", "2"];
    const { result } = renderHook(() => useEpisodes(episodeIds));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.episodes).toBeUndefined();
    expect(result.current.errorMessage).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.episodes).toEqual(mappedEpisodesApiResponse);
      expect(result.current.errorMessage).toBeUndefined();
    });

    expect(mockGetMultipleEpisodesUseCase).toHaveBeenCalledTimes(1);
    expect(mockGetMultipleEpisodesUseCase).toHaveBeenCalledWith({ episodeIds });
  });

  test("should update error state on API error", async () => {
    const episodeIds = ["99"];

    mockGetMultipleEpisodesUseCase.mockRejectedValueOnce(
      new Error("something went wrong with get")
    );

    const { result } = renderHook(() => useEpisodes(episodeIds));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.episodes).toBeUndefined();
      expect(result.current.errorMessage).toBe("something went wrong");
    });

    expect(mockGetMultipleEpisodesUseCase).toHaveBeenCalledTimes(1);
    expect(mockGetMultipleEpisodesUseCase).toHaveBeenCalledWith({ episodeIds });
  });

  test("should update error state on network/unexpected error", async () => {
    const episodeIds = ["1"];
    const networkError = new Error("Network Down");
    mockGetMultipleEpisodesUseCase.mockRejectedValueOnce(networkError);

    const { result } = renderHook(() => useEpisodes(episodeIds));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.episodes).toBeUndefined();
      expect(result.current.errorMessage).toBe("something went wrong");
    });
  });

  test("should not fetch when there are not episodeIds", async () => {
    const episodeIds: string[] = [];
    const { result } = renderHook(() => useEpisodes(episodeIds));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.episodes).toBeUndefined();
    expect(result.current.errorMessage).toBeUndefined();

    expect(mockGetMultipleEpisodesUseCase).not.toHaveBeenCalled();
  });
});
