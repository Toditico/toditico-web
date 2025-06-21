import { Currency } from "@/types/shared";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  originalPrice?: number;
  finalPrice: number;
  discount?: number;
  selectedCurrency: Currency;
};

export default function ProductPrice({
  discount,
  finalPrice,
  originalPrice,
  selectedCurrency,
}: Props) {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    setShowSkeleton(true);
  }, [selectedCurrency]);

  useEffect(() => {
    setShowSkeleton(false);
  }, [finalPrice]);

  return showSkeleton ? (
    <Skeleton variant="rectangular" height={40} width={150}></Skeleton>
  ) : (
    <div className="flex flex-col">
      {originalPrice && discount ? (
        <div className="flex justify-between">
          <p className="text-body-bold font-bold text-discount line-through">
            {originalPrice} {selectedCurrency.name}
          </p>
          <div className="bg-primary py-[2px] px-1 text-body-bold font-bold text-white">
            -{discount}%
          </div>
        </div>
      ) : null}
      <p className="text-primary text-h2-desktop font-bold">
        {finalPrice} {selectedCurrency.name}
      </p>
    </div>
  );
}
