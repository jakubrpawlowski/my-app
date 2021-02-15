import { memo, Suspense } from "react";
import { useLoader } from "react-three-fiber";
import { greyscalePalette } from "resources/colors";
import { ConditionalEdgesGeometry } from "resources/ConditionalEdgesGeometry";
import { ConditionalEdgesShader } from "resources/ConditionalEdgesShader";
import {
  EdgesGeometry,
  LineBasicMaterial,
  MeshBasicMaterial,
  ShaderMaterial,
} from "three";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface CityProps {}

const CityMesh = memo((props: CityProps) => {
  const { nodes } = useLoader(GLTFLoader, "/city.glb");
  const building = nodes.building as THREE.Mesh;

  const material = new MeshBasicMaterial({
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
    colorWrite: false,
  });

  // Threshold edges
  const edgesGeometry = new EdgesGeometry(building.geometry, 40);
  const lineMaterial = new LineBasicMaterial({
    color: greyscalePalette.d[3],
  });

  // Conditional edges
  const conditionalBuildingGeometry = building.geometry.clone();
  for (const key in conditionalBuildingGeometry.attributes) {
    if (key !== "position") {
      conditionalBuildingGeometry.deleteAttribute(key);
    }
  }
  const conditionalEdgesGeometry = new ConditionalEdgesGeometry(
    BufferGeometryUtils.mergeVertices(conditionalBuildingGeometry)
  );
  const conditionalMaterial = new ShaderMaterial(ConditionalEdgesShader);
  conditionalMaterial.uniforms.diffuse.value.set(greyscalePalette.d[3]);

  return (
    <>
      <mesh geometry={building.geometry} material={material} />
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
