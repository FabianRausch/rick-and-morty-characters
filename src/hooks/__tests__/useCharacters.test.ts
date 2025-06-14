import { renderHook, act, waitFor } from "@testing-library/react";
import { useCharacters } from "..";
import { mappedCharactersApiResponse } from "@/__mocks__";

jest.mock("@/core", () => ({
  getAllCharactersUseCase: jest.fn(),
}));

import { getAllCharactersUseCase } from "@/core";

const mockGetAllCharactersUseCase = getAllCharactersUseCase as jest.Mock;

describe("useCharacters", () => {
  beforeEach(() => {
    mockGetAllCharactersUseCase.mockClear();
  });

  test("should initialize with provided firstValue and default page", () => {
    const { result } = renderHook(() =>
      useCharacters(mappedCharactersApiResponse)
    );

    expect(result.current.data).toEqual(mappedCharactersApiResponse);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.page).toBe(1);
    expect(result.current.errorMessage).toBeUndefined();
  });

  test("should fetch characters for a new page and update data on success", async () => {
    mockGetAllCharactersUseCase.mockResolvedValueOnce(
      mappedCharactersApiResponse
    );

    const { result } = renderHook(() =>
      useCharacters(mappedCharactersApiResponse)
    );

    expect(result.current.page).toBe(1);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mappedCharactersApiResponse);

    act(() => {
      result.current.onPage(2);
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.page).toBe(2);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual({
        ...mappedCharactersApiResponse,
        info: {
          ...mappedCharactersApiResponse.info,
          next: "https://rickandmortyapi.com/api/character/?page=2",
        },
      });
    });

    expect(mockGetAllCharactersUseCase).toHaveBeenCalledTimes(1);
    expect(mockGetAllCharactersUseCase).toHaveBeenCalledWith({ page: 2 });
    expect(result.current.errorMessage).toBeUndefined();
  });

  test("should set errorMessage on API error during page change", async () => {
    mockGetAllCharactersUseCase.mockRejectedValueOnce(
      new Error("something went wrong on api call")
    );

    const { result } = renderHook(() =>
      useCharacters(mappedCharactersApiResponse)
    );

    act(() => {
      result.current.onPage(3);
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.page).toBe(3);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.errorMessage).toBe("something went wrong");
      expect(result.current.data).toEqual(mappedCharactersApiResponse);
    });

    expect(mockGetAllCharactersUseCase).toHaveBeenCalledTimes(1);
    expect(mockGetAllCharactersUseCase).toHaveBeenCalledWith({ page: 3 });
  });
});
