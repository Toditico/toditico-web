export const LaunchWhatsappApp = (phoneNumber: string, message: string) => {
  const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${normalizedPhoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
};

const normalizePhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/\+|\s/g, "");
};

export const whatsappGreetingMessage =
  "Hola, vengo desde el sitio web de TODITICO y me gustaría obtener más información. Podrían ayudarme por favor?";

export const whatsappProductsGreeetingMessage = "Hola, vengo desde el sitio web de TODITICO y estoy interesado en los siguientes productos: \n"
