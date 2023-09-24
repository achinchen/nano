export const getDateInfo = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = date.getDay();

  return {
    month,
    day,
    weekday,
  };
};
