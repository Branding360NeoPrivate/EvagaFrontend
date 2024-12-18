export const extractDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);


  if (start > end) return [];

  const dates = [];
  while (start <= end) {
    dates.push(new Date(start).toISOString().split("T")[0]); // Format date as YYYY-MM-DD
    start.setDate(start.getDate() + 1); // Increment by one day
  }

  return dates;
};
