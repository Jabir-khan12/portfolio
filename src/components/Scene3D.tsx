import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Torus, Box, Text, RoundedBox } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Tech icons as 3D floating elements
const techIcons = [
  { name: 'React', color: '#61DAFB', position: [-4, 2, -2] },
  { name: 'Node', color: '#339933', position: [4, -1, -3] },
  { name: 'TS', color: '#3178C6', position: [-3, -2, -1] },
  { name: 'JS', color: '#F7DF1E', position: [3, 2, -2] },
  { name: 'Py', color: '#3776AB', position: [-5, 0, -4] },
  { name: 'SQL', color: '#CC2927', position: [5, 1, -3] },
  { name: 'Git', color: '#F05032', position: [-2, 3, -2] },
  { name: 'AWS', color: '#FF9900', position: [2, -3, -2] },
];

function TechIcon({ name, color, position }: { name: string; color: string; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);
  const initialY = position[1];
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef} position={position}>
        <RoundedBox args={[0.8, 0.8, 0.15]} radius={0.1}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.8}
          />
        </RoundedBox>
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.25}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2"
        >
          {name}
        </Text>
      </group>
    </Float>
  );
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const torus2Ref = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.3;
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.2;
      torusRef.current.rotation.z = t * 0.3;
    }
    if (torus2Ref.current) {
      torus2Ref.current.rotation.y = t * 0.25;
      torus2Ref.current.rotation.x = t * 0.15;
    }
    if (boxRef.current) {
      boxRef.current.rotation.y = t * 0.2;
      boxRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <>
      {/* Main glowing sphere with pulsing */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
        <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#00d4ff"
            attach="material"
            distort={0.5}
            speed={3}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Primary orbiting torus */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
        <Torus ref={torusRef} args={[2.5, 0.05, 16, 100]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </Torus>
      </Float>

      {/* Secondary orbiting torus */}
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.3}>
        <Torus ref={torus2Ref} args={[3, 0.03, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
          />
        </Torus>
      </Float>

      {/* Floating cubes with varied speeds */}
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <Box ref={boxRef} args={[0.3, 0.3, 0.3]} position={[2.5, 1, -1]}>
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <Box args={[0.2, 0.2, 0.2]} position={[-2, -1, 0.5]}>
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Box args={[0.15, 0.15, 0.15]} position={[1.5, -1.5, 1]}>
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
      </Float>

      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8}>
        <Box args={[0.25, 0.25, 0.25]} position={[-1.5, 2, -0.5]}>
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
      </Float>
    </>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 800;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return { positions, velocities };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        posArray[i * 3] += velocities[i * 3];
        posArray[i * 3 + 1] += velocities[i * 3 + 1];
        posArray[i * 3 + 2] += velocities[i * 3 + 2];
        
        // Wrap around boundaries
        if (Math.abs(posArray[i * 3]) > 12.5) velocities[i * 3] *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > 12.5) velocities[i * 3 + 1] *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > 12.5) velocities[i * 3 + 2] *= -1;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00d4ff"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function GlowingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.1;
      ring1Ref.current.rotation.y = t * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.12;
      ring2Ref.current.rotation.z = t * 0.1;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.08;
      ring3Ref.current.rotation.z = t * 0.12;
    }
  });

  return (
    <>
      <Torus ref={ring1Ref} args={[5, 0.02, 16, 100]} position={[0, 0, -5]}>
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </Torus>
      <Torus ref={ring2Ref} args={[6, 0.015, 16, 100]} position={[0, 0, -7]} rotation={[Math.PI / 4, 0, 0]}>
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </Torus>
      <Torus ref={ring3Ref} args={[7, 0.01, 16, 100]} position={[0, 0, -9]} rotation={[0, Math.PI / 4, 0]}>
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.2}
          transparent
          opacity={0.3}
        />
      </Torus>
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#00d4ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.6} color="#8b5cf6" />
          <pointLight position={[0, 5, 5]} intensity={0.8} color="#ffffff" />
          <spotLight
            position={[0, 15, 0]}
            angle={0.4}
            penumbra={1}
            intensity={0.6}
            color="#ffffff"
          />
          
          <FloatingGeometry />
          <Particles />
          <GlowingRings />
          
          {/* Tech stack icons floating in background */}
          {techIcons.map((icon, index) => (
            <TechIcon
              key={index}
              name={icon.name}
              color={icon.color}
              position={icon.position as [number, number, number]}
            />
          ))}
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
