import { useCallback, useMemo, useState } from "react";

interface Props {
  totalResults: number;
  page: number;
  pageSize: number;
  onPage: (page: number) => void;
}

export const usePagination = ({
  totalResults,
  page,
  pageSize,
  onPage,
}: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(page);
  const totalPages = useMemo(
    () => Math.ceil(totalResults / pageSize),
    [totalResults, pageSize]
  );
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
    onPage(currentPage + 1);
  }, [currentPage]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => prev - 1);
    onPage(currentPage - 1);
  }, [currentPage]);

  const goToPage = useCallback(
    (selectedPage: number) => {
      setCurrentPage(selectedPage);
      onPage(selectedPage);
    },
    [currentPage]
  );

  return {
    currentPage,
    goToNextPage,
    goToPrevPage,
    goToPage,
    isFirstPage,
    isLastPage,
    totalPages,
  };
};
