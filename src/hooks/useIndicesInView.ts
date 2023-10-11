import { useEffect, useRef, useState } from "react";
import { ENTRY_HEIGHT, ENTRIES_PER_SCROLL_PAGE } from "../constants";
import { performScroll } from "../utils/scroll";

const BUFFER = 300;
const SCROLL_BREAKPOINT = ENTRIES_PER_SCROLL_PAGE * ENTRY_HEIGHT;
const EHHH_PRETTY_CLOSE = 100; // 100 pixels
const MIN_MS_BETWEEN_PAGE_SCROLLS = 100;

const calculateIndexOffset = () =>
  Math.floor((-1 * window.innerHeight) / ENTRY_HEIGHT / 3);

const calculateFirstIndex = (scrollY: number = window.scrollY) =>
  Math.floor((scrollY - BUFFER) / ENTRY_HEIGHT);
const getScrollIndex = (index: number) =>
  (index % ENTRIES_PER_SCROLL_PAGE) +
  (index >= ENTRIES_PER_SCROLL_PAGE ? ENTRIES_PER_SCROLL_PAGE : 0);

const currTime = () => new Date().getTime();

export const useIndicesInView = () => {
  // State for what's currently on the screen
  const [rankIndex, setRankIndex] = useState(calculateFirstIndex());
  const [scrollIndex, setScrollIndex] = useState(0);

  // Refs used by the scroll event handler
  // These values get pushed to state
  const scrollPageRef = useRef(0);
  const scrollIndexRef = useRef(calculateFirstIndex());

  // Set when we're in the middle of scrolling to an index
  // This makes sure the scrollToIndex window.scrollTo() events
  // take precedence over the logic to jump around pages.
  const scrollingToIndex = useRef<number | null>(null);

  // Time of the last time we attempted to jump up/down 1000 entries
  const lastScrollJump = useRef<number | null>(null);

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

    const endLocation = getScrollIndex(newRankIndex) * ENTRY_HEIGHT;
    performScroll(endLocation);
  };

  useEffect(() => {
    // Jumps the page up 1000 entries upon scrolling down too far
    const incScrollPage = () => {
      scrollPageRef.current++;
      window.scroll({ top: scrollY - SCROLL_BREAKPOINT });
      lastScrollJump.current = currTime();
    };

    // Jumps the page down 1000 entries upon scrolling up too far
    const decScrollPage = () => {
      scrollPageRef.current--;
      window.scroll({ top: scrollY + SCROLL_BREAKPOINT });
      lastScrollJump.current = currTime();
    };

    // Jumps up/down 1000 entries to make sure we always stay between
    // 1001-2000 entries down from the top.
    const jumpIfNeeded = () => {
      // Once we've reached close to where we're actively trying to
      // scroll to, restore the behavior of allowing page jumps
      const { scrollY } = window;
      if (scrollingToIndex.current !== null) {
        const targetScrollY =
          getScrollIndex(scrollingToIndex.current) * ENTRY_HEIGHT;
        Math.abs(targetScrollY - scrollY) < EHHH_PRETTY_CLOSE &&
          (scrollingToIndex.current = null);
        return;
      }

      // Do not allow the scroll page to increment/decrement
      // within 15ms of the last time it was incremented/decrements
      const canJumpPages =
        lastScrollJump.current === null ||
        currTime() - lastScrollJump.current >= MIN_MS_BETWEEN_PAGE_SCROLLS;
      if (!canJumpPages) {
        return;
      }

      // Perform page jumps if we scroll out of range
      if (scrollY >= 2 * SCROLL_BREAKPOINT) {
        incScrollPage();
      } else if (scrollY < SCROLL_BREAKPOINT && scrollPageRef.current >= 1) {
        decScrollPage();
      }
    };

    const syncScrollPosAndSetState = () => {
      const firstIndex = calculateFirstIndex();

      if (firstIndex !== scrollIndexRef.current) {
        scrollIndexRef.current = firstIndex;
        requestAnimationFrame(() => {
          setScrollIndex(firstIndex);
          setRankIndex(
            firstIndex + scrollPageRef.current * ENTRIES_PER_SCROLL_PAGE
          );
        });
      }
    };

    const cb = () => {
      jumpIfNeeded();
      syncScrollPosAndSetState();
    };

    window.addEventListener("scroll", cb);
    return () => window.removeEventListener("scroll", cb);
  }, []);

  return {
    rankIndex,
    scrollIndex,
    scrollToIndex,
  };
};
