import { ENTRY_HEIGHT } from "../constants";

// Scrolls instantly to within 50 entries of toLoc, and then smooth scrolls
// the rest of the way.
export const performScroll = (toLoc: number) => {
  const begLoc = window.scrollY;
  const absDiff = Math.abs(toLoc - begLoc);
  const isScrollingDown = toLoc > begLoc;
  const scrollDelta =
    (isScrollingDown ? 1 : -1) * Math.min(50 * ENTRY_HEIGHT, absDiff);

  const intermediateLoc = toLoc - scrollDelta;
  window.scrollTo({
    top: intermediateLoc,
    behavior: "instant",
  });

  window.scrollTo({
    top: toLoc,
    behavior: "smooth",
  });
};
