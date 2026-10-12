import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { useCanvasPerformance } from '../hooks/useCanvasPerformance';

// شريط التحميل
const LoadingOverlay = ({ progress }) => {
  return (
    <div className="earth-loader-overlay">
      <div className="earth-loader">
        <div className="earth-loader__spinner"></div>
        <span className="earth-loader__text">
          Loading... {progress.toFixed(0)}%
        </span>
        <div className="earth-loader__bar">
          <div
            className="earth-loader__bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// المجسم
const EarthModel = () => {
  const earthRef = useRef();
  const { scene } = useGLTF('/earth.glb');

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissiveIntensity = 0.5;
        child.material.emissive = new THREE.Color('#00d2ff');
        child.material.toneMapped = false;
      }
    });
  }, [scene]);

  return (
    <primitive
      ref={earthRef}
      object={scene}
      scale={2.5}
      position={[0, 0, 0]}
    />
  );
};

// متتبع التحميل
const LoaderTracker = ({ onLoaded }) => {
  const { progress, active } = useProgress();

  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => onLoaded(), 300);
      return () => clearTimeout(timer);
    }
  }, [active, progress, onLoaded]);

  return null;
};

// المكون الرئيسي
const Earth3D = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { progress } = useProgress();
  const { containerRef, dpr, isLowEnd, isVisible } = useCanvasPerformance();

  return (
    <div ref={containerRef} className="earth-3d-container">
      {isLoading && <LoadingOverlay progress={progress} />}

      <Canvas
        camera={{ position: [0, 0, 2], fov: 45 }}
        dpr={dpr}
        frameloop={isVisible ? 'always' : 'never'}
        gl={{
          antialias: !isLowEnd,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <LoaderTracker onLoaded={() => setIsLoading(false)} />

          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
          {!isLowEnd && (
            <>
              <pointLight position={[-5, -3, -5]} intensity={1} color="#d4af37" />
              <pointLight position={[3, 2, 3]} intensity={0.8} color="#00d2ff" />
            </>
          )}

          {/*  لا يتم تحميل المجسم إلا عندما يكون القسم في الشاشة */}
          {isVisible && <EarthModel />}
        </Suspense>
      </Canvas>
    </div>
  );
};


export default Earth3D;