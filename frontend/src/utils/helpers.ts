export const getDaysInMonth = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);

  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = [];
  const currentDay = new Date(firstDayOfMonth);

  while (currentDay <= lastDayOfMonth) {
    daysInMonth.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  return daysInMonth;
};

export const isToday = (currDate: Date, givenDate: Date) =>
  givenDate.getFullYear() === currDate.getFullYear() &&
  givenDate.getMonth() === currDate.getMonth() &&
  givenDate.getDate() === currDate.getDate();
