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
  if (!text) {
    return null;
  }
  return (
    <p
      className={clsx("text-body font-bold uppercase self-center", {
        "text-low-stock": productStatus === "LOW_STOCK",
        "text-primary": productStatus === "NOT_AVAILABLE",
        "text-available": productStatus === "AVAILABLE",
      })}
    >
      {text}
    </p>
  );
}
