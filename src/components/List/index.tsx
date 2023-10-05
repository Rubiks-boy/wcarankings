import classNames from "classnames";
import { Entry } from "./Entry";
import { useRequest } from "./useRequest";

import "./index.css";

export const List = ({ eventId }: { eventId: string }) => {
  const { loading, entries } = useRequest(eventId);

  const rows = entries.map((fields, i) => {
    return <Entry key={i} fields={fields} />;
  });

  return <ol className={classNames("list", { loading })}>{rows}</ol>;
};