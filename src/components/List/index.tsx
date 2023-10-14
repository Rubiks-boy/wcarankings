import { Row } from "./Row";
import { CSSProperties } from "react";
import { ENTRY_HEIGHT, NUM_ENTRIES_RENDERED } from "../../constants";

import "./index.css";
import { ApiFields } from "../../types";

export const List = ({
  rankIndex,
  scrollIndex,
  forceLoading,
  height,
  getEntries,
  count,
}: {
  rankIndex: number;
  scrollIndex: number;
  forceLoading: boolean;
  height: number;
  getEntries: (
    startIndex: number,
    howMany: number
  ) => Array<(ApiFields & { index: number }) | null>;
  count: number;
}) => {
  const maxHeight = count * ENTRY_HEIGHT;

  let translateY = scrollIndex * ENTRY_HEIGHT;
  if (translateY < 0) {
    translateY = 0;
  }

  const entries = getEntries(rankIndex, NUM_ENTRIES_RENDERED);

  return (
    <div
      className="outerListWrapper"
      style={{ height: Math.min(height, maxHeight) }}
    >
      <div className="listContainer">
        <ol
          className="list"
          style={{ "--translateY": `${translateY}px` } as CSSProperties}
        >
          {entries.map(
            (maybeFields, i) =>
              i + rankIndex < count && (
                <Row
                  key={i + rankIndex}
                  animationIndex={i}
                  fields={maybeFields}
                  forceLoading={forceLoading}
                />
              )
          )}
        </ol>
      </div>
    </div>
  );
};
