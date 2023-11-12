class FlightValidation {
  static departureTimeValue: Date = new Date();

  public static departureTime(inputValue: string): boolean {
    FlightValidation.departureTimeValue = new Date(inputValue);
    return new Date(inputValue) >= new Date();
  }

  public static arrivalTime(inputValue: string): boolean {
    return new Date(inputValue) > FlightValidation.departureTimeValue;
  }

  public static price(inputValue: number): boolean {
    const priceStringify: string = String(inputValue);
    const priceRegExp: RegExp = /^[1-9]\d*$/;
    return priceRegExp.test(priceStringify);
  }
}

export default FlightValidation;
