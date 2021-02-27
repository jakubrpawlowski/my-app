import { ContainerState } from "./store";

export const scrollNormalizedSelector = (state: ContainerState) =>
  state.scrollNormalized;
export const setScrollNormalizedSelector = (state: ContainerState) =>
  state.setScrollNormalized;
