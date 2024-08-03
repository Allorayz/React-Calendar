import React from 'react';
import PropTypes from 'prop-types';

/* hooks */
import { useEvent } from './hooks/useEvent';
import { useEventMenu } from './hooks/useEventMenu';
import { useSubscription } from '../../hooks/useSubscription';
/* hooks */

import './event.scss';

const EventMenuWrapper = ({ showMenu, language, deleteEvent }) => showMenu && (
	<EventMenu
		language={language}
		deleteEvent={deleteEvent} 
	/>
);

EventMenuWrapper.propTypes = {
	showMenu: PropTypes.bool,
	language: PropTypes.object,
	deleteEvent: PropTypes.func,
}

const EventMenu = ({ language, deleteEvent }) => {
	const eventMenuClickHandler = event => {
		event.stopPropagation();
	}

	return(
		<div
			aria-hidden="true"
			className="event__menu"
			onClick={eventMenuClickHandler} 
		>
			<div
				aria-hidden="true"
				onClick={deleteEvent} 
				className="event__menu-option"
			>
				{language.translation('Delete')}
			</div>
		</div>
	);
};

EventMenu.propTypes = {
	language: PropTypes.object,
	deleteEvent: PropTypes.func,
};

const Event = ({ language, event, deleteEvent }) => {
	const eventMenu = useEventMenu();
	const eventEntry = useEvent(event);
	useSubscription(eventMenu.subscriptionConfig);

	const DELETE = () => {
		deleteEvent(event.id);
	};

  return (
    <React.Fragment>
			<div
				aria-hidden="true"
				style={eventEntry.style}
				onClick={eventEntry.click}
				className={eventEntry.classes}
				onContextMenu={eventMenu.show} 
			>
				<div className="event__title">
					{eventEntry.title}
				</div>
				<div className="event__time">
					{eventEntry.period}
				</div>
			</div>
			<EventMenuWrapper 
				language={language}
				deleteEvent={DELETE}
				showMenu={eventMenu.state.show}
			/>
		</React.Fragment>
  );
};

Event.propTypes = {
	event: PropTypes.object,
	language: PropTypes.object,
	deleteEvent: PropTypes.func,
};

export default Event;
