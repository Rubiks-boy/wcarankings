import { useEffect, useRef, useState } from "react";
import { ENTRY_HEIGHT, ENTRIES_PER_SCROLL_PAGE } from "../constants";

const BUFFER = 300;
const SCROLL_BREAKPOINT = ENTRIES_PER_SCROLL_PAGE * ENTRY_HEIGHT;

const calculateIndexOffset = () =>
  Math.floor((-1 * window.innerHeight) / ENTRY_HEIGHT / 3);

const calculateFirstIndex = (scrollY: number = window.scrollY) =>
  Math.floor((scrollY - BUFFER) / ENTRY_HEIGHT);
const getScrollIndex = (index: number) =>
  (index % ENTRIES_PER_SCROLL_PAGE) +
  (index >= ENTRIES_PER_SCROLL_PAGE ? ENTRIES_PER_SCROLL_PAGE : 0);

export const useIndicesInView = () => {
  const scrollPageRef = useRef(0);
  const scrollIndexRef = useRef(calculateFirstIndex());
  const [rankIndex, setRankIndex] = useState(calculateFirstIndex());

  const scrollToIndex = (index: number) => {
    const newRankIndex = index + calculateIndexOffset();

    scrollPageRef.current =
      Math.floor(newRankIndex / ENTRIES_PER_SCROLL_PAGE) -
      (newRankIndex > ENTRIES_PER_SCROLL_PAGE ? 1 : -1);
    window.scrollTo({
      top: getScrollIndex(newRankIndex) * ENTRY_HEIGHT,
      behavior: "smooth",
    });
  };

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

  return {
    rankIndex,
    scrollIndex: getScrollIndex(rankIndex),
    scrollToIndex,
  };
};
