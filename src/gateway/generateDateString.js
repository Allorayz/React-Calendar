import { parseDate } from "./parseDate";
import { correctNumber } from "./correctNumber";
import { createEventModalInitialState } from "./createEventModalInitialState";

export const generateDateString = (date) => {
  const dateMap = parseDate(date);
  return `${correctNumber(dateMap.year)}-${correctNumber(dateMap.month + 1)}-${correctNumber(dateMap.day)}`;
};

export const generateCreateEventModalFormData = (date, hours) => {
  const parsedDate = parseDate(date);
  const resultHours = typeof hours === "number" ? hours : parsedDate.hours;
  return {
    ...createEventModalInitialState,
    date: generateDateString(parsedDate.date),
    dateFrom: `${correctNumber(resultHours)}:00`,
    dateTo: `${correctNumber(resultHours + 1)}:00`,
  };
};
