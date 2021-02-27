import { memo, useEffect, useRef } from "react";
import { useThree } from "react-three-fiber";
import { scrollNormalizedSelector } from "stores/apple-container/selectors";
import { useContainerStore } from "stores/apple-container/store";
import { PerspectiveCamera } from "three";

// This component only CONSUMES scrollNormalized
export const Camera = memo(() => {
  const cameraRef = useRef<PerspectiveCamera>(null);
  const scrollNormalizedRef = useRef(
    useContainerStore.getState().scrollNormalized,
  );
  const { setDefaultCamera } = useThree();

  // Make the camera known to the system
  useEffect(() => {
    if (cameraRef.current) {
      setDefaultCamera(cameraRef.current);
    }
  }, []);

  useEffect(
    () =>
      useContainerStore.subscribe((scrollTop) => {
        scrollNormalizedRef.current = scrollTop;
        console.log(`scrollNormalizedRef.current`, scrollNormalizedRef.current); // TODO remove this
      }, scrollNormalizedSelector),
    [],
  );

  return <perspectiveCamera ref={cameraRef} position={[0, 3, 60]} />;
});
