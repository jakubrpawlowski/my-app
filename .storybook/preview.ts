import { uiPaletteCSS } from "../resources/colors";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "light-theme",
    values: [
      {
        name: "light-theme",
        value: uiPaletteCSS["light-theme"][1],
      },
      {
        name: "dark-theme",
        value: uiPaletteCSS["dark-theme"][1],
      },
    ],
  },
};
