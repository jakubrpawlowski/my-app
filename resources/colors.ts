export const greyscalePaletteCSS = {
  a: {
    1: "#f5f5f5",
    2: "#ebebeb",
    3: "#e0e0e0",
    4: "#d6d6d6",
    5: "#cccccc",
    6: "#c2c2c2",
  },
  b: {
    1: "#b8b8b8",
    2: "#adadad",
    3: "#a3a3a3",
    4: "#999999",
    5: "#8f8f8f",
    6: "#858585",
  },
  c: {
    1: "#7a7a7a",
    2: "#707070",
    3: "#666666",
    4: "#5c5c5c",
    5: "#525252",
    6: "#474747",
  },
  d: {
    1: "#3d3d3d",
    2: "#333333",
    3: "#292929",
    4: "#1f1f1f",
    5: "#141414",
    6: "#0a0a0a",
  },
};

export const uiPaletteCSS = {
  neumorphism: {
    background: greyscalePaletteCSS.a[3],
    highlight: greyscalePaletteCSS.a[1],
    shadow: greyscalePaletteCSS.a[6],
  },
  neumorphismDark: {
    background: greyscalePaletteCSS.d[4],
  },
};
