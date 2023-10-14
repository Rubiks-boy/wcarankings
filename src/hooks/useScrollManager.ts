import { useEffect, useRef, useState } from "react";
import { ENTRY_HEIGHT, ENTRIES_PER_SCROLL_PAGE } from "../constants";
import { performScroll } from "../utils/scroll";
import { callFuncOnce } from "../utils";
import { useOnScrollStop } from "./useOnScrollStop";

const BUFFER = 1000;
const SCROLL_BREAKPOINT = ENTRIES_PER_SCROLL_PAGE * ENTRY_HEIGHT;
const EHHH_PRETTY_CLOSE = 100; // 100 pixels
const SCROLL_PAGE_HEIGHT = ENTRY_HEIGHT * ENTRIES_PER_SCROLL_PAGE;

const calculateIndexOffset = () =>
  Math.floor((-1 * window.innerHeight) / ENTRY_HEIGHT / 3);

const calculateFirstIndex = (scrollY: number = window.scrollY) =>
  Math.floor((scrollY - BUFFER) / ENTRY_HEIGHT);
const getScrollIndex = (index: number) =>
  (index % ENTRIES_PER_SCROLL_PAGE) +
  (index >= ENTRIES_PER_SCROLL_PAGE ? ENTRIES_PER_SCROLL_PAGE : 0);

// Locks user between indices 1000 to 3000
export const useScrollManagerPaginated = () => {
  // State for what's currently on the screen
  const [rankIndex, setRankIndex] = useState(calculateFirstIndex());
  const [scrollIndex, setScrollIndex] = useState(calculateFirstIndex());
  const [forceLoading, setForceLoading] = useState(false);

  // Refs used by the scroll event handler
  // These values get pushed to state
  const scrollPageRef = useRef(0);
  const scrollIndexRef = useRef(calculateFirstIndex());

  // Set when we're in the middle of scrolling to an index
  // This makes sure the scrollToIndex window.scrollTo() events
  // take precedence over the logic to jump around pages.
  const scrollingToIndex = useRef<number | null>(null);

  const scrollStopCb = useRef<(() => void) | null>(null);
  useOnScrollStop(scrollStopCb);

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

    const toLoc = getScrollIndex(newRankIndex) * ENTRY_HEIGHT;
    const isScrollingDown = newRankIndex > rankIndex;
    const scrollDelta = Math.abs(newRankIndex - rankIndex) * ENTRY_HEIGHT;
    setForceLoading(true);
    setTimeout(() => {
      performScroll({
        toLoc,
        scrollDelta,
        isScrollingDown,
      });
    }, 300);
    scrollStopCb.current = callFuncOnce(() => setForceLoading(false));
  };

  useEffect(() => {
    // Jumps the page up 1000 entries upon scrolling down too far
    const incScrollPage = () => {
      scrollPageRef.current++;
      window.scroll({ top: scrollY - SCROLL_BREAKPOINT });
    };

    // Jumps the page down 1000 entries upon scrolling up too far
    const decScrollPage = () => {
      scrollPageRef.current--;
      window.scroll({ top: scrollY + SCROLL_BREAKPOINT });
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

      // Perform page jumps if we scroll out of range
      // However, wait for the page to stop scrolling for 100ms.
      // 1) This makes sure we don't call window.scrollTo() while
      //    the user is actively scrolling.
      // 2) It prevents issues where we might receive multiple scroll
      //    events very quickly, which can mess with our state.
      if (scrollY >= 2 * SCROLL_BREAKPOINT) {
        scrollStopCb.current = callFuncOnce(incScrollPage);
      } else if (scrollY < SCROLL_BREAKPOINT && scrollPageRef.current >= 1) {
        scrollStopCb.current = callFuncOnce(decScrollPage);
      }
    };

    const syncScrollPosAndSetState = () => {
      const firstIndex = calculateFirstIndex();

      if (firstIndex !== scrollIndexRef.current) {
        scrollIndexRef.current = firstIndex;
        setScrollIndex(firstIndex);
        setRankIndex(
          firstIndex + scrollPageRef.current * ENTRIES_PER_SCROLL_PAGE
        );
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
    forceLoading,
    height: 3 * SCROLL_PAGE_HEIGHT,
  };
};

// Allows the user to scroll down endlesslly
export const useScrollManagerNonPaginated = () => {
  // State for what's currently on the screen
  const [rankIndex, setRankIndex] = useState(calculateFirstIndex());
  const [forceLoading, setForceLoading] = useState(false);
  const [height, setHeight] = useState(3 * SCROLL_PAGE_HEIGHT);

  // Ref used by the event handler that get pushed to state
  const rankIndexRef = useRef(calculateFirstIndex());

  const scrollStopCb = useRef<(() => void) | null>(null);
  useOnScrollStop(scrollStopCb);

  const scrollToIndex = (index: number) => {
    let newRankIndex = Math.max(index + calculateIndexOffset());
    if (newRankIndex < 0) {
      newRankIndex = 0;
    }

    const toLoc = newRankIndex * ENTRY_HEIGHT;
    const isScrollingDown = newRankIndex > rankIndex;
    const scrollDelta = Math.abs(newRankIndex - rankIndex) * ENTRY_HEIGHT;
    setForceLoading(true);
    setHeight(Math.max(height, toLoc + SCROLL_PAGE_HEIGHT));
    setTimeout(() => {
      performScroll({
        toLoc,
        scrollDelta,
        isScrollingDown,
      });
    }, 300);
    scrollStopCb.current = callFuncOnce(() => setForceLoading(false));
  };

  useEffect(() => {
    const cb = () => {
      const firstIndex = calculateFirstIndex();

      if (firstIndex !== rankIndexRef.current) {
        rankIndexRef.current = firstIndex;
        setRankIndex(firstIndex);
      }
    };

    window.addEventListener("scroll", cb);
    return () => window.removeEventListener("scroll", cb);
  }, []);

  return {
    rankIndex,
    scrollIndex: rankIndex,
    scrollToIndex,
    forceLoading,
    height,
  };
};

export const useScrollManager = useScrollManagerNonPaginated;
