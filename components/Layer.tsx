import { CSSProperties, PropsWithChildren } from "react";
import { alpha } from "utils/alpha";
import { uiPaletteCSS } from "../resources/colors";

export interface LayerProps {}

export const Layer = (props: PropsWithChildren<LayerProps>) => {
  return <div style={neumorphism.container}>{props.children}</div>;
};

interface Theme {
  container: CSSProperties;
}

const neumorphism: Theme = {
  container: {
    backgroundColor: uiPaletteCSS.neumorphism.background,
    height: 300,
    width: 300,
    margin: 50,
    // actual
    border: `1px solid ${alpha(0.2)(uiPaletteCSS.neumorphism.highlight)}`,
    borderRadius: 8,
    boxShadow: `8px -8px 16px 0 ${alpha(0.8)(
      uiPaletteCSS.neumorphism.highlight,
    )}, -8px 8px 16px 0 ${alpha(0.8)(uiPaletteCSS.neumorphism.shadow)}`,
  },
};

const neumorphismDark: Theme = {
  container: {
    ...neumorphism.container,
    backgroundColor: uiPaletteCSS.neumorphismDark.background,
    // actual
  },
};
