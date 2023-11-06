class FlightValidation {
  static departureTimeValue: Date = new Date();

  public static required(inputValue: string): boolean {
    return inputValue.length > 1 ? true : false;
  }

  public static departureTime(inputValue: string): boolean {
    FlightValidation.departureTimeValue = new Date(inputValue);
    return new Date(inputValue) >= new Date();
  }

  public static arrivalTime(inputValue: string): boolean {
    return new Date(inputValue) > FlightValidation.departureTimeValue;
  }

  public static price(inputValue: number): boolean {
    const stringPrice: string = String(inputValue);
    const priceRegExp: RegExp = /^[1-9]\d*$/;
    return priceRegExp.test(stringPrice);
  }
}

export default FlightValidation;
