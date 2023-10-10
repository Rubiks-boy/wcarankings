import { useEffect, useRef, useState } from "react";
import { ENTRY_HEIGHT, ENTRIES_PER_SCROLL_PAGE } from "../constants";

const BUFFER = 300;
const SCROLL_BREAKPOINT = ENTRIES_PER_SCROLL_PAGE * ENTRY_HEIGHT;

const calculateFirstIndex = () =>
  Math.floor((window.scrollY - BUFFER) / ENTRY_HEIGHT);

export const useIndicesInView = () => {
  const scrollPageRef = useRef(0);
  const scrollIndexRef = useRef(calculateFirstIndex());
  const [rankIndex, setRankIndex] = useState(calculateFirstIndex());

  useEffect(() => {
    const cb = () => {
      // Past the first 100 items, we lock the scroll position between 101-200
      const { scrollY } = window;
      if (scrollY >= 2 * SCROLL_BREAKPOINT) {
        scrollPageRef.current++;
        window.scroll({ top: scrollY - SCROLL_BREAKPOINT });
      } else if (scrollY < SCROLL_BREAKPOINT && scrollPageRef.current >= 1) {
        window.scroll({ top: scrollY + SCROLL_BREAKPOINT });
        scrollPageRef.current--;
      }

      const firstIndex = calculateFirstIndex();

      if (firstIndex !== scrollIndexRef.current) {
        scrollIndexRef.current = firstIndex;
        requestAnimationFrame(() => {
          setRankIndex(
            firstIndex + scrollPageRef.current * ENTRIES_PER_SCROLL_PAGE
          );
        });
      }
    };

    window.addEventListener("scroll", cb);
    return () => window.removeEventListener("scroll", cb);
  }, []);

  const scrollIndex =
    (rankIndex % ENTRIES_PER_SCROLL_PAGE) +
    (rankIndex >= ENTRIES_PER_SCROLL_PAGE ? ENTRIES_PER_SCROLL_PAGE : 0);

  return {
    rankIndex,
    scrollIndex,
  };
};
