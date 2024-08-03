import React from 'react';
import PropTypes from 'prop-types';

/* components */
import Hour from '../hour/Hour';
/* components */

import { parseDate } from '../../gateway/parseDate';
import { generateArray } from '../../gateway/generateArray';

import './day.scss';

const Day = ({ 
	language, 
	dayDate, 
	dataDay, 
	dayEvents, 
	deleteEvent, 
	showCreateEventModal 
}) => {
  const hours = generateArray(24);

	const iterableDate	= parseDate(dayDate);
	const currentDate 	= parseDate(new Date());

	const checkIsShowRedLine = hour => (
		currentDate.day 	=== iterableDate.day 		&&
		currentDate.month === iterableDate.month 	&&
		currentDate.year 	=== iterableDate.year 	&&
		currentDate.hours === hour
	);

	const filterEventsByHour = hour => dayEvents
		.filter((event) => parseDate(event.dateFrom).hours === hour)
	;

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => (
				<Hour
					dataHour={hour}
					dayDate={dayDate}
					language={language}
					key={dataDay + hour} 
					deleteEvent={deleteEvent}
					hourEvents={filterEventsByHour(hour)}
					showRedLine={checkIsShowRedLine(hour)}
					showCreateEventModal={showCreateEventModal}
				/>
      ))}
    </div>
  );
};

Day.propTypes = {
	language: PropTypes.object,
	dayDate: PropTypes.object,
	dataDay: PropTypes.number,
	dayEvents: PropTypes.array,
	deleteEvent: PropTypes.func,
	showCreateEventModal: PropTypes.func,
};

export default Day;
