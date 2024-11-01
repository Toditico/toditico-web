import ModulesSelectionItem from './ModuleSelectionItem';
import { Module } from "@/types/shared";

type Props = {
  modules: Module[];
  selectedModuleId: string | null;
  onModuleSelected: (module: Module) => void;
};

export default function MultipleModuleSelectionItem({
  modules,
  selectedModuleId,
  onModuleSelected,
}: Props) {
  return (
    <div className="flex gap-4">
      {modules.map((module) => (
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
