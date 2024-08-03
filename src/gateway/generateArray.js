export const generateArray = (length = 0) =>
  Array(length)
    .fill()
    .map((val, index) => index);
