export default function ContactBottomImage() {
  return (
    <div className="flex flex-col px-6 py-12 bg-contact-bottom h-[400px] bg-bottom justify-center items-center xl:py-[80px] xl:px-[80px]">
      <div className="mb-6">
        <p className="uppercase text-primary text-center text-contact-bottom-info font-black md:text-contact-bottom-info-tablet xl:text-contact-bottom-info-desktop">
          Rueda con
        </p>
        <div className="bg-primary px-6 py-3 uppercase text-white text-contact-bottom-info-trust text-center font-black md:text-contact-bottom-info-trust-tablet xl:text-contact-bottom-info-trust-desktop">
          confianza
        </div>
      </div>
      <p className="text-h3-tablet font-medium text-center text-white uppercase md:max-w-[540px] xl:text-h3-desktop xl:max-w-[600px]">
        SERVICIO SUPERIOR, PRECIOS JUSTOS, CALIDAD INSUPERABLE Y GARANTÍA QUE
        PERDURA.
      </p>
    </div>
  );
}
