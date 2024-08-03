import { parseDate } from "./parseDate";
import { correctNumber } from "./correctNumber";

export const generateDateString = (date) => {
  const dateMap = parseDate(date);
  return `${correctNumber(dateMap.year)}-${correctNumber(dateMap.month + 1)}-${correctNumber(dateMap.day)}`;
};
