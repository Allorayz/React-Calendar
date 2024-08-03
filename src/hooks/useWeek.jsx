import { useState } from "react";

import { generateWeekRange, getWeekStartDate } from "../utils/dateUtils";

export const useWeek = () => {
  const [currentWeekDate, setCurrentWeekDate] = useState(new Date());
  const weekDates = generateWeekRange(getWeekStartDate(currentWeekDate));

  const changeCurrentWeek = (vector) => {
    let offsetWeekDate = new Date();
    const weekMiliseconds = 7 * 24 * 60 * 60 * 1000;
    const isOffset = vector === "prev" || vector === "next";
    const offset = vector === "prev" ? -weekMiliseconds : +weekMiliseconds;

    if (isOffset) offsetWeekDate = new Date(currentWeekDate.getTime() + offset);

    setCurrentWeekDate(offsetWeekDate);
  };

  return {
    weekDates,
    currentWeekDate,
    changeCurrentWeek,
  };
};
