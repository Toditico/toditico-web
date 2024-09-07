"use client";
import SwipeableViews from "react-swipeable-views";

import { Module } from "@/types/shared";
import { useEffect, useState } from "react";
import ModulesSelectionItem from "./ModuleSelectionItem";
import { MobileStepper, Skeleton } from "@mui/material";

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

  useEffect(() => {
    if (selectedModule) {
      setActiveStep(
        modules.findIndex((module) => module._id === selectedModule._id),
      );
    }
  }, [selectedModule]);

  return (
    <div className="flex flex-col gap-4 items-center max-w-[100vw]">
      {modules.length === 0 || !selectedModule ? (
        <>
          <Skeleton height={360} variant="rectangular" />
        </>
      ) : (
        <>
          <SwipeableViews
            axis="x"
            index={activeStep}
            onChangeIndex={handleStepChanged}
            enableMouseEvents
            containerStyle={{ width: "100vw" }}
          >
            {modules.map((module) => (
              <ModulesSelectionItem
                module={module}
                key={module._id}
                isSelected={module._id === selectedModule._id}
                onClick={onModuleSelected}
              />
            ))}
          </SwipeableViews>
          <MobileStepper
            steps={modules.length}
            activeStep={activeStep}
            nextButton={null}
            backButton={null}
            position="static"
          ></MobileStepper>
        </>
      )}
    </div>
  );
}
