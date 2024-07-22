import { useEffect, useRef } from "react";

export default function useIntersectionObserver(intersectingCallback: (() => void | Promise<void>) | undefined, blurringCallback?: () => void | Promise<void>) {
  const observerTarget = useRef(null);

  useEffect(
    function registerIntersectionObserver() {
      const target = observerTarget.current;
      if (target == null) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              intersectingCallback?.();
            } else {
              blurringCallback?.();
            }
          });
        },
        { threshold: 1 }
      );
      observer.observe(target);

      return () => {
        observer.disconnect();
      };
    },
    [blurringCallback, intersectingCallback]
  );

  return observerTarget;
}
