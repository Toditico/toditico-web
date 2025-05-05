import SwipeableViews from "react-swipeable-views";

import { Inventory } from "@/types/shared";
import { useEffect, useState } from "react";
import { MobileStepper } from "@mui/material";
import { useWindowSize } from "@/hooks/useWindowSize";
import InventoryCard from "./InventoryCard";
import clsx from "clsx";
import { breakpoints } from "@/constants/breakpoints";

type Props = {
  inventories: Inventory[];
  onInventorySelected: (inventory: Inventory) => void;
  selectedInventory: Inventory | null;
};

export default function InventoriesSelection({
  inventories,
  onInventorySelected,
  selectedInventory,
}: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const handleStepChanged = (step: number) => {
    setActiveStep(step);
  };
  const { width } = useWindowSize();

  const totalElementsToDisplay = 2;
  const steps = Math.ceil(inventories.length / totalElementsToDisplay);

  const groupedModules = [];

  if (totalElementsToDisplay > 1) {
    for (let i = 0; i < inventories.length; i += totalElementsToDisplay) {
      groupedModules.push(inventories.slice(i, i + totalElementsToDisplay));
    }
  }

  const carrouselElements = groupedModules.map((group, groupIndex) => (
    <div
      key={groupIndex}
      className={clsx("flex gap-4 max-w-[100%] mx-auto justify-around")}
    >
      {group.map((inventory) => (
        <InventoryCard
          inventory={inventory}
          key={inventory._id}
          onClick={onInventorySelected}
          isSelected={inventory._id === selectedInventory?._id}
        />
      ))}
    </div>
  ));

  useEffect(() => {
    if (selectedInventory && width > 0) {
      const index = inventories.findIndex(
        (inventory) => inventory._id === selectedInventory._id,
      );
      setActiveStep(Math.floor(index / totalElementsToDisplay));
    }
  }, [selectedInventory, steps, width]);

  return (
    <div className="flex flex-col gap-4 items-center max-w-[100%]">
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
              steps={steps}
              activeStep={activeStep}
              nextButton={null}
              backButton={null}
              position="static"
            ></MobileStepper>
          )}
        </>
      ) : (
        <div className="flex gap-3 items-center overflow-x-auto w-full py-3 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb]:rounded-full">
          {inventories.map((inventory) => (
            <div key={inventory._id} className="flex-shrink-0">
              <InventoryCard
                inventory={inventory}
                onClick={onInventorySelected}
                isSelected={inventory._id === selectedInventory?._id}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
