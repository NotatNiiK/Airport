class AuthValidation {
  public static email(inputValue: string): boolean {
    const emailRegExp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegExp.test(inputValue);
  }

  public static password(inputValue: string): boolean {
    const passwordRegExp: RegExp =
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,50}/;
    return passwordRegExp.test(inputValue);
  }

  public static authPassword(inputValue: string): boolean {
    return inputValue.length > 5 ? true : false;
  }

  public static passportNumber(inputValue: string): boolean {
    const passportNumberRegExp: RegExp = /^\d{8}$/;
    return passportNumberRegExp.test(inputValue);
  }

  public static myContacts(inputValue: string): boolean {
    const myContactsRegExp: RegExp = /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return myContactsRegExp.test(inputValue);
  }
}

export default AuthValidation;
