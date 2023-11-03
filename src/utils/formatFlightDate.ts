const formatFlightDate = (date: string): string => {
  return date.split("T").join(" ");
};

export default formatFlightDate;
