import { useEffect, useRef, useState } from "react";
import { ENTRY_HEIGHT, ENTRIES_PER_SCROLL_PAGE } from "../constants";

const BUFFER = 300;
const SCROLL_BREAKPOINT = ENTRIES_PER_SCROLL_PAGE * ENTRY_HEIGHT;
const EHHH_PRETTY_CLOSE = 100; // 100 pixels
const MIN_MS_BETWEEN_SCROLLS = 10;

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
  const scrollingToIndex = useRef<number | null>(null);
  const lastScrollUp = useRef<number | null>(null);
  const lastScrollDown = useRef<number | null>(null);
  const [rankIndex, setRankIndex] = useState(calculateFirstIndex());

  const scrollToIndex = (index: number) => {
    let newRankIndex = Math.max(index + calculateIndexOffset());
    if (newRankIndex < 0) {
      newRankIndex = 0;
    }

    // make sure we ignore any page jumps until we're within the scroll page.
    scrollingToIndex.current = newRankIndex;

    scrollPageRef.current = Math.max(
      Math.floor(newRankIndex / ENTRIES_PER_SCROLL_PAGE) - 1,
      0
    );

    const diffEntries = Math.abs(newRankIndex - rankIndex);
    const isScrollingDown = newRankIndex > rankIndex;
    const scrollDelta =
      (isScrollingDown ? 1 : -1) * ENTRY_HEIGHT * Math.min(50, diffEntries);
    const endLocation = getScrollIndex(newRankIndex) * ENTRY_HEIGHT;
    const startLocation = endLocation - scrollDelta;

    window.scrollTo({
      top: startLocation,
      behavior: "instant",
    });

    window.scrollTo({
      top: endLocation,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Do not allow the scroll page to increment/decrement
    // within 15ms of the last time it was incremented/decrements
    const incScrollPage = () => {
      const currTime = new Date().getTime();
      if (
        lastScrollDown.current === null ||
        currTime - lastScrollDown.current < MIN_MS_BETWEEN_SCROLLS
      ) {
        scrollPageRef.current++;
        window.scroll({ top: scrollY - SCROLL_BREAKPOINT });
      }
      lastScrollDown.current = currTime;
    };
    const decScrollPage = () => {
      const currTime = new Date().getTime();
      if (
        scrollPageRef.current >= 1 &&
        (lastScrollUp.current === null ||
          currTime - lastScrollUp.current < MIN_MS_BETWEEN_SCROLLS)
      ) {
        window.scroll({ top: scrollY + SCROLL_BREAKPOINT });
        scrollPageRef.current--;
      }
      lastScrollUp.current = currTime;
    };

    const cb = () => {
      // Past the first 1000 items, we lock the scroll position between 1001-2000
      const { scrollY } = window;
      if (scrollingToIndex.current !== null) {
        // Once we've reached close to where we're trying to scroll to,
        // restore the behavior of allowing page jumps
        const targetScrollY =
          getScrollIndex(scrollingToIndex.current) * ENTRY_HEIGHT;
        Math.abs(targetScrollY - scrollY) < EHHH_PRETTY_CLOSE &&
          (scrollingToIndex.current = null);
      } else if (scrollY >= 2 * SCROLL_BREAKPOINT) {
        incScrollPage();
      } else if (scrollY < SCROLL_BREAKPOINT) {
        decScrollPage();
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
