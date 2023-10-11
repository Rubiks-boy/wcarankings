// Scrolls instantly to within scrollDelta px of toLoc, and then smooth scrolls
// the rest of the way.
export const performScroll = (
  toLoc: number,
  scrollDelta: number,
  isScrollingDown: boolean
) => {
  const intermediateLoc = toLoc + (isScrollingDown ? -1 : 1) * scrollDelta;

  window.scrollTo({
    top: intermediateLoc,
    behavior: "instant",
  });

  window.scrollTo({
    top: toLoc,
    behavior: "smooth",
  });
};
