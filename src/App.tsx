import { useRef } from "react";
import { Mesh, Texture, TextureLoader } from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewcube,
  GizmoViewport,
} from "@react-three/drei";
import image from "./assets/react.svg";
import "./index.css";

// The box will rotate on each frame
function AnimatedBox(): React.JSX.Element {
  // Reference to the box mesh
  const boxRef = useRef<Mesh | null>(null);
  // Load the texture
  const texture: Texture<HTMLImageElement> = useLoader(TextureLoader, image);

  // Rotate the box on each frame
  useFrame(() => {
    if (!boxRef.current) return;
    boxRef.current.rotation.x += 0.0025;
    boxRef.current.rotation.y += 0.0025;
    boxRef.current.rotation.z += 0.0025;
  });

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[3, 3, 3]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

function App(): React.JSX.Element {
  return (
    <div id="canvas-container">
      <Canvas className="canvas">
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
        <AnimatedBox />
        <directionalLight position={[1, 1, 2]} />
      </Canvas>
    </div>
  );
}

export default App;
