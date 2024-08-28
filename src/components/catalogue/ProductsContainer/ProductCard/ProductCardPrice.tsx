"use client";

import { Currency } from "@/types/shared";

type Props = {
  originalPrice?: number;
  finalPrice: number;
  discount?: number;
  selectedCurrency: Currency;
};

export default function ProductCardPrice({
  discount,
  finalPrice,
  originalPrice,
  selectedCurrency,
}: Props) {
  return (
    <div className="flex flex-col max-w-[60%]">
      {originalPrice && discount ? (
        <div className="flex justify-between items-center gap-4">
          <p className="text-body-bold font-bold text-gray line-through">
            {originalPrice} {selectedCurrency.name}
          </p>
          <div className="bg-primary py-[2px] px-1 text-body-bold font-bold text-white">
            -{discount}%
          </div>
        </div>
      ) : null}
      <p className="text-primary text-h2-tablet font-bold whitespace-nowrap overflow-x-hidden text-ellipsis">
        {finalPrice} {selectedCurrency.name}
      </p>
    </div>
  );
}
