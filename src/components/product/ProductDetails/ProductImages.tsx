"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import Placeholder from "@public/images/placeholder.webp";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import NextImageSlide from "@/components/layout/NextImageSlide";

type Props = {
  images: string[];
};

export default function ProductImages({ images }: Props) {
  const [selectedImageUrl, setSelectedImageUrl] = useState<
    string | StaticImageData
  >(Placeholder);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (typeof selectedImageUrl === "string") {
      return;
    }
    images.length && setSelectedImageUrl(images[0]);
  }, [images]);

  const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

  function nextImageUrl(src: string) {
    const width = deviceSizes.find(
      (deviceSize) => deviceSize > window.innerWidth,
    );
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=100`;
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full h-[320px] relative">
        <Image
          onClick={() => setOpenModal(true)}
          src={selectedImageUrl}
          alt="Product image"
          fill
          className="rounded-lg"
          style={{ objectFit: "contain" }}
          quality={100}
        />
        <Lightbox
          open={openModal}
          close={() => setOpenModal(false)}
          render={{ slide: NextImageSlide }}
          slides={[
            typeof selectedImageUrl === "string"
              ? { src: nextImageUrl(selectedImageUrl) }
              : selectedImageUrl,
          ]}
          plugins={[Zoom]}
	  zoom={{maxZoomPixelRatio: 3}}
        />
      </div>
    </div>
  );
}
