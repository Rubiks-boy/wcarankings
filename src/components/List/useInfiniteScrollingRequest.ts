import { useEffect, useRef } from "react";
import { useRequest } from "./useRequest";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { LOADING_ENTRY, PAGE_SIZE } from "../../constants";

export const useInfiniteScrollingRequest = ({
  eventId,
  isSingle,
}: {
  eventId: string;
  isSingle: boolean;
}) => {
  const { startingIndex, entries, requestNextPage, requestPreviousPage } =
    useRequest(eventId, isSingle);

  const loadPrevRef = useRef<HTMLDivElement>(null);
  const loadNextRef = useRef<HTMLDivElement>(null);
  const isPrevIntersecting = useIntersectionObserver(loadPrevRef);
  const isNextIntersecting = useIntersectionObserver(loadNextRef);

  // Load the previous & next pages
  useEffect(() => {
    isPrevIntersecting && requestPreviousPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPrevIntersecting, entries]);
  useEffect(() => {
    isNextIntersecting && requestNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNextIntersecting, entries]);

  const firstGlobalIndex = entries[0]?.globalIndex ?? 0;

  // Create skeleton loader entries above/below
  const beforeLoaderEntries = [...Array(PAGE_SIZE).keys()].map((i) => ({
    ...LOADING_ENTRY,
    globalIndex: firstGlobalIndex - PAGE_SIZE + i,
    animationIndex: PAGE_SIZE - i,
  }));
  const afterLoaderEntries = [...Array(PAGE_SIZE).keys()].map((i) => ({
    ...LOADING_ENTRY,
    globalIndex: firstGlobalIndex + entries.length + i,
    animationIndex: i,
  }));
  const allEntries = [
    ...beforeLoaderEntries,
    ...entries,
    ...afterLoaderEntries,
  ];

  return {
    entries: allEntries,
    startingIndex,
    loadPrevRef,
    loadNextRef,
  };
};
