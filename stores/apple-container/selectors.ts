import { ContainerState } from "./store";

export const scrollTopSelector = (state: ContainerState) => state.scrollTop;
export const setScrollTopSelector = (state: ContainerState) =>
  state.setScrollTop;
