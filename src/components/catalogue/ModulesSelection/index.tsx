"use client";
import SwipeableViews from "react-swipeable-views";

import { Module } from "@/types/shared";
import { useEffect, useState } from "react";
import ModulesSelectionItem from "./ModuleSelectionItem";
import { MobileStepper } from "@mui/material";
import { useWindowSize } from "@/hooks/useWindowSize";
import { breakpoints } from "@/constants/breakpoints";

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

  const groupedModules = [];

  if (totalElementsToDisplay > 1) {
    for (let i = 0; i < modules.length; i += totalElementsToDisplay) {
      groupedModules.push(modules.slice(i, i + totalElementsToDisplay));
    }
  }

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
      : groupedModules.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="flex gap-4 xl:max-w-[1500px] xl:mx-auto"
          >
            {group.map((module) => (
              <ModulesSelectionItem
                module={module}
                key={module._id}
                isSelected={module._id === selectedModule!._id}
                onClick={onModuleSelected}
              />
            ))}
          </div>
        ));

  useEffect(() => {
    if (selectedModule && width > 0) {
      const index = modules.findIndex(
        (module) => module._id === selectedModule._id,
      );
      if (width < breakpoints.tablet) {
        setActiveStep(index);
        return;
      }
      setActiveStep(Math.floor(index / totalElementsToDisplay));
    }
  }, [selectedModule, steps, width]);

  if (modules.length === 4) {
    modules.push({ _id: "jdshfjkds73", name: "Aceites Lubricantes y Otros" });
  }

  return (
    <div
      className="flex flex-col gap-4 items-center max-w-[100vw] xl:max-w-full"
      id="modules-selection"
    >
      {width < breakpoints.desktop ? (
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
      ) : (
        <div className="flex gap-3 items-center max-w-[1400px] overflow-x-auto py-3 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb]:rounded-full">
          {modules.map((module) => (
            <div key={module._id} className="flex-shrink-0">
              <ModulesSelectionItem
                module={module}
                isSelected={module._id === selectedModule!._id}
                onClick={onModuleSelected}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
