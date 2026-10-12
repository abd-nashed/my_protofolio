import { useEffect, useRef, useState } from 'react';

export const useCanvasPerformance = (options = {}) => {
  const { rootMargin = '200px', threshold = 0 } = options;
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  //  كشف دقيق: هاتف ضعيف فقط
  const [isLowEnd] = useState(() => {
    if (typeof navigator === 'undefined' || typeof window === 'undefined') {
      return false;
    }

    const ua = navigator.userAgent;
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4;
    const isMobile = /Mobi|Android|iPhone|iPad|iPod|Tablet/i.test(ua);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    //  إذا المستخدم يفضّل تقليل الحركة  ضعيف
    if (prefersReduced) return true;

    //  أجهزة Apple الحديثة (iPhone 13+)  قوية دائماً
    const isModerniPhone =
      /iPhone1[3-9],\d/.test(ua) ||   // iPhone 13 - 19
      /iPhone[2-9]\d,\d/.test(ua);    // iPhone 20+

    //  iPad Pro / iPad Air الحديثة
    const isModerniPad =
      /iPad/.test(ua) &&
      navigator.maxTouchPoints > 1 &&
      (cores >= 6 || memory >= 4);

    //  Mac مع Apple Silicon
    const isAppleSiliconMac =
      /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;

    //  جهاز حديث = قوي
    if (isModerniPhone || isModerniPad || isAppleSiliconMac) {
      return false;
    }

    //  منطق عام للأجهزة الأخرى
    if (isMobile) {
      return cores <= 4 || memory <= 4;
    }

    // Desktop
    return cores <= 2 || memory <= 2;
  });

  const dpr =
    typeof window === 'undefined'
      ? 1
      : Math.min(window.devicePixelRatio || 1, isLowEnd ? 1 : 1.5);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let inViewport = false;
    let isHidden = document.hidden;

    const update = () => {
      setIsVisible(inViewport && !isHidden);
    };

    const observer =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              inViewport = entry.isIntersecting;
              update();
            },
            { rootMargin, threshold }
          );

    observer?.observe(container);

    const onVisibilityChange = () => {
      isHidden = document.hidden;
      update();
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [rootMargin, threshold]);

  return { containerRef, dpr, isLowEnd, isVisible };
};