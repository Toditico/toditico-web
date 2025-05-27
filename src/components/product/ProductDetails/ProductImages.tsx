"use client";
import SwipeableViews from "react-swipeable-views";
import { MobileStepper } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import Placeholder from "@public/images/placeholder.webp";
import { nextImageUrl } from "@/utils/images";
import { useImagesModalStore } from "@/stores/imagesModal";
import { useWindowSize } from "@/hooks/useWindowSize";
import { breakpoints } from "@/constants/breakpoints";

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
  const { width } = useWindowSize();

  const [activeStep, setActiveStep] = useState(0);
  const handleStepChanged = (step: number) => {
    setActiveStep(step);
  };

  const totalElementsToDisplay = 4;
  const secondaryImages = images.slice(1);

  const openImagesModal = (index: number) => {
    setIndex(index);
    openModal();
  };

  const steps = Math.ceil(secondaryImages.length / totalElementsToDisplay);

  const groupedImages = [];

  if (totalElementsToDisplay > 1) {
    for (let i = 0; i < secondaryImages.length; i += totalElementsToDisplay) {
      groupedImages.push(secondaryImages.slice(i, i + totalElementsToDisplay));
    }
  }

  const carrouselElements = groupedImages.map((group, groupIndex) => (
    <div key={groupIndex} className="flex gap-2">
      {group.map((secondaryImage, imageIdx) => (
        <div
          key={secondaryImage}
          className="w-20 h-20 relative bg-white shadow-cart-images flex"
        >
          <Image
            src={secondaryImage}
            alt="Product secondary image"
            fill
            className="cursor-pointer"
            style={{ objectFit: "contain" }}
            onClick={() => openImagesModal(groupIndex * 4 + imageIdx + 1)}
          />
        </div>
      ))}
    </div>
  ));

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
    <div className="flex flex-col gap-2 xl:w-[500px] xl:flex-row-reverse xl:gap-4">
      <div className="w-full h-[320px] relative xl:h-[340px] xl:w-[412px]">
        <Image
          onClick={() => {
            openImagesModal(0);
          }}
          src={selectedImageUrl}
          alt="Product image"
          fill
          className="rounded-lg cursor-pointer"
          style={{ objectFit: "contain" }}
          quality={100}
        />
      </div>
      <div className="flex flex-col gap-6">
        {width < breakpoints.desktop ? (
          <>
            <SwipeableViews
              axis="x"
              index={activeStep}
              onChangeIndex={handleStepChanged}
              enableMouseEvents
              className="w-full"
              containerStyle={{ width: "100%" }}
            >
              {carrouselElements}
            </SwipeableViews>
            {steps > 1 && (
              <MobileStepper
                className="mx-auto"
                steps={steps}
                activeStep={activeStep}
                nextButton={null}
                backButton={null}
                position="static"
              ></MobileStepper>
            )}
          </>
        ) : (
          <div className="flex flex-col max-h-[300px] overflow-y-auto px-3 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb]:rounded-full">
            {secondaryImages.map((secondaryImage, idx) => (
              <div
                key={secondaryImage}
                className="w-20 h-20 relative bg-white flex-shrink-0"
              >
                <Image
                  src={secondaryImage}
                  alt="Product secondary image"
                  fill
                  className="cursor-pointer"
                  style={{ objectFit: "contain" }}
                  onClick={() => openImagesModal(idx)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
