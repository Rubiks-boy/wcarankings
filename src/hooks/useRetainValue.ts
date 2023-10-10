import { useEffect, useRef } from "react";

export const useRetainValue = <T>(val: T) => {
  const ref = useRef(val);

  useEffect(() => {
    if (val) {
      ref.current = val;
    }
  });

  return val || ref.current;
};
