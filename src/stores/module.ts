import { Module } from "@/types/shared";
import { create } from "zustand";

type ModuleState = {
  modules: Module[];
  selectedModule: Module | null;
  setSelectedModule: (module: Module) => void;
  setModules: (modules: Module[]) => void;
};

export const useModuleStore = create<ModuleState>((set) => ({
  modules: [],
  selectedModule: null,
  setSelectedModule: (module) =>
    set(() => {
      localStorage.setItem("module", JSON.stringify(module._id));
      return { selectedModule: module };
    }),
  setModules: (modules) =>
    set(() => {
      return {
        modules,
      };
    }),
}));
