import { useState, useEffect, useRef } from "react";

// https://hooks-guide.netlify.app/community/useThrottle

interface useThrottleProps {
  value: string;
  limit: number;
}

export const useThrottle = ({ value, limit }: useThrottleProps) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(
      function () {
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }
      },
      limit - (Date.now() - lastRan.current),
    );

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
};
