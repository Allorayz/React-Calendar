import React from 'react';
import PropTypes from 'prop-types';

/* components */
import Day from '../day/Day';
/* components */

import './week.scss';

const Week = ({ language, weekDates, events, deleteEvent, showCreateEventModal }) => {
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const currentDate = new Date(dayStart.getTime());
        const dayEnd = currentDate.setHours(dayStart.getHours() + 24);

        //getting all events from the day we will render
        const dateFromValid = event => event.dateFrom >= dayStart;
        const dateEndValid = event => event.dateTo <= dayEnd;

        const dayEvents = events.filter(event => dateFromValid(event) && dateEndValid(event));

        return (
          <Day
            dayDate={dayStart}
            language={language}
            dayEvents={dayEvents}
            key={dayStart.getDate()}
            deleteEvent={deleteEvent}
            dataDay={dayStart.getDate()}
            showCreateEventModal={showCreateEventModal}
          />
        );
      })}
    </div>
  );
};

Week.propTypes = {
  events: PropTypes.array,
  language: PropTypes.object,
  weekDates: PropTypes.array,
  deleteEvent: PropTypes.func,
  showCreateEventModal: PropTypes.func,
};

export default Week;
