"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import Placeholder from "@public/images/placeholder.webp";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import NextImageSlide from "@/components/layout/LightBox/NextImageSlide";
import { StyledLightBox } from "@/components/layout/LightBox/styles";

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

  // const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

  function nextImageUrl(src: string) {
    // const width = deviceSizes.find(
    //   (deviceSize) => deviceSize > window.innerWidth,
    // );
    return `/_next/image?url=${encodeURIComponent(src)}&w=1080&q=100`;
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full h-[320px] relative">
        <Image
          onClick={() => {
            images.length > 0 && setOpenModal(true);
          }}
          src={selectedImageUrl}
          alt="Product image"
          fill
          className="rounded-lg"
          style={{ objectFit: "contain" }}
          quality={100}
        />
        <StyledLightBox
          open={openModal}
          close={() => setOpenModal(false)}
          render={{
            slide: NextImageSlide,
            buttonNext: () => null,
            buttonPrev: () => null,
          }}
          slides={[
            typeof selectedImageUrl === "string"
              ? { src: nextImageUrl(selectedImageUrl) }
              : selectedImageUrl,
          ]}
          plugins={[Zoom]}
          zoom={{ maxZoomPixelRatio: 3 }}
        />
      </div>
    </div>
  );
}
