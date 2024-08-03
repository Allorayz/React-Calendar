export const getItem = (key, fallback = "") =>
  JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
export const setItem = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
