import React from "react";
import PropTypes from "prop-types";

/* components */
import Modal from "./components/modal/Modal.jsx";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
/* components */

/* hooks */
import { useWeek } from "./hooks/useWeek.jsx";
import { useEvents } from "./hooks/useEvents.jsx";
import { useCreateEventModal } from "./hooks/useCreateEventModal.jsx";
/* hooks */

import "./common.scss";
import { useLanguage } from "./hooks/useLanguage.jsx";

const CreateEventModalWrapper = (props) =>
  props.state.show && <Modal {...props} />;

CreateEventModalWrapper.propTypes = {
  state: PropTypes.object,
  close: PropTypes.func,
  language: PropTypes.object,
  createEvent: PropTypes.func,
};

const App = () => {
  const week = useWeek();
  const events = useEvents();
  const language = useLanguage();
  const eventModal = useCreateEventModal();

  const createEvent = async (event) => {
    const isCreated = await events.createEvent(event);
    if (isCreated) eventModal.close();
  };

  return (
    <React.Fragment>
      <Header
        language={language}
        createEvent={createEvent}
        currentWeekDate={week.currentWeekDate}
        showCreateEventModal={eventModal.show}
        changeCurrentWeek={week.changeCurrentWeek}
      />
      <Calendar
        language={language}
        events={events.list}
        weekDates={week.weekDates}
        deleteEvent={events.deleteEvent}
        showCreateEventModal={eventModal.show}
      />
      <CreateEventModalWrapper
        language={language}
        close={eventModal.close}
        createEvent={createEvent}
        state={eventModal.state}
      />
    </React.Fragment>
  );
};

export default App;
