import Image from "next/image";
import brand from "../../../public/brand.svg";

export default function ContactUs() {
  const email = "toditicocuba@gmail.com";
  const address = "Ave 21/ 44 y 46 #4418, Playa, La Habana. Cuba";
  const phones = "+53 50745857 / +53 53476207";
  const time = "Todos los días de 9:00 am - 5:00 pm";
  return (
    <div className="bg-gray py-12 px-6 flex flex-col gap-[10px] items-center xl:flex-row xl:px-12 xl:justify-between">
      <Image src={brand} alt="Toditico Logo" className="xl:w-[240px]" />
      <div className="flex flex-col gap-4 text-center xl:text-left">
        <p className="text-body-bold font-bold uppercase">contáctenos</p>
        <div className="flex flex-col gap-2">
          <p className="text-body">{email}</p>
          <p className="text-body">{address}</p>
          <p className="text-body">{phones}</p>
          <p className="text-body">{time}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 text-center xl:text-left xl:max-w-[300px]">
        <p className="mt-2 text-body-bold font-bold uppercase">Rueda con confianza</p>
        <p className="text-body">Servicio superior, precios justos, calidad insuperable y garantía que perdura.</p>
      </div>
    </div>
  );
}
