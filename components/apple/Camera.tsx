import { memo, useEffect, useRef } from "react";
import { useThree } from "react-three-fiber";
import { scrollTopSelector } from "stores/apple-container/selectors";
import { useContainerStore } from "stores/apple-container/store";
import { PerspectiveCamera } from "three";

export const Camera = memo(() => {
  const cameraRef = useRef<PerspectiveCamera>(null);
  const scrollTopRef = useRef(useContainerStore.getState().scrollTop);
  const { setDefaultCamera } = useThree();

  // Make the camera known to the system
  useEffect(() => {
    if (cameraRef.current) {
      setDefaultCamera(cameraRef.current);
    }
  }, []);

  useEffect(
    () =>
      useContainerStore.subscribe(
        (scrollTop) => (scrollTopRef.current = scrollTop),
        scrollTopSelector,
      ),
    [],
  );

  return <perspectiveCamera ref={cameraRef} position={[0, 3, 60]} />;
});
