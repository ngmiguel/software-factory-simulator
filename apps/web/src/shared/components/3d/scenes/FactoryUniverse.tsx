'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  Stars,
  MeshDistortMaterial,
  Sphere,
  Box,
  Torus,
  Grid,
  PerspectiveCamera,
  Environment,
} from '@react-three/drei';
import * as THREE from 'three';

export type SceneVariant = 'hero' | 'auth' | 'dashboard' | 'simulation';

interface FactoryUniverseProps {
  variant?: SceneVariant;
}

function CoreSphere({ intensity }: { intensity: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.15;
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <Sphere ref={ref} args={[1.2, 64, 64]} position={[0, 0.5, 0]}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.35 * intensity}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          emissive="#1d4ed8"
          emissiveIntensity={0.4}
        />
      </Sphere>
    </Float>
  );
}

function OrbitingTeams({ count = 8 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);

  const teams = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3.5 + (i % 3) * 0.5;
      return {
        position: [Math.cos(angle) * radius, 0.3 + (i % 2) * 0.8, Math.sin(angle) * radius] as [
          number,
          number,
          number,
        ],
        color: i % 2 === 0 ? '#8b5cf6' : '#06b6d4',
        scale: 0.3 + (i % 3) * 0.15,
      };
    });
  }, [count]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={group}>
      {teams.map((team, i) => (
        <Float key={i} speed={1.5 + i * 0.1} floatIntensity={0.5}>
          <Box args={[team.scale, team.scale * 1.5, team.scale]} position={team.position}>
            <meshStandardMaterial
              color={team.color}
              emissive={team.color}
              emissiveIntensity={0.3}
              metalness={0.6}
              roughness={0.2}
            />
          </Box>
        </Float>
      ))}
    </group>
  );
}

function CodeParticles() {
  const count = 200;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 10 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      const posAttr = ref.current.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        posAttr.array[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#60a5fa" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function DataRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ring1.current) ring1.current.rotation.z = state.clock.elapsedTime * 0.3;
    if (ring2.current) ring2.current.rotation.x = state.clock.elapsedTime * 0.2;
  });

  return (
    <group position={[0, -0.5, 0]}>
      <Torus ref={ring1} args={[4, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
      </Torus>
      <Torus ref={ring2} args={[5.5, 0.015, 16, 100]} rotation={[Math.PI / 3, 0.5, 0]}>
        <meshBasicMaterial color="#a855f7" transparent opacity={0.25} />
      </Torus>
    </group>
  );
}

function SceneContent({ variant }: { variant: SceneVariant }) {
  const intensity = variant === 'hero' ? 1 : variant === 'simulation' ? 1.3 : 0.7;
  const teamCount = variant === 'dashboard' ? 12 : variant === 'hero' ? 10 : 6;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 3, 8]} fov={55} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[-10, 5, -10]} intensity={0.8} color="#a855f7" />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#06b6d4" />
      <Stars radius={80} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      <Environment preset="night" />
      <Grid
        position={[0, -1.5, 0]}
        args={[30, 30]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#1e3a5f"
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#3b82f6"
        fadeDistance={25}
        fadeStrength={1}
        infiniteGrid
      />
      <CoreSphere intensity={intensity} />
      <OrbitingTeams count={teamCount} />
      <CodeParticles />
      {(variant === 'hero' || variant === 'simulation') && <DataRings />}
    </>
  );
}

function CameraRig({ variant }: { variant: SceneVariant }) {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const speed = variant === 'hero' ? 0.15 : 0.08;
    state.camera.position.x = Math.sin(t * speed) * 2;
    state.camera.position.z = 8 + Math.cos(t * speed * 0.5) * 1.5;
    state.camera.lookAt(0, 0.5, 0);
  });
  return null;
}

export default function FactoryUniverse({ variant = 'hero' }: FactoryUniverseProps) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <SceneContent variant={variant} />
      <CameraRig variant={variant} />
    </Canvas>
  );
}
