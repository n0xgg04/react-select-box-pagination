const generatePaginationRange = (currentPage: number, totalPages: number) => {
  const range: (number | string)[] = [];
  const maxVisible = 7;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
    return range;
  }

  range.push(1);

  if (currentPage <= 4) {
    for (let i = 2; i <= Math.min(5, totalPages - 1); i++) {
      range.push(i);
    }
    if (totalPages > 5) {
      range.push("...");
    }
  } else if (currentPage >= totalPages - 3) {
    if (totalPages > 5) {
      range.push("...");
    }
    for (let i = Math.max(totalPages - 4, 2); i <= totalPages - 1; i++) {
      range.push(i);
    }
  } else {
    range.push("...");
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      range.push(i);
    }
    range.push("...");
  }

  range.push(totalPages);
  return range;
};

export default generatePaginationRange;
