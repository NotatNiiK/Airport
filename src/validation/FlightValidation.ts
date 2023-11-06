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
    return new Date(value) > FlightValidation.departureTimeValue;
  }

  public static price(value: number): boolean {
    const price: string = String(value);
    const piceRegExp: RegExp = /^[1-9]\d*$/;
    return piceRegExp.test(price);
  }

  public static isActive(value: string): string {
    return value;
  }
}

export default FlightValidation;
