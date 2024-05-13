"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import Placeholder from "../../../../public/images/placeholder.png";

type Props = {
  images: string[];
};

export default function ProductImages({ images }: Props) {
  const [selectedImageUrl, setSelectedImageUrl] = useState<
    string | StaticImageData
  >(Placeholder);

  useEffect(() => {
    if (typeof selectedImageUrl === "string") {
      return;
    }
    images.length && setSelectedImageUrl(images[0]);
  }, [images]);

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full h-[260px] relative">
        <Image
          src={selectedImageUrl}
          alt="Product image"
          fill
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
