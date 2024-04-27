import { IconReportAnalytics } from "@tabler/icons-react";
import { IconMoodDollar } from "@tabler/icons-react";
import { IconBoxSeam } from "@tabler/icons-react";

type Props = {
  type: "sales" | "customers" | "products";
  number: number;
};
export default function OurStatsCard({ type, number }: Props) {
  const getCircleContent = (type: "sales" | "customers" | "products") => {
    return type === "sales" ? (
      <IconReportAnalytics width={80} height={80} />
    ) : type === "customers" ? (
      <IconMoodDollar width={80} height={80} />
    ) : (
      <IconBoxSeam width={80} height={80} />
    );
  };
  const getCardText = (type: "sales" | "customers" | "products") => {
    return type === "sales"
      ? "Ventas"
      : type === "customers"
      ? "Clientes satisfechos"
      : "Piezas disonibles en stock";
  };

  return (
    <div className="flex flex-col items-center shadow-lg xl:min-w-[400px]">
      <div className="w-[160px] h-[160px] rounded-full flex items-center justify-center text-white text-number-card font-black bg-primary">
        {getCircleContent(type)}
      </div>
      <div className="px-6 py-6 flex flex-col gap-[10px] items-center">
        <p className="text-h1 font-bold uppercase text-primary md:text-h1-tablet">{`+${number}`}</p>
        <div className="w-[80px] h-[4px] rounded bg-primary"></div>
        <p className="text-button font-normal text-center uppercase md:text-body">
          {getCardText(type)}
        </p>
      </div>
    </div>
  );
}
