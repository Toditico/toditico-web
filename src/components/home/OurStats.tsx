import OurStatsCard from "./OurStatsCard";

export default function OurStats() {
  const data: { type: "sales" | "customers" | "products"; number: number }[] = [
    {
      type: "sales",
      number: 4500,
    },
    {
      type: "customers",
      number: 2000,
    },
    {
      type: "products",
      number: 600,
    },
  ];

  return (
    <div className="flex flex-col gap-6 items-center px-6">
      <p className="text-h1 text-primary font-bold text-center">
        Nuestros logros en números
      </p>
      {data.map(({ type, number }) => (
        <OurStatsCard {...{ type, number }} key={type} />
      ))}
    </div>
  );
}
