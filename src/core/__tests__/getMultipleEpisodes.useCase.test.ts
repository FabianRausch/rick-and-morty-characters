import { getMultipleEpisodesUseCase } from "..";
import {
  episodesApiResponse,
  mappedEpisodesApiResponse,
} from "../../__mocks__";

global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mock;

describe("Test on getMultipleEpisodesUseCase", () => {
  beforeEach(mockFetch.mockClear);

  test("should return mapped episodes data on successful fetch with a valid episodeIds path", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(episodesApiResponse),
      url: "http://example.com/episode/10,28",
    });

    const result = await getMultipleEpisodesUseCase({
      episodeIds: ["10", "28"],
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_RICK_AND_MORTY_API}/episode/10,28`,
      {
        next: { revalidate: 3600 },
      }
    );

    expect(result).toEqual(mappedEpisodesApiResponse);
  });

  test("should fetch data without path episodeIds", async () => {
    await expect(
      getMultipleEpisodesUseCase({ episodeIds: [] })
    ).rejects.toThrow("Something went wrong");
  });

  test("should fetch data when includes not valid episodeIds", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(episodesApiResponse),
      url: "http://example.com/episode/10,28",
    });

    const result = await getMultipleEpisodesUseCase({
      episodeIds: ["10", "28", "abc"],
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_RICK_AND_MORTY_API}/episode/10,28`,
      {
        next: { revalidate: 3600 },
      }
    );
    expect(result).toEqual(mappedEpisodesApiResponse);
  });

  test("should return an error object if fetch response is not ok", async () => {
    const mockErrorUrl = `${process.env.NEXT_PUBLIC_RICK_AND_MORTY_API}/episode/10,28`;
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
      url: mockErrorUrl,
    });

    await expect(
      getMultipleEpisodesUseCase({
        episodeIds: ["10", "28"],
      })
    ).rejects.toThrow("Something went wrong");

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test("should return an error object on network error or other exceptions", async () => {
    const networkError = new Error("Network down");
    mockFetch.mockRejectedValueOnce(networkError);

    await expect(
      getMultipleEpisodesUseCase({
        episodeIds: ["10", "28"],
      })
    ).rejects.toThrow("Something went wrong");

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
