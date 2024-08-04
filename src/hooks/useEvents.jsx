import { useEffect, useState } from "react";

import { parseDate } from "../gateway/parseDate";
import {
  getEvents,
  postEvent,
  deleteEvent as _deleteEvent,
  request,
} from "../utils/api";

const eventsRequestConfigs = {
  getEvents: () => ({
    responseFallback: [],
    replaceResponse: false,
    replaceFallback: null,
    requestCallback: () => getEvents(),
    errorFallback: "Events list fetching error!",
  }),
  deleteEvent: (id) => ({
    responseFallback: false,
    replaceResponse: false,
    replaceFallback: null,
    requestCallback: () => _deleteEvent(id),
    errorFallback: "Event didn't delete!",
  }),
  postEvent: (event) => ({
    responseFallback: false,
    replaceResponse: true,
    replaceFallback: true,
    requestCallback: () => postEvent(event),
    errorFallback: "Event didn't post!",
  }),
};

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [isPostFetching, setIsPostFetching] = useState(false);

  const waitToFetch = async (callback) => {
    if (isPostFetching) return;
    setIsPostFetching(true);

    const isCallbackFullfilled = await callback();
    if (isCallbackFullfilled) setIsPostFetching(false);

    return isCallbackFullfilled;
  };

  const eventCreationProcess = async (event) => {
    const dateRegex = /(\d{4}-(\d{2})-(\d{2}))/i;
    const dateMap = dateRegex.exec(event.date);

    const int = (str) => parseInt(str, 10);

    const dateKeys = { year: 1, month: 2, date: 3 };
    const dateParams = [
      int(dateMap[dateKeys.year]),
      int(dateMap[dateKeys.month]),
      int(dateMap[dateKeys.date]),
    ];

    /* correct month to utc format */
    dateParams[1] -= 1;

    const timeRegex = /(\d{2}):(\d{2})/i;
    const timeKeys = { hours: 1, minutes: 2 };

    const dateFromMap = timeRegex.exec(event.dateFrom);
    const dateFromParams = [
      int(dateFromMap[timeKeys.hours]),
      int(dateFromMap[timeKeys.minutes]),
    ];

    const dateToMap = timeRegex.exec(event.dateTo);
    const dateToParams = [
      int(dateToMap[timeKeys.hours]),
      int(dateToMap[timeKeys.minutes]),
    ];

    const getDateTemplate = (...timeParams) => {
      return new Date(...dateParams, ...timeParams);
    };

    const newEvent = {
      ...event,
      dateFrom: getDateTemplate(...dateFromParams),
      dateTo: getDateTemplate(...dateToParams),
    };

    delete newEvent.date;

    const newEventDateTo = parseDate(newEvent.dateTo);
    const newEventDateFrom = parseDate(newEvent.dateFrom);

    if (newEventDateTo.hours < newEventDateFrom.hours) {
      alert("The event cannot end before it starts.");
      return true;
    }

    if (newEventDateTo.hours - newEventDateFrom.hours > 6) {
      alert("The event cannot last longer than 6 hours.");
      return true;
    }

    const isOneDayAndOneTime = events.find((event) => {
      return isOneDayAndOneTimeEvent(event, newEvent);
    });

    if (isOneDayAndOneTime) {
      alert("This time is occupied by another event.");
      return true;
    }

    const isEventPosted = await request(
      eventsRequestConfigs.postEvent(newEvent),
    );

    if (isEventPosted) fetchEvents();

    return isEventPosted;
  };

  const isOneDayAndOneTimeEvent = (event, newEvent) => {
    const eventDateTo = parseDate(event.dateTo);
    const eventDateFrom = parseDate(event.dateFrom);
    const newEventDateFrom = parseDate(newEvent.dateFrom);

    const isOneDay =
      newEventDateFrom.year === eventDateFrom.year &&
      newEventDateFrom.month === eventDateFrom.month &&
      newEventDateFrom.day === eventDateFrom.day;

    return (
      (isOneDay &&
        newEventDateFrom.hours === eventDateFrom.hours &&
        newEventDateFrom.minutes === eventDateFrom.minutes) ||
      (isOneDay &&
        newEventDateFrom.hours >= eventDateFrom.hours &&
        newEventDateFrom.hours <= eventDateTo.hours &&
        newEventDateFrom.minutes <= eventDateTo.minutes)
    );
  };

  const createEvent = (event) => waitToFetch(() => eventCreationProcess(event));

  const isTimeRunningOut = (dateFrom) => {
    const eventDate = parseDate(dateFrom);
    const currentDate = parseDate(new Date());

    return (
      eventDate.hours === currentDate.hours &&
      currentDate.minutes + 15 >= eventDate.minutes
    );
  };

  const eventDeletionProcess = async (id) => {
    if (!id) return false;

    const event = events.find((event) => event.id === id);

    if (!event) {
      alert(`Event with id: ${id} does not found!`);
      return true;
    }

    if (isTimeRunningOut(event.dateFrom)) {
      alert("It is impossible to delete an event 15 minutes before it starts");
      return true;
    }

    await request(eventsRequestConfigs.deleteEvent(id));
    await fetchEvents();

    return true;
  };

  const deleteEvent = (id) => waitToFetch(() => eventDeletionProcess(id));

  const transformEventDates = (event) => ({
    ...event,
    dateTo: new Date(event.dateTo),
    dateFrom: new Date(event.dateFrom),
  });

  const fetchEvents = async () => {
    const events = await request(eventsRequestConfigs.getEvents());
    setEvents(events.map(transformEventDates));
    return events;
  };

  useEffect(fetchEvents, []);

  return {
    list: events,
    createEvent,
    deleteEvent,
  };
};
