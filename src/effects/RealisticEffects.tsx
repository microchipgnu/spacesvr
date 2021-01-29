import { useFrame, useThree } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { useEffect, useRef } from "react";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";

export const RealisticEffects = () => {
  const { gl, scene, camera, size } = useThree();

  // composer
  const composer = useRef<EffectComposer>();
  useEffect(() => composer?.current?.setSize(size.width, size.height), [size]);

  // fxaa
  const fxaaPass = new ShaderPass(FXAAShader);
  const fxaaUniforms = fxaaPass.material.uniforms["resolution"];
  const pixelRatio = window ? window.devicePixelRatio : 2;
  fxaaUniforms.value.x = 1 / (size.width * pixelRatio);
  fxaaUniforms.value.y = 1 / (size.height * pixelRatio);

  useEffect(() => {
    if (!composer.current) return;

    fxaaPass.renderToScreen = true;
    composer.current.addPass(fxaaPass);
  }, []);

  useFrame(({ clock }) => {
    if (!composer.current) return;

    composer.current.render();
  }, 1);

  return (
    <>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass args={[scene, camera]} />
      </effectComposer>
    </>
  );
};
