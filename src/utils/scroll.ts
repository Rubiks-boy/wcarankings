// Scrolls instantly to within scrollDelta px of toLoc, and then smooth scrolls
// the rest of the way.
import { ENTRY_HEIGHT } from "../constants";

const MAX_SCROLL_DISTANCE = ENTRY_HEIGHT * 15;

export const performScroll = ({
  toLoc,
  scrollDelta,
  isScrollingDown,
}: {
  toLoc: number;
  scrollDelta: number;
  isScrollingDown: boolean;
}) => {
  const intermediateLoc =
    toLoc +
    (isScrollingDown ? -1 : 1) * Math.min(scrollDelta, MAX_SCROLL_DISTANCE);

  window.scrollTo({
    top: intermediateLoc,
    behavior: "instant",
  });

  setTimeout(() => {
    window.scrollTo({
      top: toLoc,
      behavior: "smooth",
    });
  }, 100);
};
