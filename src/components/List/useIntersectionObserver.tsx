import { useEffect, useState, RefObject } from "react";

const options = {
  root: null,
  rootMargin: "500px",
  threshold: 0,
};

export const useIntersectionObserver = (ref: RefObject<HTMLElement>) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      options
    );

    ref.current && observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return isIntersecting;
};
