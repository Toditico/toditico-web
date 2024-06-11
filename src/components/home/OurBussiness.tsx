import OurBussinessCard from "./OurBussinessCard";

export default function OurBussiness() {
  const data: { label: "asociados" | "garantías" | "ofertas"; text: string }[] =
    [
      {
        label: "asociados",
        text: "Contamos con un sistema de asociados. Los interesados en formar parte de esta amplia comunidad, pueden ubicar nuestra tienda para obtener su identificación y comenzar a disfrutar de los beneficios que esto conlleva. Contáctenos para más detalles.",
      },
      {
        label: "garantías",
        text: "En función de una compra segura, ofrecemos garantía postventa. Para tal servicio, contamos con una red de talleres y mecánicos de confianza. Contáctenos para más detalles.",
      },
      {
        label: "ofertas",
        text: "Manténgase al tanto de nuestras ofertas especiales en fechas señaladas, no deje pasar esta excelente oportunidad de disfrutar de un descuento comercial en todos o algunos de nuestros productos.",
      },
    ];

  return (
    <div className="px-6 py-12 md:px-[10px] md:pt-[48px] md:pb-[80px] md:w-[480px] xl:mx-auto xl:max-w-[1472px] xl:w-auto">
      <p className="text-h1 text-primary font-bold text-center mb-6 md:mb-12 md:text-h1-tablet xl:text-h2-desktop">
        En nuestro negocio
      </p>
      <div className="flex flex-col gap-4 items-strecth xl:flex-row xl:items-stretch">
        {data.map(({ label, text }) => (
          <OurBussinessCard {...{ label, text }} key={label} />
        ))}
      </div>
    </div>
  );
}
