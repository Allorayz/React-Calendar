import React from "react";
import PropTypes from "prop-types";

import { days } from "../../utils/dateUtils.js";
import { parseDate } from "../../gateway/parseDate.js";

const Navigation = ({ language, weekDates }) => {
  const currentDate = parseDate(new Date());

  const isCurrentDate = (date) => {
    const iterableDate = parseDate(date);
    return (
      currentDate.day === iterableDate.day &&
      currentDate.month === iterableDate.month &&
      currentDate.year === iterableDate.year
    );
  };

  const dayClassNames = (date) =>
    isCurrentDate(date)
      ? "calendar__day-label day-label day-label__current"
      : "calendar__day-label day-label day-label__other";
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => (
        <div key={dayDate.getTime()} className={dayClassNames(dayDate)}>
          <span className="day-label__day-name">
            {language.translation(days[dayDate.getDay()])}
          </span>
          <div className="day-label__day-number">{dayDate.getDate()}</div>
        </div>
      ))}
    </header>
  );
};

Navigation.propTypes = {
  language: PropTypes.object,
  weekDates: PropTypes.array,
};

export default Navigation;
