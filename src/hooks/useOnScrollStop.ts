import { useEffect, useRef } from "react";

const MIN_MS_BETWEEN_SCROLL_EVENTS = 250;

export const useOnScrollStop = (
  cb: React.MutableRefObject<(() => void) | null>
) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetTimeout = () => {
      timeout.current && clearTimeout(timeout.current);
    };

    const handleScroll = () => {
      resetTimeout();
      timeout.current = setTimeout(() => {
        cb?.current?.();
      }, MIN_MS_BETWEEN_SCROLL_EVENTS);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cb]);
};
