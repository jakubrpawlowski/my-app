import produce from "immer";
import create, { StateCreator } from "zustand";

export type ContainerState = {
  scrollTop: number;
  setScrollTop: (value: number) => void;
};

type CustomSetState = (fn: (draft: ContainerState) => void) => void;

const immer = (
  config: StateCreator<ContainerState, CustomSetState>,
): StateCreator<ContainerState> => (set, ...rest) =>
  config((fn) => set(produce(fn)), ...rest);

const createState: StateCreator<ContainerState, CustomSetState> = (set) => ({
  scrollTop: 5,
  setScrollTop: (value) =>
    set((draftState) => {
      draftState.scrollTop = value;
    }),
});

export const useContainerStore = create(immer(createState));
