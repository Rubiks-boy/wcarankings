import { Entry } from "./Entry";
import { PAGE_SIZE } from "../../constants";
import { useInfiniteScrollingRequest } from "./useInfiniteScrollingRequest";

import "./index.css";

export const List = ({
  eventId,
  isSingle,
}: {
  eventId: string;
  isSingle: boolean;
}) => {
  const { entries, startingIndex, loadPrevRef, loadNextRef } =
    useInfiniteScrollingRequest({
      eventId,
      isSingle,
    });

  const rows = entries.map((fields) => (
    <Entry
      key={fields.globalIndex}
      animationIndex={
        fields.animationIndex ??
        (fields.globalIndex < PAGE_SIZE ? fields.globalIndex : 0)
      }
      rank={fields.worldRank}
      fields={fields}
    />
  ));

  return (
    <div
      className="listWrapper"
      style={{ "--starting-index": startingIndex } as React.CSSProperties}
    >
      <div className="triggerLoad previous" ref={loadPrevRef}></div>
      <ol className="list">{rows}</ol>
      <div className="triggerLoad next" ref={loadNextRef}></div>
    </div>
  );
};
