import ModulesSelectionItem from "./ModuleSelectionItem";
import { Module } from "@/types/shared";

type Props = {
  modules: Module[];
  selectedModuleId: string | null;
  onModuleSelected: (module: Module) => void;
  totalOfElementsToDisplay: number;
};

export default function MultipleModuleSelectionItem({
  modules,
  selectedModuleId,
  onModuleSelected,
  totalOfElementsToDisplay,
}: Props) {
  const groupedModules = [];

  // Group modules based on totalElementsToDisplay
  for (let i = 0; i < modules.length; i += totalOfElementsToDisplay) {
    groupedModules.push(modules.slice(i, i + totalOfElementsToDisplay));
  }

  return (
    <div className="flex gap-4 xl:max-w-[1500px] xl:mx-auto">
      {groupedModules.map((group, groupIndex) => (
        <div key={groupIndex}>
          {group.map((module) => (
            <ModulesSelectionItem
              module={module}
              key={module._id}
              isSelected={module._id === selectedModuleId}
              onClick={onModuleSelected}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
