export const parseDate = (date) => {
  const dateTime = date.getTime();
  const dateDay = date.getDate();
  const dateMonth = date.getMonth();
  const dateHours = date.getHours();
  const dateMinutes = date.getMinutes();
  const dateYear = date.getUTCFullYear();

  return {
    date,
    time: dateTime,
    day: dateDay,
    month: dateMonth,
    hours: dateHours,
    minutes: dateMinutes,
    year: dateYear,
  };
};
