function splitDate(date: string): string {
  return date.split("T").join(" ");
}

export default splitDate;
