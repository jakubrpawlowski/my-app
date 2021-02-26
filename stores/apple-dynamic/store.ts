import produce from "immer";
import { greyscalePalette } from "resources/colors";
import { ConditionalEdgesShader } from "resources/missing-lines/ConditionalEdgesShader";
import { LineBasicMaterial, MeshBasicMaterial, ShaderMaterial } from "three";
import create, { StateCreator } from "zustand";

type AppleMaterials = {
  fillMaterial: MeshBasicMaterial;
  lineMaterial: LineBasicMaterial;
  conditionalMaterial: ShaderMaterial;
};

export type AppleState = {
  materials: AppleMaterials;
};

type CustomSetState = (fn: (draft: AppleState) => void) => void;

const immer = (
  config: StateCreator<AppleState, CustomSetState>,
): StateCreator<AppleState> => (set, ...rest) =>
  config((fn) => set(produce(fn)), ...rest);

const createState: StateCreator<AppleState, CustomSetState> = (set) => ({
  materials: {
    fillMaterial: new MeshBasicMaterial({
      polygonOffset: true,
      polygonOffsetFactor: 2,
      polygonOffsetUnits: 1,
      colorWrite: false,
    }),
    lineMaterial: new LineBasicMaterial({
      color: greyscalePalette.d[3],
    }),
    conditionalMaterial: new ShaderMaterial(ConditionalEdgesShader),
  },
});

export const useDynamicStore = create(immer(createState));
