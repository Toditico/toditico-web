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
    <div className="flex flex-col gap-6 items-center">
      <p className="text-h1 text-primary font-bold">En nuestro negocio</p>
      {data.map(({ label, text }) => (
        <OurBussinessCard {...{ label, text }} />
      ))}
    </div>
  );
}
