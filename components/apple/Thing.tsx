import { memo } from "react";
import { greyscalePalette } from "resources/colors";
import { ConditionalEdgesGeometry } from "resources/missing-lines/ConditionalEdgesGeometry";
import { materialsSelector } from "stores/apple-dynamic/selectors";
import { useDynamicStore } from "stores/apple-dynamic/store";
import { EdgesGeometry } from "three";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils.js";

interface ThingProps {
  mesh: THREE.Mesh;
}

export const Thing = memo((props: ThingProps) => {
  const { mesh } = props;
  const { geometry } = mesh;

  const { conditionalMaterial, fillMaterial, lineMaterial } = useDynamicStore(
    materialsSelector,
  );

  // Threshold edges
  const edgesGeometry = new EdgesGeometry(geometry, 40);

  // Conditional edges
  const conditionalGeometry = geometry.clone();
  for (const key in conditionalGeometry.attributes) {
    if (key !== "position") {
      conditionalGeometry.deleteAttribute(key);
    }
  }
  const conditionalEdgesGeometry = new ConditionalEdgesGeometry(
    BufferGeometryUtils.mergeVertices(conditionalGeometry),
  );

  conditionalMaterial.uniforms.diffuse.value.set(greyscalePalette.d[3]);

  // https://threejs.org/docs/#api/en/materials/Material.colorWrite
  // renderOrder is needed here to guarantee back edges occlusion
  return (
    <>
      <mesh geometry={geometry} material={fillMaterial} renderOrder={1} />
      <lineSegments
        geometry={edgesGeometry}
        material={lineMaterial}
        renderOrder={2}
      />
      <lineSegments
        geometry={conditionalEdgesGeometry}
        material={conditionalMaterial}
        renderOrder={2}
      />
    </>
  );
});
