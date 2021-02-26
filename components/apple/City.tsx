import { memo, Suspense } from "react";
import { useLoader } from "react-three-fiber";
import { greyscalePalette } from "resources/colors";
import { ConditionalEdgesGeometry } from "resources/missing-lines/ConditionalEdgesGeometry";
import { materialsSelector } from "stores/apple-dynamic/selectors";
import { useDynamicStore } from "stores/apple-dynamic/store";
import { EdgesGeometry } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils.js";

interface CityProps {}

const CityMesh = memo((props: CityProps) => {
  const { nodes } = useLoader(GLTFLoader, "/city.glb");
  const building = nodes.building as THREE.Mesh;

  const { conditionalMaterial, fillMaterial, lineMaterial } = useDynamicStore(
    materialsSelector,
  );

  // Threshold edges
  const edgesGeometry = new EdgesGeometry(building.geometry, 40);

  // Conditional edges
  const conditionalBuildingGeometry = building.geometry.clone();
  for (const key in conditionalBuildingGeometry.attributes) {
    if (key !== "position") {
      conditionalBuildingGeometry.deleteAttribute(key);
    }
  }
  const conditionalEdgesGeometry = new ConditionalEdgesGeometry(
    BufferGeometryUtils.mergeVertices(conditionalBuildingGeometry),
  );
  conditionalMaterial.uniforms.diffuse.value.set(greyscalePalette.d[3]);

  return (
    <>
      <mesh geometry={building.geometry} material={fillMaterial} />
      <lineSegments geometry={edgesGeometry} material={lineMaterial} />
      <lineSegments
        geometry={conditionalEdgesGeometry}
        material={conditionalMaterial}
      />
    </>
  );
});

export const City = memo((props: CityProps) => {
  return (
    <Suspense fallback={null}>
      <CityMesh {...props} />
    </Suspense>
  );
});
