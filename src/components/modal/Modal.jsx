import React, { useState } from "react";
import PropTypes from "prop-types";

import { createEventModalInitialState } from "../../gateway/createEventModalInitialState";

import "./modal.scss";

const timeRegex = /\d{2}:\d{2}/i;

const validationRules = {
  title: {
    rule: (value) => !!value,
    exception: "Fill 'title' field",
  },
  description: {
    rule: () => true,
    exception: "",
  },
  dateTo: {
    rule: (value) => timeRegex.test(value),
    exception: "Fill 'dateTo' field",
  },
  dateFrom: {
    rule: (value) => timeRegex.test(value),
    exception: "Fill 'dateFrom' field",
  },
  date: {
    rule: (value) => /\d{4}-\d{2}-\d{2}/i.test(value),
    exception: "Fill 'date' field",
  },
};

const Modal = ({ language, state, close, createEvent }) => {
  const [formData, setFormData] = useState(
    state.formData || createEventModalInitialState,
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = [];

    for (let key in validationRules) {
      if (!validationRules[key].rule(formData[key])) {
        errors.push(validationRules[key].exception);
      }
    }

    if (errors.length) return errors.forEach((error) => alert(error));

    createEvent(formData);
  };

  const handleField = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button onClick={close} className="create-event__close-btn">
            +
          </button>
          <form onSubmit={handleSubmit} className="event-form">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleField}
              className="event-form__field"
              placeholder={language.translation("Title")}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleField}
                className="event-form__field"
              />
              <input
                type="time"
                name="dateFrom"
                onChange={handleField}
                value={formData.dateFrom}
                className="event-form__field"
              />
              <span>-</span>
              <input
                type="time"
                name="dateTo"
                onChange={handleField}
                value={formData.dateTo}
                className="event-form__field"
              />
            </div>
            <textarea
              name="description"
              onChange={handleField}
              value={formData.description}
              className="event-form__field"
              placeholder={language.translation("Description")}
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              {language.translation("Create")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  close: PropTypes.func,
  state: PropTypes.object,
  language: PropTypes.object,
  createEvent: PropTypes.func,
};

export default Modal;
