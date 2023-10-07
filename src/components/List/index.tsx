import { useEffect, useRef } from "react";
import { Entry } from "./Entry";
import { useRequest } from "./useRequest";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { LOADING_ENTRY, PAGE_SIZE } from "../../constants";

import "./index.css";
import classNames from "classnames";

export const List = ({
  eventId,
  isSingle,
}: {
  eventId: string;
  isSingle: boolean;
}) => {
  const { startingIndex, entries, requestNextPage, requestPreviousPage } =
    useRequest(eventId, isSingle);
  const prevLoaderNodeRef = useRef<HTMLDivElement>(null);
  const nextLoaderNodeRef = useRef<HTMLDivElement>(null);
  const isPrevIntersecting = useIntersectionObserver(prevLoaderNodeRef);
  const isNextIntersecting = useIntersectionObserver(nextLoaderNodeRef);

  useEffect(() => {
    isPrevIntersecting && requestPreviousPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPrevIntersecting, entries]);

  useEffect(() => {
    isNextIntersecting && requestNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNextIntersecting, entries]);

  const firstGlobalIndex = entries[0]?.globalIndex ?? 0;

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
  const rows = allEntries.map((fields, i) => {
    return (
      <Entry
        key={fields.globalIndex}
        index={
          fields.animationIndex ??
          (fields.globalIndex < PAGE_SIZE ? fields.globalIndex : 0)
        }
        rank={fields.worldRank}
        fields={fields}
      />
    );
  });

  return (
    <div
      className="listWrapper"
      style={{ "--starting-index": startingIndex } as React.CSSProperties}
    >
      <div className="triggerLoad previous" ref={prevLoaderNodeRef}></div>
      <ol className="list">{rows}</ol>
      <div className="triggerLoad next" ref={nextLoaderNodeRef}></div>
    </div>
  );
};
