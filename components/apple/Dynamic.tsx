import { City } from "components/apple/City";
import { memo } from "react";
import { Canvas } from "react-three-fiber";
import { Camera } from "./Camera";
import { CameraCurve } from "./CameraCurve";
import { Effects } from "./Effects";

export const Dynamic = memo(() => (
  <Canvas>
    <City />
    <CameraCurve />
    <Camera />
    <Effects />
  </Canvas>
));
