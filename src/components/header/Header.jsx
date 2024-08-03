import React from "react";
import PropTypes from "prop-types";

/* components */
import Switch from "../switch/Switch";
/* components */

import { parseDate } from "../../gateway/parseDate";
import { getWeekStartDate, months } from "../../utils/dateUtils";

import "./header.scss";

const Header = ({
  language,
  showCreateEventModal,
  currentWeekDate,
  changeCurrentWeek,
}) => {
  const showPrevWeek = () => changeCurrentWeek("prev");
  const showNextWeek = () => changeCurrentWeek("next");
  const showCurrentWeek = () => changeCurrentWeek("current");

  const showCreateEventModalCallback = () => {
    showCreateEventModal();
  };

  const getCurrentWeekMonthPeriod = (date) => {
    const dayMiliseconds = 24 * 60 * 60 * 1000;
    const milisecondsToSunday = 6 * dayMiliseconds;
    const monday = parseDate(getWeekStartDate(date));
    const sunday = parseDate(new Date(monday.time + milisecondsToSunday));

    const mondayMonth = language.translation(months[monday.month]);
    const sundayMonth = language.translation(months[sunday.month]);

    let monthPeriod = `${mondayMonth} ${monday.year} — ${sundayMonth} ${sunday.year}`;

    if (mondayMonth === sundayMonth)
      monthPeriod = `${mondayMonth} ${monday.year}`;

    return monthPeriod;
  };

  return (
    <header className="header">
      <button
        className="button create-event-btn"
        onClick={showCreateEventModalCallback}
      >
        <i className="fas fa-plus create-event-btn__icon"></i>
        {language.translation("Create")}
      </button>
      <div className="navigation">
        <button
          onClick={showCurrentWeek}
          className="navigation__today-btn button"
        >
          {language.translation("Today")}
        </button>
        <button
          onClick={showPrevWeek}
          className="icon-button navigation__nav-icon"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          onClick={showNextWeek}
          className="icon-button navigation__nav-icon"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">
          {getCurrentWeekMonthPeriod(currentWeekDate)}
        </span>
      </div>
      <div className="header__language">
        <div className="header__language-switch">
          <Switch
            isChecked={language.isEnglish}
            check={language.changeLanguage}
            leftTitle={language.translation("UA")}
            rightTitle={language.translation("EN")}
          />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  language: PropTypes.object,
  changeCurrentWeek: PropTypes.func,
  currentWeekDate: PropTypes.object,
  showCreateEventModal: PropTypes.func,
};

export default Header;
