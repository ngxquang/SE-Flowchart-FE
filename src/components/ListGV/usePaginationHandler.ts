export function usePaginationHandler(
  setPage: React.Dispatch<React.SetStateAction<number>>,
  currentPage: number,
  totalPages: number
) {
  return function handlePageChange(value: number | string) {
    if (value === "&laquo;" || value === "... ") setPage(1);
    else if (value === "&lsaquo;") {
      if (currentPage !== 1) setPage(currentPage - 1);
    } else if (value === "&rsaquo;") {
      if (currentPage !== totalPages) setPage(currentPage + 1);
    } else if (value === "&raquo;" || value === " ...") {
      setPage(totalPages);
    } else if (typeof value === "number") {
      setPage(value);
    }
  };
}
