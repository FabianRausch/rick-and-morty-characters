import { usePagination } from "@/hooks";

interface Props {
  totalResults: number;
  page: number;
  pageSize: number;
  onPage: (page: number) => void;
}

export const Pagination = (props: Props) => {
  const { goToNextPage, goToPrevPage, isFirstPage, isLastPage } =
    usePagination(props);
  return (
    <nav className="flex justify-evenly pt-4">
      <button
        onClick={goToPrevPage}
        disabled={isFirstPage}
        className="cursor-pointer rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none focus:ring-0 active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
      >
        Previous page
      </button>
      <button
        onClick={goToNextPage}
        disabled={isLastPage}
        className="cursor-pointer rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
      >
        Next page
      </button>
    </nav>
  );
};
