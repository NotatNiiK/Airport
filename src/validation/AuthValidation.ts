class AuthValidation {
  public static email(inputValue: string): boolean {
    const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(inputValue);
  }

  public static password(inputValue: string): boolean {
    const passwordRegex: RegExp =
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,50}/;
    return passwordRegex.test(inputValue);
  }

  public static authPassword(inputValue: string): boolean {
    return inputValue.length > 5 ? true : false;
  }

  public static passportNumber(inputValue: string): boolean {
    const passportNumberRegExp: RegExp = /^\d{8}$/;
    return passportNumberRegExp.test(inputValue);
  }

  public static myContacts(inputValue: string): boolean {
    const phoneNumberRegex: RegExp = /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return phoneNumberRegex.test(inputValue);
  }
}

export default AuthValidation;
