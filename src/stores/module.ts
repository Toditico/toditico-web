import { localStorageIDs } from "@/constants/localStorage";
import { Module } from "@/types/shared";
import { create } from "zustand";

type ModuleState = {
  modules: Module[];
  selectedModule: Module | null;
  setSelectedModule: (module: Module) => void;
  setModules: (modules: Module[], moduleToSelect: string | null) => void;
};

export const useModuleStore = create<ModuleState>((set) => ({
  modules: [],
  selectedModule: null,
  setSelectedModule: (module) =>
    set(() => {
      localStorage.setItem(localStorageIDs.module, JSON.stringify(module._id));
      return { selectedModule: module };
    }),
  setModules: (modules, moduleToSelect) =>
    set((state) => {
      let { selectedModule } = state;
      if (moduleToSelect) {
        selectedModule =
          modules.find((module) => module._id === moduleToSelect) ?? modules[0];
      } else if (!selectedModule) {
        selectedModule = modules[0];
      }

      return {
        modules,
        selectedModule,
      };
    }),
}));
