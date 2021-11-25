import "../../styles.css";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "three-stdlib";
import { Suspense, useRef, useState } from "react";
import Loading from "../project/Loading";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const Scene = ({ url }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const materials = useLoader(MTLLoader, "models/Poimandres.mtl");
  let obj = null;
  obj = useLoader(OBJLoader, url, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  return obj ? (
    <mesh
      ref={meshRef}
      onPointerDown={(e) => setHovered(true)}
      onPointerOut={(e) => setHovered(false)}
    >
      <ambientLight intensity={0.2} />
      <spotLight position={[100, 100, 100]} angle={0.15} penumbra={1} />
      <spotLight position={[-100, -100, -100]} angle={-0.15} penumbra={1} />
      <primitive object={obj} scale={0.008} />
      <meshPhysicalMaterial
        attach="material"
        color={hovered ? "red" : "gray"}
        wireframe
      />
    </mesh>
  ) : (
    <Loading message={"Loading model"} />
  );
};

export default function ThreeScene({ url }) {
  return (
    <Suspense fallback={null}>
      <Scene url={url} />
      <OrbitControls />
    </Suspense>
  );
}
