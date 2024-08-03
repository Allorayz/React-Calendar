import React from "react";
import PropTypes from "prop-types";

/* components */
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import Navigation from "./../navigation/Navigation";
/* components */

import "./calendar.scss";

const Calendar = ({
  language,
  events,
  weekDates,
  deleteEvent,
  showCreateEventModal,
}) => {
  return (
    <section className="calendar">
      <Navigation language={language} weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            events={events}
            language={language}
            weekDates={weekDates}
            deleteEvent={deleteEvent}
            showCreateEventModal={showCreateEventModal}
          />
        </div>
      </div>
    </section>
  );
};

Calendar.propTypes = {
  events: PropTypes.array,
  language: PropTypes.object,
  weekDates: PropTypes.array,
  deleteEvent: PropTypes.func,
  showCreateEventModal: PropTypes.func,
};

export default Calendar;
