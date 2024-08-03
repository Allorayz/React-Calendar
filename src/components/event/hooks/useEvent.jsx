import { parseDate } from "../../../gateway/parseDate";
import { correctNumber } from "../../../gateway/correctNumber";

export const useEvent = (event) => {
	const dateTo = parseDate(new Date(event.dateTo));
	const dateFrom = parseDate(new Date(event.dateFrom));
	
	const height = (dateTo.time - dateFrom.time) / (1000 * 60);

  const style = { height };

	const startPeriod = `${correctNumber(dateFrom.hours)}:${correctNumber(dateFrom.minutes)}`;
	const endPeriod = `${correctNumber(dateTo.hours)}:${correctNumber(dateTo.minutes)}`;

	const period = `${startPeriod} - ${endPeriod}`;

	const classes = height > 60
		? 'event event-full'
		: 'event event-mini'
	;

	const click = (event) => {
		event.stopPropagation();
	};

	return {
		...event,
		classes,
		period,
		style,
		click,
	}
}