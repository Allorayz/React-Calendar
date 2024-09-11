import React from 'react';
import PropTypes from 'prop-types';

/* hooks */
import { useEvent } from './hooks/useEvent';
import { useEventMenu } from './hooks/useEventMenu';
import { useSubscription } from '../../hooks/useSubscription';
/* hooks */

import './event.scss';

const Event = ({ language, event, deleteEvent }) => {
  const eventMenu = useEventMenu();
  const eventEntry = useEvent(event);
  useSubscription(eventMenu.subscriptionConfig);

  const DELETE = () => {
    deleteEvent(event.id);
  };

  return (
    <div
      aria-hidden="true"
      style={eventEntry.style}
      onClick={eventEntry.click}
      className="event"
      onContextMenu={eventMenu.show}
    >
      <div className={eventEntry.classes}>
        <div className="event__title">{eventEntry.title}</div>
        <div className="event__time">{eventEntry.period}</div>{' '}
      </div>
      <div className="event__description">{eventEntry.description}</div>
      <div className="event__menu">
        <div aria-hidden="true" onClick={DELETE} className="event__menu-option">
          {language.translation('Delete')}
        </div>
      </div>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.object,
  language: PropTypes.object,
  deleteEvent: PropTypes.func,
};

export default Event;
