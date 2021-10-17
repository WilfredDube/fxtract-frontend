import * as THREE from "three";
import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Stage } from "@react-three/drei";
import { MTLLoader, OBJLoader, DDSLoader } from "three-stdlib";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

function Model(props) {
  const materials = useLoader(MTLLoader, "../../../test/Part90.mtl");
  const obj = useLoader(OBJLoader, "../../../test/Part90.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  return <primitive object={obj} {...props} />;
}

export default function ViewerCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 0], fov: 60 }}>
      <Suspense fallback={null}>
        <Stage>
          <Model />
        </Stage>
      </Suspense>
    </Canvas>
  );
}
