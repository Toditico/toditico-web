import SwipeableViews from "react-swipeable-views";

import { Inventory } from "@/types/shared";
import { useEffect, useState } from "react";
import { MobileStepper } from "@mui/material";
import { useWindowSize } from "@/hooks/useWindowSize";
import { breakpoints } from "@/constants/breakpoints";
import InventoryCard from "./InventoryCard";
import clsx from "clsx";

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
      className={clsx("flex gap-4 max-w-[312px] mx-auto justify-around")}
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
    <div className="flex flex-col gap-4 items-center max-w-[312px]">
      <>
        <SwipeableViews
          axis="x"
          index={activeStep}
          onChangeIndex={handleStepChanged}
          enableMouseEvents
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
    </div>
  );
}
