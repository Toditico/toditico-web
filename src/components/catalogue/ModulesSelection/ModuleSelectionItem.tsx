"use client";

import { Module } from "@/types/shared";
import Image from "next/image";
import PlaceHolderImage from "@public/images/placeholder.webp";
import clsx from "clsx";

type Props = {
  module: Module;
  isSelected: boolean;
  onClick: (module: Module) => void;
};

export default function ModulesSelectionItem({
  module,
  isSelected,
  onClick,
}: Props) {
  return (
    <div
      onClick={() => {
        !isSelected && onClick(module);
      }}
      className={clsx("relative h-[320px] w-[320px] mx-auto grayscale", {
        "grayscale-0": isSelected,
      })}
      key={module._id}
    >
      <Image
        className="rounded-3xl"
        src={module.imageUrl || PlaceHolderImage}
        alt={module.name}
        fill
      />
    </div>
  );
}
