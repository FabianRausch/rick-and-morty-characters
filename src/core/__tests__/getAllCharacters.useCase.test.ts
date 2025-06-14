import { getAllCharactersUseCase } from "..";
import {
  charactersApiResponse,
  mappedCharactersApiResponse,
} from "../../__mocks__";

global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mock;

describe("Test on getAllCharactersUseCase", () => {
  beforeEach(mockFetch.mockClear);

  test("should return mapped character data on successful fetch with a valid page", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(charactersApiResponse),
      url: "http://example.com/character?page=1",
    });

    const result = await getAllCharactersUseCase({ page: 1 });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_RICK_AND_MORTY_API}/character?page=1`,
      {
        next: { revalidate: 3600 },
      }
    );

    expect(result).toEqual(mappedCharactersApiResponse);
  });

  test("should fetch data if page is not provided", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(charactersApiResponse),
      url: "http://example.com/character?",
    });

    const result = await getAllCharactersUseCase({});

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_RICK_AND_MORTY_API}/character?`,
      {
        next: { revalidate: 3600 },
      }
    );
    expect(result).toEqual(mappedCharactersApiResponse);
  });

  test("should fetch data if page is invalid", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(charactersApiResponse),
      url: "http://example.com/character?",
    });

    const result = await getAllCharactersUseCase({ page: "abc" });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_RICK_AND_MORTY_API}/character?`,
      {
        next: { revalidate: 3600 },
      }
    );
    expect(result).toEqual(mappedCharactersApiResponse);
  });

  test("should return an error object if fetch response is not ok", async () => {
    const mockErrorUrl = `${process.env.NEXT_PUBLIC_RICK_AND_MORTY_API}/character?page=1`;
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
      url: mockErrorUrl,
    });

    await expect(getAllCharactersUseCase({ page: 1 })).rejects.toThrow(
      "Something went wrong"
    );
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test("should return an error object on network error or other exceptions", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network down"));

    await expect(getAllCharactersUseCase({ page: 1 })).rejects.toThrow(
      "Something went wrong"
    );
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test("should handle page prop as a number and convert to string for validation", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(charactersApiResponse),
      url: "http://example.com/character?page=5",
    });

    await getAllCharactersUseCase({ page: 5 });
    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_RICK_AND_MORTY_API}/character?page=5`,
      expect.any(Object)
    );
  });
});
