import axios from "axios";

export const statuses = {
  success: 200,
  created: 201,
};

const isRequestSuccess = (status) =>
  status === statuses.success || status === statuses.created;

/* CRUD Methods */
const GET = (url) => axios.get(url);
const POST = (url, data) => axios.post(url, data);
const DELETE = (url) => axios.delete(url);

/* Request wrapper */
export const request = async (config) => {
  const response = await config.requestCallback();

  if (isRequestSuccess(response.status)) {
    return config.replaceResponse ? config.replaceFallback : response.data;
  }

  alert(config.errorFallback);
  return config.responseFallback;
};

/* Events */
export const getEvents = () => GET("/events");
export const postEvent = (data) => POST("/events", data);
export const deleteEvent = (id) => DELETE(`/events/${id}`);
