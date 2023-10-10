import { useRequest } from "../../hooks/useRequest";
import { Row } from "./Row";
import { CSSProperties } from "react";
// import { useIndicesInView } from "../../hooks/useIndicesInView";
import {
  ENTRIES_PER_SCROLL_PAGE,
  ENTRY_HEIGHT,
  NUM_ENTRIES_RENDERED,
} from "../../constants";

import "./index.css";

const SCROLL_PAGE_HEIGHT = ENTRY_HEIGHT * ENTRIES_PER_SCROLL_PAGE;

export const List = ({
  eventId,
  isSingle,
  rankIndex,
  scrollIndex,
}: {
  eventId: string;
  isSingle: boolean;
  rankIndex: number;
  scrollIndex: number;
}) => {
  const { getEntries } = useRequest(eventId, isSingle);

  let translateY = scrollIndex * ENTRY_HEIGHT;
  if (translateY < 0) {
    translateY = 0;
  }

  const entries = getEntries(rankIndex, NUM_ENTRIES_RENDERED);

  return (
    <div className="listWrapper" style={{ height: 3 * SCROLL_PAGE_HEIGHT }}>
      <ol
        className="list"
        style={{ "--translateY": `${translateY}px` } as CSSProperties}
      >
        {entries.map((maybeFields, i) => (
          <Row key={i + rankIndex} animationIndex={i} fields={maybeFields} />
        ))}
      </ol>
      {/* <ol
        className="list"
        style={
          {
            "--translateY": `${translateY + SCROLL_PAGE_HEIGHT}px`,
          } as CSSProperties
        }
      >
        {entries.map((maybeFields, i) => (
          <Row key={i + rankIndex} animationIndex={i} fields={maybeFields} />
        ))}
      </ol> */}
    </div>
  );
};
