"use client";
import SwipeableViews from "react-swipeable-views";

import { Module } from "@/types/shared";
import { useEffect, useState } from "react";
import ModulesSelectionItem from "./ModuleSelectionItem";
import { MobileStepper, Skeleton } from "@mui/material";
import { useWindowSize } from "@/hooks/useWindowSize";
import { breakpoints } from "@/constants/breakpoints";
import MultipleModuleSelectionItem from "./MultipleModuleSelectionItem";

type Props = {
  modules: Module[];
  onModuleSelected: (module: Module) => void;
  selectedModule: Module | null;
};

export default function ModulesSelection({
  modules,
  onModuleSelected,
  selectedModule,
}: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const handleStepChanged = (step: number) => {
    setActiveStep(step);
  };
  const { width } = useWindowSize();

  const totalElementsToDisplay =
    width < breakpoints.tablet ? 1 : width < breakpoints.desktop ? 2 : 4;
  const steps = Math.ceil(modules.length / totalElementsToDisplay);

  const carrouselElements =
    totalElementsToDisplay === 1
      ? modules.map((module) => (
          <ModulesSelectionItem
            module={module}
            key={module._id}
            isSelected={module._id === selectedModule?._id}
            onClick={onModuleSelected}
          />
        ))
      : modules
          .slice(0, modules.length - 1)
          .map((module, index) =>
            index === modules.length - 1 ? undefined : (
              <MultipleModuleSelectionItem
                modules={modules}
                activeStep={activeStep}
                totalOfElementsToDisplay={totalElementsToDisplay}
                key={module._id}
                onModuleSelected={onModuleSelected}
                selectedModuleId={selectedModule?._id ?? null}
              />
            ),
          );

  useEffect(() => {
    if (selectedModule) {
      const index = modules.findIndex(
        (module) => module._id === selectedModule._id,
      );
      if (width < breakpoints.tablet) {
        setActiveStep(index);
        return;
      }
      setActiveStep(Math.floor(index / totalElementsToDisplay));
    }
  }, [selectedModule, steps]);

  return (
    <div
      className="flex flex-col gap-4 items-center max-w-[100vw] xl:max-w-full"
      id="modules-selection"
    >
      <>
        <SwipeableViews
          axis="x"
          index={activeStep}
          onChangeIndex={handleStepChanged}
          enableMouseEvents
          containerStyle={{ width: "100vw" }}
        >
          {carrouselElements}
        </SwipeableViews>
        <MobileStepper
          steps={steps}
          activeStep={activeStep}
          nextButton={null}
          backButton={null}
          position="static"
        ></MobileStepper>
      </>
    </div>
  );
}
