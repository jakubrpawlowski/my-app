import { memo, useEffect, useRef } from "react";
import { useThree } from "react-three-fiber";
import { PerspectiveCamera } from "three";

export const Camera = memo(() => {
  const cameraRef = useRef<PerspectiveCamera>(null);
  const { setDefaultCamera } = useThree();

  // Make the camera known to the system
  useEffect(() => {
    if (cameraRef.current) {
      setDefaultCamera(cameraRef.current);
    }
  }, []);
  return <perspectiveCamera ref={cameraRef} position={[0, 3, 60]} />;
});
