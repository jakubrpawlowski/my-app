import { uiPaletteCSS } from "../resources/colors";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "light-theme",
    values: [
      {
        name: "light-theme",
        value: uiPaletteCSS.neumorphism.background,
      },
      {
        name: "dark-theme",
        value: uiPaletteCSS.neumorphismDark.background,
      },
    ],
  },
};
