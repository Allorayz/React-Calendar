import { useEffect, useState } from "react";

import { getEvents, postEvent, deleteEvent as _deleteEvent, request } from "../utils/api";

const eventsRequestConfigs = {
	getEvents: () => ({
		responseFallback: [],
		replaceResponse: false,
		replaceFallback: null,
		requestCallback: () => getEvents(),
		errorFallback: 'Events list fetching error!',
	}),
	deleteEvent: id => ({
		responseFallback: false,
		replaceResponse: false,
		replaceFallback: null,
		requestCallback: () => _deleteEvent(id),
		errorFallback: 'Event didn\'t delete!',
	}),
	postEvent: event => ({
		responseFallback: false,
		replaceResponse: true,
		replaceFallback: true,
		requestCallback: () => postEvent(event),
		errorFallback: 'Event didn\'t post!',
	}),
};

export const useEvents = () => {
	const [events, setEvents] = useState([]);
	const [isPostFetching, setIsPostFetching] = useState(false);

	const waitToFetch = async (callback) => {
		if(isPostFetching) return;
		setIsPostFetching(true);

		const isCallbackFullfilled = await callback();
		if(isCallbackFullfilled) setIsPostFetching(false);

		return isCallbackFullfilled;
	}

	const eventCreationProcess = async event => {
		const dateRegex = /(\d{4}-(\d{2})-(\d{2}))/i;
		const dateMap = dateRegex.exec(event.date);

		const int = str => parseInt(str, 10);

		const dateKeys = { year: 1, month: 2, date: 3 };
		const dateParams = [ int(dateMap[dateKeys.year]), int(dateMap[dateKeys.month]), int(dateMap[dateKeys.date]) ];

		/* correct month to utc format */
		dateParams[1] -= 1;

		const timeRegex = /(\d{2}):(\d{2})/i;
		const timeKeys = { hours: 1, minutes: 2 };
		
		const dateFromMap = timeRegex.exec(event.dateFrom);
		const dateFromParams = [ int(dateFromMap[timeKeys.hours]), int(dateFromMap[timeKeys.minutes]) ];
		
		const dateToMap = timeRegex.exec(event.dateTo);
		const dateToParams = [ int(dateToMap[timeKeys.hours]), int(dateToMap[timeKeys.minutes]) ];

		const getDateTemplate = (...timeParams) => {
			return new Date(...dateParams, ...timeParams);
		};

		const newEvent = {
			...event,
			dateFrom: getDateTemplate(...dateFromParams),
			dateTo: getDateTemplate(...dateToParams),
		};

		delete newEvent.date;

		const isEventPosted = await request(eventsRequestConfigs.postEvent(newEvent));
		
		if(isEventPosted) fetchEvents();

		return isEventPosted;
	};

	const createEvent = event => waitToFetch(() => eventCreationProcess(event));

	const eventDeletionProcess = async id => {
		await request(eventsRequestConfigs.deleteEvent(id));
		fetchEvents();

		return true;
	}

	const deleteEvent = id => waitToFetch(() => eventDeletionProcess(id));

	const transformEventDates = event => ({
		...event,
		dateTo: new Date(event.dateTo),
		dateFrom: new Date(event.dateFrom),
	});

	const fetchEvents = async () => {
		const events = await request(eventsRequestConfigs.getEvents());
		setEvents(events.map(transformEventDates));
	};

	useEffect(fetchEvents, []);

	return {
		list: events,
		createEvent,
		deleteEvent,
	};
};