export const greyscalePalette = {
  a: {
    1: 0xf5f5f5,
    2: 0xebebeb,
    3: 0xe0e0e0,
    4: 0xd6d6d6,
    5: 0xcccccc,
    6: 0xc2c2c2,
  },
  b: {
    1: 0xb8b8b8,
    2: 0xadadad,
    3: 0xa3a3a3,
    4: 0x999999,
    5: 0x8f8f8f,
    6: 0x858585,
  },
  c: {
    1: 0x7a7a7a,
    2: 0x707070,
    3: 0x666666,
    4: 0x5c5c5c,
    5: 0x525252,
    6: 0x474747,
  },
  d: {
    1: 0x3d3d3d,
    2: 0x333333,
    3: 0x292929,
    4: 0x1f1f1f,
    5: 0x141414,
    6: 0x0a0a0a,
  },
};

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
