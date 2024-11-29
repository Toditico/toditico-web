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

  const steps =
    width < breakpoints.tablet ? modules.length : modules.length - 1;

  const carrouselElements =
    width < breakpoints.tablet
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
                modules={[module, modules[index + 1]]}
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
      setActiveStep(index >= steps ? steps - 1 : index);
    }
  }, [selectedModule, steps]);

  return (
    <div className="flex flex-col gap-4 items-center max-w-[100vw]" id="modules-selection">
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
