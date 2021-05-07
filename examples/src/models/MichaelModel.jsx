import { DRACO_URL } from "../../../src/services";
import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";

const MichaelModel = (props) => {
  const gltf = useGLTF(
    "https://d27rt3a60hh1lx.cloudfront.net/models/Michael-1613184104/michael1.glb",
    DRACO_URL
  );

  const group = useRef();

  useEffect(() => {
    if (group.current) {
      group.current.traverse((child) => (child.frustumCulled = false));
    }
  }, []);

  return (
    <group ref={group} {...props}>
      <primitive object={gltf.scene} />
    </group>
  );
};

export default MichaelModel;
