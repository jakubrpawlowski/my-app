import { memo, useEffect, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { curves } from "resources/apple/city_camera_curve_data";
import { scrollNormalizedSelector } from "stores/apple-container/selectors";
import { useContainerStore } from "stores/apple-container/store";
import { CurvePath, PerspectiveCamera, Vector3 } from "three";
import { makeCurvePath, makeGetPoint } from "utils/curve-utils";

// This component only CONSUMES scrollNormalized
export const Camera = memo(() => {
  const cameraRef = useRef<PerspectiveCamera>(null);
  // TODO: Curves may have to be used individually to ensure same time spent per curve
  const curvePathRef = useRef<CurvePath<Vector3>>(
    makeCurvePath(curves[0].points),
  );
  const { setDefaultCamera } = useThree();
  const scrollNormalized = useContainerStore(scrollNormalizedSelector);

  // Make the camera known to the system
  useEffect(() => {
    if (cameraRef.current) {
      setDefaultCamera(cameraRef.current);
    }
  }, []);

  const t0 = scrollNormalized;
  const t1 = scrollNormalized + 0.00001;
  const t2 = t1 > 1 ? 1 : t1;

  const pos = curvePathRef.current.getPoint(t0);
  const getPoint = makeGetPoint(curvePathRef.current);
  const posi = getPoint(t0);

  // Update the camera every frame
  useFrame(() => {
    if (cameraRef.current) {
      const pos2 = curvePathRef.current.getPoint(t2);
      const posi2 = getPoint(t2);

      // TODO lookAt may be an overkill
      // cameraRef.current.lookAt(pos2);
      cameraRef.current.lookAt(posi2);
      cameraRef.current.updateMatrixWorld();
    }
  });

  return <perspectiveCamera ref={cameraRef} position={posi} />;
});
