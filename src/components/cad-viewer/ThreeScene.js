import "../../styles.css";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "three-stdlib";
import { Suspense, useRef, useState } from "react";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const Scene = () => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const materials = useLoader(MTLLoader, "models/Poimandres.mtl");
  const obj = useLoader(
    OBJLoader,
    // "models/AA00001155784_DO_ASSY SUPPORT ANTENNA 02.obj",
    // "models/ASSY SUPPORT.obj",
    // "models/2 BENDS.obj",
    // "models/2 BENDS INV.obj",
    // "models/Complete.obj",
    // "models/AA00001185070_EO_ASSY SUPPOR HVAC.obj",
    // "models/90.obj",
    // "models/inside bends bending sequence.obj",
    // "models/n bending sequence.obj",
    // "models/Part 90 degreevvvvs.obj",
    // "models/Part29.obj",
    // "models/S_bend (copy).obj",
    // "models/S-sharp part.obj",
    "models/STAR BENDING SEQUENCE.obj",
    // "models/T bending sequence.obj",
    // "models/Z bending sequence.obj",
    (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    }
  );

  // console.log(obj);
  return (
    <mesh
      ref={meshRef}
      onPointerDown={(e) => setHovered(true)}
      onPointerOut={(e) => setHovered(false)}
    >
      {/* <OrbitControls />
      <ambientLight />
      <spotLight position={[100, 100, 100]} /> */}
      <ambientLight intensity={0.2} />
      <spotLight position={[100, 100, 100]} angle={0.15} penumbra={1} />
      {/* <pointLight position={[-10, -10, -10]} /> */}
      <primitive object={obj} scale={0.002} />
      <meshPhysicalMaterial
        attach="material"
        color={hovered ? "red" : "gray"}
        wireframe
      />
    </mesh>
  );
};

export default function ThreeScene() {
  return (
    <div>
      <Canvas
        style={{
          // display: "flex",
          // backgroundColor: "#220",
          height: "100%",
          width: "100%",
          margin: 0,
          top: "auto",
          left: "auto",
          right: "auto",
          bottom: "0px",
        }}
      >
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls />
          {/* <Environment preset="sunset" background /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}
