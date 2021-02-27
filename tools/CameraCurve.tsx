import { memo } from "react";
import { curves } from "resources/apple/city_camera_curve_data";
import { BufferGeometry, LineBasicMaterial } from "three";
import { makeCurvePath } from "utils/curve-utils";

export const CameraCurve = memo(() => {
  const { points } = curves[0];
  const curvePath = makeCurvePath(points);
  const geom = new BufferGeometry().setFromPoints(
    curvePath.getSpacedPoints(20),
  );

  const material = new LineBasicMaterial({
    color: 0xff0000,
  });

  // Wrong line element from TS - it's three, not html/svg.
  // @ts-ignore
  return <line geometry={geom} material={material} />;
});
