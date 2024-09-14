export const returnPagiationRange = (
  totalPages: number,
  page: number,
  limit: number,
  siblings: number
): (number | string)[] => {
  const totalPagesNotInArray = 7 + siblings;
  
  if (totalPagesNotInArray >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1); // Tạo mảng từ 1 đến totalPages
  }

  const leftSiblingsIndex = Math.max(page - siblings, 1);
  const rightSiblingsIndex = Math.min(page + siblings, totalPages);

  const showLeftDots = leftSiblingsIndex > 2;
  const showRightDots = rightSiblingsIndex < totalPages - 2;

  if (!showLeftDots && showRightDots) {
    const leftItemsCount = 3 + 2 * siblings;
    const leftRange = Array.from({ length: leftItemsCount }, (_, i) => i + 1);
    return [...leftRange, " ...", totalPages];
  } else if (showLeftDots && !showRightDots) {
    const rightItemsCount = 3 + 2 * siblings;
    const rightRange = Array.from({ length: rightItemsCount }, (_, i) => totalPages - rightItemsCount + i + 1);
    return [1, "... ", ...rightRange];
  } else {
    const middleRange = Array.from({ length: rightSiblingsIndex - leftSiblingsIndex + 1 }, (_, i) => leftSiblingsIndex + i);
    return [1, "... ", ...middleRange, " ...", totalPages];
  }
};
