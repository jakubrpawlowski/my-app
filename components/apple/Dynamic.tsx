import { City } from "components/apple/City";
import { Canvas } from "react-three-fiber";
import { Effects } from "./Effects";

export const Dynamic = () => (
  <Canvas>
    <City />
    <Effects />
  </Canvas>
);
