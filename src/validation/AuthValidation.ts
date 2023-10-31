class AuthValidation {
  public static fullName(value: string): boolean {
    return value.length > 1 ? true : false;
  }
  public static email(value: string): boolean {
    const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(value);
  }
  public static password(value: string): boolean {
    const passwordRegex: RegExp =
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,50}/;
    return passwordRegex.test(value);
  }
  public static passportNumber(value: string): boolean {
    return value.length > 1 ? true : false;
  }
  public static myContacts(value: string): boolean {
    const phoneNumberRegex: RegExp = /^(?:\+?38|38)?\d{12}$/;
    return phoneNumberRegex.test(value);
  }
}

export default AuthValidation;
