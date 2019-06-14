export const sortRows = (initialRows: any[], sortColumn, sortDirection) =>{
  const comparer = (a, b) => {
    if (sortDirection === "ASC") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  };
  return [...initialRows].sort(comparer);
};