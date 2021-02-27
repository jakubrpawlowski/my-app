import { City } from "components/apple/City";
import { memo } from "react";
import { Canvas } from "react-three-fiber";
import { Camera } from "./Camera";
import { Effects } from "./Effects";

export const Dynamic = memo(() => (
  <Canvas>
    <City />
    <Camera />
    <Effects />
  </Canvas>
));
