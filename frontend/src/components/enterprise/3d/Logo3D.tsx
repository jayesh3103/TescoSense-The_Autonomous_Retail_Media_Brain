"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useStore } from "@/lib/store";

function RotatingCrystal(props: any) {
  const mesh = useRef<any>(null);
  const [hovered, setHover] = useState(false);
  const { theme } = useStore();

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.5;
      mesh.current.rotation.y += delta * 0.2;
    }
  });

  const color = theme === 'dark' ? "#3B82F6" : "#2563EB";

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={hovered ? 1.2 : 1}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={hovered ? "#60A5FA" : color}
        wireframe
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

export default function Logo3D() {
  return (
    <div className="w-10 h-10">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <RotatingCrystal position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}
