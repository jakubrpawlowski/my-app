import { memo, useCallback, useEffect, useState } from 'react';
import { greyscalePalette } from 'resources/colors';
import { ConditionalEdgesGeometry } from 'resources/missing-lines/ConditionalEdgesGeometry';
import { materialsSelector } from 'stores/apple-dynamic/selectors';
import { useDynamicStore } from 'stores/apple-dynamic/store';
import { EdgesGeometry } from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

interface ClickableThingProps {
  mesh: THREE.Mesh;
  listId: string;
}

export const ClickableThing = memo((props: ClickableThingProps) => {
  const { listId, mesh } = props;
  console.log(listId);
  const { geometry } = mesh;
  const [hovered, setHovered] = useState(false);

  const {
    conditionalMaterial,
    fillMaterial,
    fillMaterialHover,
    lineMaterial,
  } = useDynamicStore(materialsSelector);

  useEffect(() => {
    document.body.style.cursor =
      listId === '#sign' && hovered ? 'pointer' : 'auto';
  }, [hovered]);

  // Threshold edges
  const edgesGeometry = new EdgesGeometry(geometry, 40);

  // Conditional edges
  const conditionalGeometry = geometry.clone();
  for (const key in conditionalGeometry.attributes) {
    if (key !== 'position') {
      conditionalGeometry.deleteAttribute(key);
    }
  }
  const conditionalEdgesGeometry = new ConditionalEdgesGeometry(
    BufferGeometryUtils.mergeVertices(conditionalGeometry),
  );

  const clickHandler = useCallback(() => {
    window.open('https://www.linkedin.com/in/jakubrpawlowski/', '_blank');
  }, []);

  conditionalMaterial.uniforms.diffuse.value.set(greyscalePalette.d[3]);

  // https://threejs.org/docs/#api/en/materials/Material.colorWrite
  // renderOrder is needed here to guarantee back edges occlusion
  return (
    <>
      <mesh
        geometry={geometry}
        material={
          listId === '#sign' && hovered ? fillMaterialHover : fillMaterial
        }
        onClick={clickHandler}
        onPointerOver={() => {
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
        renderOrder={1}
      />
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
