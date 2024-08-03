import { useState } from "react";
import { createEventModalInitialState } from "../gateway/createEventModalInitialState";

const initialState = {
	show: false,
	formData: createEventModalInitialState,
}

export const useCreateEventModal = () => {
	const [state, setState] = useState(initialState);

	const show = (formData = createEventModalInitialState) => {
		setState(prev => ({
			show: true,
			formData: {
				...prev.formData,
				...formData,
			}
		}));
	};

	const close = () => setState(prev => ({ ...prev, show: false }));

	return {
		state,
		show,
		close,
	}
}