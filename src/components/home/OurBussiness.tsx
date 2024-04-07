import OurBussinessCard from "./OurBussinessCard";

export default function OurBussiness() {
  const data: { label: "asociados" | "garantías" | "ofertas"; text: string }[] =
    [
      {
        label: "asociados",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.",
      },
      {
        label: "garantías",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.",
      },
      {
        label: "ofertas",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.",
      },
    ];

  return (
    <div className="px-6 py-12 md:px-[10px] md:pt-[48px] md:pb-[80px] md:w-[480px]">
      <p className="text-h1 text-primary font-bold text-center mb-6 md:mb-12 md:text-h1-tablet">En nuestro negocio</p>
      <div className="flex flex-col gap-4 items-center">
        {data.map(({ label, text }) => (
          <OurBussinessCard {...{ label, text }} key={label} />
        ))}
      </div>
    </div>
  );
}
