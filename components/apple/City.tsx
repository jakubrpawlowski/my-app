import { memo, Suspense } from "react";
import { useLoader } from "react-three-fiber";
import { greyscalePalette } from "resources/colors";
import { MeshBasicMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface CityProps {}

const CityMesh = memo((props: CityProps) => {
  const { nodes } = useLoader(GLTFLoader, "/city.glb");
  const building = nodes.building as THREE.Mesh;

  const material = new MeshBasicMaterial({
    color: greyscalePalette.c[3],
  });

  return <mesh geometry={building.geometry} material={material}></mesh>;
});

export const City = memo((props: CityProps) => {
  return (
    <Suspense fallback={null}>
      <CityMesh {...props} />
    </Suspense>
  );
});
