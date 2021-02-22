import { CubicBezierCurve3, CurvePath, Vector3 } from "three";

type Point = {
  coord: number[];
  right_handle: number[];
  left_handle: number[];
};

const unblenderizeAxis = ([x, y, z]: number[]) => [x, z, -y];

const unAx = (arr: number[], index: number) => {
  return unblenderizeAxis(arr)[index] / 100;
};

const vec = (arr: number[]) =>
  new Vector3(unAx(arr, 0), unAx(arr, 1), unAx(arr, 2));

const makeCubicBezierCurve3 = (point1: Point, point2: Point) => {
  const startingPoint = vec(point1.coord);
  const firstControlPoint = vec(point1.right_handle);
  const secondControlPoint = vec(point2.left_handle);
  const endingPoint = vec(point2.coord);

  return new CubicBezierCurve3(
    startingPoint,
    firstControlPoint,
    secondControlPoint,
    endingPoint,
  );
};

export const makeCurvePath = (arr: Point[]) => {
  const curvePath = new CurvePath<Vector3>();

  for (let i = 0; i < arr.length - 1; i++) {
    curvePath.add(makeCubicBezierCurve3(arr[i], arr[i + 1]));
  }

  return curvePath;
};
