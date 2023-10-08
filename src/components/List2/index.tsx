import { useRequest } from "./useRequest";
import { Row } from "./Row";
import { CSSProperties } from "react";
import { useFirstIndexInView } from "./useFirstIndexInView";

import "./index.css";
import { ENTRY_HEIGHT } from "../../constants";

const NUM_ENTRIES_RENDERED = 25;

export const List = ({
  eventId,
  isSingle,
}: {
  eventId: string;
  isSingle: boolean;
}) => {
  const { getEntries } = useRequest(eventId, isSingle);
  const startIndex = useFirstIndexInView();

  let translateY = startIndex * ENTRY_HEIGHT;
  if (translateY < 0) {
    translateY = 0;
  }

  const entries = getEntries(startIndex, NUM_ENTRIES_RENDERED);

  return (
    <div className="listWrapper">
      <ol
        className="list"
        style={{ "--translateY": `${translateY}px` } as CSSProperties}
      >
        {entries.map((maybeFields, i) => (
          <Row key={i + startIndex} animationIndex={i} fields={maybeFields} />
        ))}
      </ol>
    </div>
  );
};
