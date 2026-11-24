"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function ParticleOrbit({ reduced }: { reduced: boolean }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const random = seededRandom(42);
    const count = 520;
    const array = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const radius = 2.2 + random() * 2.2;
      array[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      array[index * 3 + 2] = radius * Math.cos(phi);
    }
    return array;
  }, []);

  useFrame((_, delta) => {
    if (!points.current || reduced) return;
    points.current.rotation.y += delta * 0.025;
    points.current.rotation.x -= delta * 0.008;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#eef4df"
        size={0.018}
        transparent
        opacity={0.62}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Sculpture({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { viewport, pointer } = useThree();
  const compact = viewport.width < 7;
  const baseX = compact ? 1.1 : 1.65;
  const baseY = compact ? 1.15 : 0;
  const scale = compact ? 0.58 : 1;

  useFrame((state, delta) => {
    if (!group.current) return;
    const scroll = Math.min(1, window.scrollY / Math.max(window.innerHeight, 1));
    const easing = reduced ? 1 : 1 - Math.exp(-delta * 3.5);
    const targetX = reduced ? 0.15 : pointer.y * 0.25 + scroll * 0.5;
    const targetY = reduced ? -0.35 : pointer.x * 0.38 + state.clock.elapsedTime * 0.08;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, easing);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, easing);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, baseY + scroll * 1.15, easing);
    group.current.rotation.z = reduced ? -0.18 : -0.18 + scroll * 0.4;
  });

  return (
    <group ref={group} position={[baseX, baseY, 0]} scale={scale}>
      <mesh rotation={[0.3, -0.35, -0.18]}>
        <torusKnotGeometry args={[1.12, 0.35, 160, 28, 2, 3]} />
        <MeshDistortMaterial
          color="#d2ff3f"
          roughness={0.2}
          metalness={0.58}
          distort={reduced ? 0.12 : 0.28}
          speed={reduced ? 0 : 1.25}
          emissive="#354410"
          emissiveIntensity={0.18}
        />
      </mesh>
      <mesh rotation={[0.3, -0.35, -0.18]} scale={1.015}>
        <torusKnotGeometry args={[1.12, 0.35, 96, 16, 2, 3]} />
        <meshBasicMaterial color="#f0f2e9" wireframe transparent opacity={0.055} />
      </mesh>
      <mesh rotation={[1.15, 0.2, 0.4]}>
        <torusGeometry args={[2.05, 0.006, 4, 160]} />
        <meshBasicMaterial color="#d2ff3f" transparent opacity={0.42} />
      </mesh>
      <mesh rotation={[0.4, 0.9, -0.3]}>
        <torusGeometry args={[2.55, 0.004, 4, 160]} />
        <meshBasicMaterial color="#f0f2e9" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const reduced = Boolean(useReducedMotion());

  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
      style={{ pointerEvents: "none", background: "transparent" }}
      fallback={<div className="absolute inset-0" />}
    >
      <ambientLight intensity={1.25} />
      <directionalLight position={[3, 4, 5]} intensity={4.2} color="#f5f7ed" />
      <directionalLight position={[-4, -2, 2]} intensity={2.8} color="#9dcf27" />
      <pointLight position={[0, 2, -3]} intensity={30} color="#d2ff3f" />
      <Sculpture reduced={reduced} />
      <ParticleOrbit reduced={reduced} />
    </Canvas>
  );
}
