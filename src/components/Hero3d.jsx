import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useCanvasPerformance } from '../hooks/useCanvasPerformance';

// مكون الجزيئات العائمة
const FloatingParticles = ({ count = 200, size = 0.04, opacity = 0.7 }) => {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#d4af37"
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={opacity}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// المكون الرئيسي
const Hero3D = () => {
  const { containerRef, dpr, isLowEnd, isVisible } = useCanvasPerformance();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  //  كشف الهاتف
  const isMobile = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent;
    const isMobileUA = /Mobi|Android|iPhone|iPad|iPod|Tablet/i.test(ua);
    const isTouch =
      'ontouchstart' in window || (navigator.maxTouchPoints || 0) > 0;
    return isMobileUA || isTouch;
  }, []);

  //  إعدادات النقاط حسب الجهاز
  const particleConfig = useMemo(() => {
    // هاتف ضعيف → عدد قليل جداً
    if (isMobile && isLowEnd) {
      return { count: 40, size: 0.03, opacity: 0.5 };
    }
    // هاتف قوي → عدد متوسط
    if (isMobile) {
      return { count: 120, size: 0.035, opacity: 0.6 };
    }
    // جهاز ضعيف (Desktop)
    if (isLowEnd) {
      return { count: 80, size: 0.04, opacity: 0.6 };
    }
    // Desktop قوي
    return { count: 200, size: 0.04, opacity: 0.7 };
  }, [isMobile, isLowEnd]);

  return (
    <div ref={containerRef} className="hero-3d-canvas">
      {mounted && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={dpr}
          frameloop={isVisible ? 'always' : 'never'}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00d2ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4af37" />

          <FloatingParticles
            count={particleConfig.count}
            size={particleConfig.size}
            opacity={particleConfig.opacity}
          />
        </Canvas>
      )}
    </div>
  );
};

export default Hero3D;