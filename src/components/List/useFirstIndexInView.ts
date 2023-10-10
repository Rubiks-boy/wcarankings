import { useEffect, useRef, useState } from "react";
import { ENTRY_HEIGHT } from "../../constants";

const BUFFER = 600;

const calculateFirstIndex = () =>
  Math.floor((window.scrollY - BUFFER) / ENTRY_HEIGHT);

export const useFirstIndexInView = () => {
  const firstIndexRef = useRef(calculateFirstIndex());
  const [firstIndexInView, setFirstIndexInView] = useState(
    calculateFirstIndex()
  );

  useEffect(() => {
    const cb = () => {
      const firstIndex = calculateFirstIndex();

      if (firstIndex !== firstIndexRef.current) {
        firstIndexRef.current = firstIndex;
        requestAnimationFrame(() => {
          setFirstIndexInView(firstIndex);
        });
      }
    };

    window.addEventListener("scroll", cb);

    return () => window.removeEventListener("scroll", cb);
  }, []);

  return firstIndexInView;
};
