// Logic for Sorting by field
export const sortedArrayFunc = (array, sortBy) => {
  if (sortBy === "pages") {
    return array.sort((a, b) => a.pages - b.pages);
  } else if (sortBy === "year") {
    return array.sort((a, b) => a.year - b.year);
  } else {
    return array;
  }
};

// Logic for Filtering
export const filterArrayFunc = (array, filterObj) => {
  const filteredValues = array.filter((obj) => {
    return Object.keys(filterObj).every((key) => {
      return filterObj[key].includes(obj[key]);
    });
  });
  return filteredValues;
};
