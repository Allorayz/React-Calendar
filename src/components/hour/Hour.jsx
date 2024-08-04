import React from "react";
import PropTypes from "prop-types";

/* components */
import Event from "../event/Event";
/* components */

import { parseDate } from "../../gateway/parseDate";
import { generateCreateEventModalFormData } from "../../gateway/generateDateString";

import "./hour.scss";

const RedLine = ({ show }) => {
  const currentDate = parseDate(new Date());
  const styles = { marginTop: `${currentDate.minutes}px` };

  return show && <div className="redline" style={styles} />;
};

RedLine.propTypes = {
  show: PropTypes.bool,
};

const Hour = ({
  language,
  dataHour,
  hourEvents,
  deleteEvent,
  dayDate,
  showRedLine,
  showCreateEventModal,
}) => {
  const handleTimeSlotClick = () => {
    showCreateEventModal(generateCreateEventModalFormData(dayDate, dataHour));
  };

  const generateTimeSlotStyles = (event) => {
    const dateFrom = parseDate(event.dateFrom);
    return { marginTop: dateFrom.minutes };
  };

  return (
    <div
      aria-hidden="true"
      data-time={dataHour + 1}
      onClick={handleTimeSlotClick}
      className="calendar__time-slot"
    >
      <RedLine show={showRedLine} />
      {hourEvents.map((event) => (
        <div
          key={event.id}
          style={generateTimeSlotStyles(event)}
          className="calendar__time-slot_event"
        >
          <Event event={event} language={language} deleteEvent={deleteEvent} />
        </div>
      ))}
    </div>
  );
};

Hour.propTypes = {
  language: PropTypes.object,
  dayDate: PropTypes.object,
  showRedLine: PropTypes.bool,
  dataHour: PropTypes.number,
  deleteEvent: PropTypes.func,
  hourEvents: PropTypes.array,
  showCreateEventModal: PropTypes.func,
};

export default Hour;
