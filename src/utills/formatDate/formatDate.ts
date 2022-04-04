/**
 * This function formats a date in YYYY-MM-DD format
 */
const formatDate = (date: string) => {
  const currentDate: Date = new Date(date);

  let month: string = (currentDate.getMonth() + 1).toString();
  let day: string = currentDate.getDate().toString();
  const year: number = currentDate.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }

  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join('-');
};

export default formatDate;
