import produce from "immer";
import { INITIAL_SCROLL_NORMALIZED } from "resources/apple/constants";
import create, { StateCreator } from "zustand";

export type ContainerState = {
  scrollNormalized: number;
  setScrollNormalized: (value: number) => void;
};

type CustomSetState = (fn: (draft: ContainerState) => void) => void;

const immer = (
  config: StateCreator<ContainerState, CustomSetState>,
): StateCreator<ContainerState> => (set, ...rest) =>
  config((fn) => set(produce(fn)), ...rest);

const createState: StateCreator<ContainerState, CustomSetState> = (set) => ({
  scrollNormalized: INITIAL_SCROLL_NORMALIZED,
  setScrollNormalized: (value) =>
    set((draftState) => {
      draftState.scrollNormalized = value;
    }),
});

export const useContainerStore = create(immer(createState));
