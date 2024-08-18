export const ascCompare = <T>(v1: T, v2: T) => {
  if (v1 < v2) {
    return -1;
  }

  if (v1 > v2) {
    return 1;
  }

  return 0;
};
