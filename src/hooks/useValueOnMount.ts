import { useRef } from "react";

export const useValueOnMount = <T>(value: T) => {
  const ref = useRef<T>(value);
  return ref.current;
};
