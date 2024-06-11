"use client";

import { Currency } from "@/types/shared";

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
  // INFO Need to add the kit section and the product status
  return (
    <div className="flex flex-col">
      {originalPrice && discount && (
        <div className="flex justify-between">
          <p className="text-body-bold font-bold text-gray line-through">
            ${originalPrice}
          </p>
          <div className="bg-primary py-[2px] px-1 text-body-bold font-bold text-white">
            -{discount}%
          </div>
        </div>
      )}
      <p className="text-primary text-h2-desktop font-bold">
        {finalPrice} {selectedCurrency.name}
      </p>
    </div>
  );
}
