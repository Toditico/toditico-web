export default function ContactBottomImage() {
  return (
    <div className="flex flex-col px-6 py-12 bg-contact-bottom h-[400px] bg-bottom justify-center items-center">
      <div className="mb-6">
        <p className="uppercase text-primary text-center text-contact-bottom-info font-black md:text-contact-bottom-info-tablet">
          Rueda con
        </p>
        <div className="bg-primary px-6 py-3 uppercase text-white text-contact-bottom-info-trust text-center font-black md:text-contact-bottom-info-trust-tablet">
          confianza
        </div>
      </div>
      <p className="text-h3-tablet font-medium text-center text-white uppercase md:max-w-[540px]">
        SERVICIO SUPERIOR, PRECIOS JUSTOS, CALIDAD INSUPERABLE Y GARANTÍA QUE
        PERDURA.
      </p>
    </div>
  );
}
