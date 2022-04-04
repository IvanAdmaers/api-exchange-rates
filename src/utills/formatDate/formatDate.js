/**
 * This function formats a date in YYYY-MM-DD format
 * 
 * @param {string} date - Date
 * @returns {string} Formatted date
 */
const formatDate = (date) => {
  const currentDate = new Date(date);

  let month = (currentDate.getMonth() + 1).toString();
  let day = currentDate.getDate().toString();
  const year = currentDate.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }

  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join('-');
};

export default formatDate;
