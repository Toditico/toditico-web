import { ProductStatus } from "@/types/shared";
import clsx from "clsx";

type Props = {
  productStatus: ProductStatus;
};

export default function ProductCardStatus({ productStatus }: Props) {
  const text =
    productStatus === "AVAILABLE"
      ? ""
      : productStatus === "LOW_STOCK"
        ? "Pocas existencias"
        : "No Disponible";
  return (
    <div className="h-[22px]">
      <p
        className={clsx("text-body font-bold uppercase self-center", {
          "text-low-stock": productStatus === "LOW_STOCK",
          "text-primary": productStatus === "NOT_AVAILABLE",
          "text-available": productStatus === "AVAILABLE",
        })}
      >
        {text}
      </p>
    </div>
  );
}
