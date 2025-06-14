import "@testing-library/jest-dom";
import { renderHook, waitFor } from "@testing-library/react";
import { usePagination } from "..";
import { act } from "react";

describe("Test on usePagination hook", () => {
  const paginationProps = {
    totalResults: 30,
    page: 2,
    pageSize: 20,
    onPage: jest.fn(),
  };

  beforeEach(jest.clearAllMocks);

  it("Should render default values", () => {
    const { result } = renderHook(() => usePagination(paginationProps));
    expect(result.current.currentPage).toBe(2);
  });

  it("Should call onPage event with goToNextPage method", async () => {
    const { result } = renderHook(() => usePagination(paginationProps));

    act(() => {
      result.current.goToNextPage();
    });

    expect(paginationProps.onPage).toHaveBeenCalledWith(3);
    await waitFor(() => {
      expect(result.current.currentPage).toBe(3);
    });
  });

  it("Should call onPage event with goToPrevPage method", async () => {
    const { result } = renderHook(() => usePagination(paginationProps));

    act(() => {
      result.current.goToPrevPage();
    });

    expect(paginationProps.onPage).toHaveBeenCalledWith(1);
    await waitFor(() => {
      expect(result.current.currentPage).toBe(1);
    });
  });

  it("Should call onPage event with goToPage method", async () => {
    const { result } = renderHook(() => usePagination(paginationProps));

    act(() => {
      result.current.goToPage(4);
    });

    expect(paginationProps.onPage).toHaveBeenCalledWith(4);
    await waitFor(() => {
      expect(result.current.currentPage).toBe(4);
    });
  });
});
