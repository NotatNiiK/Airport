function getRawPhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, "");
}

export default getRawPhoneNumber;
