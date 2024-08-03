import axios from 'axios';
import config from './config';

export const initAxios = () => {
	axios.defaults.baseURL = config.baseApiUrl;
	axios.defaults.headers['Content-Type'] = 'application/json';

	axios.interceptors.response.use(response => response, error => ({
		...error,
		data: error.message,
		status: error.response.status,
	}));
}