export const LaunchWhatsappApp = (phoneNumber: string, message: string) => {
  const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${normalizedPhoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
};

const normalizePhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/\+|\s/g, "");
};
