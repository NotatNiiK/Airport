class BaggageValidation {
  public static dimensions(inputValue: string): boolean {
    const numberInputValue: number = +inputValue;
    return !isNaN(numberInputValue) && numberInputValue > 0;
  }
}

export default BaggageValidation;
