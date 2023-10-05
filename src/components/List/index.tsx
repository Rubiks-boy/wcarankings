import { Entry } from "./Entry";
import { useRequest } from "./useRequest";

import "./index.css";

export const List = ({
  eventId,
  isSingle,
  page,
}: {
  eventId: string;
  isSingle: boolean;
  page: number;
}) => {
  const { loading, entries } = useRequest(eventId, isSingle, page);

  const rows = entries.map((fields, i) => {
    return (
      <Entry
        key={i}
        index={i}
        rank={fields.worldRank}
        fields={fields}
        loading={loading}
      />
    );
  });

  return <ol className="list">{rows}</ol>;
};
