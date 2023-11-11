function formatTicketDate(): string {
  const currentDate: Date = new Date();
  const day: number = currentDate.getDate();
  const month: number = currentDate.getMonth() + 1;
  const year: number = currentDate.getFullYear();
  const hours: number = currentDate.getHours();
  const minutes: number = currentDate.getMinutes();
  const formattedDate: string = `${day}.${month}.${year} ${hours}:${minutes}`;
  return formattedDate;
}

export default formatTicketDate;
