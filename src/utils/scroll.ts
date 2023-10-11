import { ENTRY_HEIGHT } from "../constants";

// Scrolls instantly to within scrollDelta entries of toLoc, and then smooth scrolls
// the rest of the way.
export const performScroll = (toLoc: number, scrollDelta: number) => {
  const intermediateLoc = toLoc - scrollDelta * ENTRY_HEIGHT;
  window.scrollTo({
    top: intermediateLoc,
    behavior: "instant",
  });

  window.scrollTo({
    top: toLoc,
    behavior: "smooth",
  });
};
