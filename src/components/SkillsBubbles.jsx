import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useCanvasPerformance } from '../hooks/useCanvasPerformance';

import {
  SiReact,
  SiDjango,
  SiPython,
  SiUnrealengine,
  SiCplusplus,
  SiPostgresql,
  SiThreedotjs,
} from 'react-icons/si';
import { TbApi, TbDeviceMobile, TbCube } from 'react-icons/tb';
import { FaCss3Alt } from 'react-icons/fa';

const SKILLS = [
  { name: 'React Native', color: '#61DAFB', icon: <TbDeviceMobile /> },
  { name: 'React Native', color: '#61DAFB', icon: <TbDeviceMobile /> },
  { name: 'React', color: '#61DAFB', icon: <SiReact /> },
  { name: 'Django', color: '#092E20', icon: <SiDjango /> },
  { name: 'Django REST', color: '#A30000', icon: <TbApi /> },
  { name: 'Three.js', color: '#1a1a1a', icon: <SiThreedotjs /> },
  { name: 'Unreal Engine', color: '#0E1128', icon: <SiUnrealengine /> },
  { name: 'Blueprint', color: '#1E90FF', icon: <TbCube /> },
  { name: 'C++', color: '#00599C', icon: <SiCplusplus /> },
  { name: 'PostgreSQL', color: '#4169E1', icon: <SiPostgresql /> },
  { name: 'CSS', color: '#264de4', icon: <FaCss3Alt /> },
];

const ORBIT_RADIUS_X = 6.5;
const ORBIT_RADIUS_Y = 3.2;
const ORBIT_SPEED = 0.15;
const REPEL_RADIUS = 3.0;
const REPEL_STRENGTH = 2.5;

// كاشف الهاتف
const detectMobile = () => {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') {
    return false;
  }
  const ua = navigator.userAgent;
  const isMobileUA = /Mobi|Android|iPhone|iPad|iPod|Tablet/i.test(ua);
  const isTouch =
    'ontouchstart' in window || (navigator.maxTouchPoints || 0) > 0;
  return isMobileUA || isTouch;
};

// الفقاعة الواحدة
const Bubble = ({ skill, index, totalCount, isLowEnd }) => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { mouse, viewport } = useThree();

  const startAngle = (index / totalCount) * Math.PI * 2;
  const floatSpeed = useMemo(() => 0.5 + Math.random() * 0.5, []);
  const floatOffset = useMemo(() => Math.random() * Math.PI * 2, []);
  const baseScale = 0.85;
  const repelVec = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    const angle = startAngle + t * ORBIT_SPEED;
    const orbitX = Math.cos(angle) * ORBIT_RADIUS_X;
    const orbitY = Math.sin(angle) * ORBIT_RADIUS_Y;
    const orbitZ = Math.sin(angle) * 1.5;

    const floatX = Math.sin(t * floatSpeed + floatOffset) * 0.15;
    const floatY = Math.cos(t * floatSpeed * 1.3 + floatOffset) * 0.15;

    const baseX = orbitX + floatX;
    const baseY = orbitY + floatY;
    const baseZ = orbitZ;

    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    const dx = baseX - mouseX;
    const dy = baseY - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    let targetRepelX = 0;
    let targetRepelY = 0;

    if (distance < REPEL_RADIUS && distance > 0.01) {
      const force = (1 - distance / REPEL_RADIUS) * REPEL_STRENGTH;
      targetRepelX = (dx / distance) * force;
      targetRepelY = (dy / distance) * force;
    }

    repelVec.current.x += (targetRepelX - repelVec.current.x) * 0.08;
    repelVec.current.y += (targetRepelY - repelVec.current.y) * 0.08;

    groupRef.current.position.x = baseX + repelVec.current.x;
    groupRef.current.position.y = baseY + repelVec.current.y;
    groupRef.current.position.z = baseZ;

    const depthScale = 0.85 + ((orbitZ + 1.5) / 3) * 0.3;
    groupRef.current.scale.setScalar(baseScale * depthScale);
  });

  return (
    <group ref={groupRef}>
      <Sphere
        args={[2, isLowEnd ? 24 : 48, isLowEnd ? 16 : 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {isLowEnd ? (
          <meshStandardMaterial
            color={skill.color}
            transparent
            opacity={hovered ? 1 : 0.9}
            roughness={0.5}
            emissive={skill.color}
            emissiveIntensity={hovered ? 0.8 : 0.3}
          />
        ) : (
          <meshPhysicalMaterial
            color={skill.color}
            transparent
            opacity={hovered ? 1 : 0.9}
            roughness={0.15}
            metalness={0.3}
            transmission={0.6}
            thickness={1}
            ior={1.5}
            emissive={skill.color}
            emissiveIntensity={hovered ? 1.5 : 0.6}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        )}
      </Sphere>

      {/*  الأيقونة تظهر فقط على الأجهزة القوية */}
      {!isLowEnd && (
        <Html
          center
          distanceFactor={50}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            textAlign: 'center',
          }}
        >
          <div className="bubble-label">
            <span className="bubble-label__icon">{skill.icon}</span>
          </div>
        </Html>
      )}
    </group>
  );
};

// المكون الرئيسي
const SkillsBubbles = () => {
  const { containerRef, dpr, isLowEnd, isVisible } = useCanvasPerformance();

  const isMobile = useMemo(() => detectMobile(), []);

  const shouldHide = isMobile && isLowEnd;

  const visibleSkills = useMemo(() => {
    if (isLowEnd && !isMobile) return SKILLS.slice(0, 6);
    return SKILLS;
  }, [isLowEnd, isMobile]);

  if (shouldHide) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="skills-3d-container"
      style={{ width: '100%', height: '100%' }}
    >
      <Canvas
        camera={{ position: [0, 0, 14], fov: 55 }}
        dpr={dpr}
        frameloop={isVisible ? 'always' : 'never'}
        gl={{
          antialias: !isLowEnd,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} color="#ffffff" />
        {!isLowEnd && (
          <>
            <pointLight position={[-5, -5, -5]} intensity={1.5} color="#d4af37" />
            <pointLight position={[5, -5, 5]} intensity={1.5} color="#00d2ff" />
            <pointLight position={[0, 5, 0]} intensity={1} color="#ffffff" />
          </>
        )}

        {visibleSkills.map((skill, index) => (
          <Bubble
            key={`${skill.name}-${index}`}
            skill={skill}
            index={index}
            totalCount={visibleSkills.length}
            isLowEnd={isLowEnd}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default SkillsBubbles;