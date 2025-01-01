import ModulesSelectionItem from "./ModuleSelectionItem";
import { Module } from "@/types/shared";

type Props = {
  modules: Module[];
  selectedModuleId: string | null;
  onModuleSelected: (module: Module) => void;
  activeStep: number;
  totalOfElementsToDisplay: number;
};

export default function MultipleModuleSelectionItem({
  modules,
  selectedModuleId,
  onModuleSelected,
  totalOfElementsToDisplay,
  activeStep,
}: Props) {
  const modulesToDisplay = modules
    .slice(activeStep * totalOfElementsToDisplay)
    .slice(0, totalOfElementsToDisplay);

  return (
    <div className="flex gap-4 xl:max-w-[1500px] xl:mx-auto">
      {modulesToDisplay.map((module) => (
        <ModulesSelectionItem
          key={module?._id}
          module={module}
          isSelected={module?._id === selectedModuleId}
          onClick={onModuleSelected}
        />
      ))}
    </div>
  );
}
