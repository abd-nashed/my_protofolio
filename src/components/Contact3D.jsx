import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Box,
  Sphere,
  Cone,
  Torus,
  Tetrahedron,
  Octahedron,
  Icosahedron,
} from '@react-three/drei';
import * as THREE from 'three';
import { useCanvasPerformance } from '../hooks/useCanvasPerformance';

const SHAPE_TYPES = [
  'box',
  'sphere',
  'cone',
  'torus',
  'tetrahedron',
  'octahedron',
  'icosahedron',
];

// الشكل الواحد
const FloatingShape = ({ position, shapeType, color, scale, rotationSpeed, isLowEnd }) => {
  const meshRef = useRef();

  const floatOffset = useMemo(() => Math.random() * Math.PI * 2, []);
  const floatSpeed = useMemo(() => 0.3 + Math.random() * 0.5, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    meshRef.current.position.y =
      position[1] + Math.sin(t * floatSpeed + floatOffset) * 0.3;
    meshRef.current.position.x =
      position[0] + Math.cos(t * floatSpeed * 0.8 + floatOffset) * 0.2;

    meshRef.current.rotation.x += rotationSpeed * 0.5;
    meshRef.current.rotation.y += rotationSpeed;
    meshRef.current.rotation.z += rotationSpeed * 0.3;
  });

  const renderShape = () => {
    //  على الأجهزة الضعيفة
    const material = isLowEnd ? (
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.7}
        roughness={0.5}
        emissive={color}
        emissiveIntensity={0.2}
      />
    ) : (
      //   الأجهزة القوية:
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.85}
        roughness={0.15}
        metalness={0.4}
        emissive={color}
        emissiveIntensity={0.3}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
      />
    );

    switch (shapeType) {
      case 'box':
        return <Box args={[1, 1, 1]}>{material}</Box>;
      case 'sphere':
        return <Sphere args={[0.6, 32, 32]}>{material}</Sphere>;
      case 'cone':
        return <Cone args={[0.6, 1, 32]}>{material}</Cone>;
      case 'torus':
        return <Torus args={[0.5, 0.2, 16, 32]}>{material}</Torus>;
      case 'tetrahedron':
        return <Tetrahedron args={[0.7]}>{material}</Tetrahedron>;
      case 'octahedron':
        return <Octahedron args={[0.7]}>{material}</Octahedron>;
      case 'icosahedron':
        return <Icosahedron args={[0.7]}>{material}</Icosahedron>;
      default:
        return <Box args={[1, 1, 1]}>{material}</Box>;
    }
  };

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {renderShape()}
    </mesh>
  );
};

// المكون الرئيسي
const Contact3D = () => {
  const { containerRef, dpr, isLowEnd, isVisible } = useCanvasPerformance();

  const shapes = useMemo(() => {
    const list = [];
    const count = isLowEnd ? 5 : 15;

    const colors = ['#d4af37', '#00d2ff', '#ffffff', '#f1c40f', '#3a7bd5'];

    for (let i = 0; i < count; i++) {
      const shapeType = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const scale = 0.3 + Math.random() * 0.7;
      const speed = 0.3 + Math.random() * 0.5;
      const rotationSpeed = (Math.random() - 0.5) * 0.02;

      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8;

      list.push({
        id: i,
        position: [x, y, z],
        shapeType,
        color,
        scale,
        speed,
        rotationSpeed,
      });
    }
    return list;
  }, [isLowEnd]);

  return (
    <div ref={containerRef} className="contact-3d-canvas">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={dpr}
        frameloop={isVisible ? 'always' : 'never'}
        gl={{
          antialias: !isLowEnd,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        {!isLowEnd && (
          <>
            <pointLight position={[10, 10, 10]} intensity={1} color="#00d2ff" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#d4af37" />
            <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />
          </>
        )}

        {shapes.map((shape) => (
          <FloatingShape
            key={shape.id}
            position={shape.position}
            shapeType={shape.shapeType}
            color={shape.color}
            scale={shape.scale}
            speed={shape.speed}
            rotationSpeed={shape.rotationSpeed}
            isLowEnd={isLowEnd}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default Contact3D;