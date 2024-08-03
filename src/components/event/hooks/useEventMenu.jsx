import { useState } from "react";

export const useEventMenu = () => {
	const [state, setState] = useState({ show: false });

	const show = (event) => {
		event.preventDefault();
		setState({ show: true });
	};

	const close = (event) => {
		const findEventElement = node => {
			if(!node) return false;

			const isEventElement = node.classList.contains('event');

			if(isEventElement) return true;

			return findEventElement(node.parentElement);
		};

		if(!findEventElement(event.target)) setState({ show: false }); 
	};

	const subscriptionConfig = { method: 'click', handler: close };
	
	return {
		state,
		show,
		close,
		subscriptionConfig,
	}
}