import { Entry } from "./Entry";
import { useRequest } from "./useRequest";

import "./index.css";

export const List = ({
  eventId,
  isSingle,
}: {
  eventId: string;
  isSingle: boolean;
}) => {
  const { loading, entries } = useRequest(eventId, isSingle);

  const rows = entries.map((fields, i) => {
    return <Entry key={i} index={i} fields={fields} loading={loading} />;
  });

  return <ol className="list">{rows}</ol>;
};
