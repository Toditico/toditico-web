"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import Placeholder from "@public/images/placeholder.webp";
import { nextImageUrl } from "@/utils/images";
import { useImagesModalStore } from "@/stores/imagesModal";

type Props = {
  images: string[];
};

export default function ProductImages({ images }: Props) {
  const [selectedImageUrl, setSelectedImageUrl] = useState<
    string | StaticImageData
  >(Placeholder);
  const openModal = useImagesModalStore((state) => state.openModal);
  const setSlides = useImagesModalStore((state) => state.setSlides);
  const setIndex = useImagesModalStore((state) => state.setIndex);

  const secondaryImages = images.slice(1);

  const openImagesModal = (index: number) => {
    setIndex(index);
    openModal();
  };

  useEffect(() => {
    if (typeof selectedImageUrl === "string") {
      return;
    }
    images.length && setSelectedImageUrl(images[0]);
  }, [images]);

  useEffect(() => {
    setSlides(
      images.map((imageData) =>
        typeof imageData === "string"
          ? { src: nextImageUrl(imageData) }
          : imageData,
      ),
    );
  }, [images]);

  return (
    <div className="flex flex-col gap-2 xl:w-[500px]">
      <div className="w-full h-[320px] relative xl:h-[340px] xl:w-[412px]">
        <Image
          onClick={() => {
            openImagesModal(0);
          }}
          src={selectedImageUrl}
          alt="Product image"
          fill
          className="rounded-lg"
          style={{ objectFit: "contain" }}
          quality={100}
        />
      </div>
      <div className="flex gap-6 flex-wrap">
        {secondaryImages.map((secondaryImage, index) => (
          <div
            key={secondaryImage}
            className="w-20 h-20 relative bg-white shadow-cart-images"
          >
            <Image
              src={secondaryImage}
              alt="Product secondary image"
              fill
              style={{ objectFit: "contain" }}
              onClick={() => openImagesModal(index + 1)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
