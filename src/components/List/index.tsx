import { useEffect, useRef } from "react";
import { Entry } from "./Entry";
import { useRequest } from "./useRequest";
import { useIntersectionObserver } from "./useIntersectionObserver";

import "./index.css";

const PAGE_SIZE = 100;
const LOADING_ENTRY = {
  person: {
    id: "-",
    name: "-",
  },
  worldRank: 1,
  best: 0,
  loading: true,
};

export const List = ({
  eventId,
  isSingle,
}: {
  eventId: string;
  isSingle: boolean;
}) => {
  const { entries, requestNextPage } = useRequest(eventId, isSingle);
  const loaderNodeRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(loaderNodeRef);

  useEffect(() => {
    isIntersecting && requestNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting, entries]);

  const allEntries = [
    ...entries,
    ...[...Array(PAGE_SIZE).keys()].map(() => LOADING_ENTRY),
  ];
  const rows = allEntries.map((fields, i) => {
    return (
      <Entry
        key={i}
        index={fields.loading ? i : 10}
        rank={fields.worldRank}
        fields={fields}
      />
    );
  });

  return (
    <div className="listWrapper">
      <ol className="list">{rows}</ol>
      <div className="triggerLoad" ref={loaderNodeRef}></div>
    </div>
  );
};
