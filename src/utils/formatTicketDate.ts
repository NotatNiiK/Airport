function formatTicketDate(): string {
  const currentDate: Date = new Date();
  const day: string = padZero(currentDate.getDate());
  const month: string = padZero(currentDate.getMonth() + 1);
  const year: number = currentDate.getFullYear();
  const hours: string = padZero(currentDate.getHours());
  const minutes: string = padZero(currentDate.getMinutes());

  const formattedDate: string = `${day}.${month}.${year} ${hours}:${minutes}`;
  return formattedDate;
}

function padZero(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}

export default formatTicketDate;
