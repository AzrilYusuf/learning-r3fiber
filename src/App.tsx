import { useRef } from "react";
import {
  Mesh,
  Texture,
  TextureLoader,
  // SpotLightHelper,
  // Object3D
} from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewcube,
  GizmoViewport,
  // useHelper,
  useGLTF,
} from "@react-three/drei";
// import { useControls } from "leva";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import image from "./assets/react.svg";
import "./index.css";

function LightWithHelper(): React.JSX.Element {
  // const lightRef = useRef<Object3D | null>(null);

  // useHelper(lightRef, SpotLightHelper, "white");

  return (
    <>
      /* A spotlight with a helper to visualize its position and direction
      penumbral angle is set to 1 for a soft edge */
      {/* <spotLight
        ref={lightRef}
        intensity={90}
        position={[2, 5, 1]}
        angle={Math.PI / 5}
        penumbra={0.2}
        castShadow
      /> */}
      <directionalLight position={[1, 1, 2]} />
      {/* <ambientLight intensity={2} /> */}
      {/* <pointLight intensity={50} position={[2,5,1]} /> */}
    </>
  );
}

function Room(): React.JSX.Element {
  const result = useGLTF("/room-studio.glb");
  return <primitive object={result.scene} />;
}

// The box will rotate on each frame
function AnimatedBox(): React.JSX.Element {
  // Reference to the box mesh
  const boxRef = useRef<Mesh | null>(null);
  // Load the texture
  const texture: Texture<HTMLImageElement> = useLoader(TextureLoader, image);

  // Leva controls for speed
  // const { speed }: { speed: number } = useControls({
  //   speed: {
  //     value: 0.0025,
  //     min: 0.0,
  //     max: 0.01,
  //     step: 0.0005,
  //   }
  // });

  // Rotate the box on each frame
  useFrame(() => {
    if (!boxRef.current) return;
    boxRef.current.rotation.x += 0.0025;
    boxRef.current.rotation.y += 0.0025;
    boxRef.current.rotation.z += 0.0025;
  });

  return (
    <mesh ref={boxRef} castShadow>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function App(): React.JSX.Element {
  return (
    <div id="canvas-container">
      <Canvas className="canvas" shadows>
        {/* Helper */}
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewcube />
          <GizmoViewport
            axisColors={["red", "green", "blue"]}
            labelColor="black"
          />
        </GizmoHelper>
        <axesHelper args={[10]} />
        <gridHelper args={[20, 30]} />
        {/* Orbit Camera */}
        <OrbitControls />
        <LightWithHelper />
        <AnimatedBox />
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -3, 0]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <Room />
      </Canvas>
    </div>
  );
}

export default App;
