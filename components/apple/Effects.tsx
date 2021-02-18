import { memo, useEffect, useRef } from "react";
import { extend, ReactThreeFiber, useFrame, useThree } from "react-three-fiber";
import { getDistortionShaderDefinition } from "resources/getDistortionShaderDefinition";
import { MathUtils } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

const HORIZONTAL_FOV = 140;

extend({ EffectComposer, RenderPass, ShaderPass });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      effectComposer: ReactThreeFiber.Object3DNode<
        EffectComposer,
        typeof EffectComposer
      >;
      renderPass: ReactThreeFiber.Object3DNode<RenderPass, typeof RenderPass>;
      shaderPass: ReactThreeFiber.Object3DNode<ShaderPass, typeof ShaderPass>;
    }
  }
}

export const Effects = memo(() => {
  const { aspect, camera, gl, scene, size } = useThree();
  const composerRef = useRef<EffectComposer>(null);

  useEffect(() => {
    if (composerRef.current) {
      composerRef.current.setSize(size.width, size.height);
    }
  }, [size]);

  useFrame(() => {
    if (composerRef.current) {
      composerRef.current.render();
    }
  }, 1);

  return (
    <effectComposer ref={composerRef} args={[gl]}>
      <renderPass attachArray={"passes"} args={[scene, camera]} />

      <shaderPass
        attachArray={"passes"}
        args={[getDistortionShaderDefinition()]}
        material-uniforms-strength-value={0.95}
        material-uniforms-height-value={
          Math.tan(MathUtils.degToRad(HORIZONTAL_FOV) / 2) / aspect
        }
        material-uniforms-aspectRatio-value={aspect}
        material-uniforms-cylindricalRatio-value={0.1}
      />
    </effectComposer>
  );
});
