"use client";

import { Module } from "@/types/shared";
import Image from "next/image";
import PlaceHolderImage from "../../../../public/images/placeholder.png";

type Props = {
  module: Module;
};

export default function ModulesSelectionItem({ module }: Props) {
  return (
    <div className="relative h-[320px] w-[320px] mx-auto" key={module._id}>
      <Image className="rounded-3xl" src={module.imageUrl || PlaceHolderImage} alt={module.name} fill />
    </div>
  );
}
