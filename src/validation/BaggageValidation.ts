class BaggageValidation {
  public static number(inputValue: string): boolean {
    const numberInputValue: number = +inputValue;
    return !isNaN(numberInputValue) && numberInputValue > 0;
  }
}

export default BaggageValidation;
