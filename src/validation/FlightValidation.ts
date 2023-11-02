class FlightValidation {
  static departureTimeValue: Date = new Date();
  public static required(value: string): boolean {
    return value.length > 1 ? true : false;
  }
  public static departureTime(value: string): boolean {
    FlightValidation.departureTimeValue = new Date(value);
    return new Date(value) >= new Date();
  }
  public static arrivalTime(value: string): boolean {
    return (
      new Date(value) >= new Date() &&
      new Date(value) > FlightValidation.departureTimeValue
    );
  }
  public static isActive(value: string): string {
    return value;
  }
}

export default FlightValidation;
