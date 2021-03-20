import { memo, Suspense, useMemo } from "react";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Thing } from "./Thing";

interface CityProps {}

const CityMesh = memo((props: CityProps) => {
  const { nodes } = useLoader(GLTFLoader, "/city.glb");
  const keys = Object.keys(nodes).filter((t) => t[0] === "$");
  const things = useMemo(
    () =>
      keys.map((key) => <Thing mesh={nodes[key] as THREE.Mesh} key={key} />),
    [keys.length],
  );

  return <>{things}</>;
});

export const City = memo((props: CityProps) => {
  return (
    <Suspense fallback={null}>
      <CityMesh {...props} />
    </Suspense>
  );
});
