import { useEffect, useState } from "react";
import { Fields } from "./Entry";
import { api } from "../../api";

const DEFAULT_ENTRIES = [...Array(100).keys()].map(() => ({
  person: {
    id: "-",
    name: "-",
  },
  worldRank: 1,
  best: 0,
}));

export const useRequest = (
  eventId: string,
  isSingle: boolean,
  page: number
) => {
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<Array<Fields>>(DEFAULT_ENTRIES);

  useEffect(() => {
    setLoading(true);

    const type = isSingle ? "single" : "average";

    api.get(`/rankings/${type}?eventId=${eventId}&p=${page}`).then((resp) => {
      console.log(resp.data);
      setLoading(false);
      setEntries(resp.data.results);
    });
  }, [eventId, isSingle, page]);

  return {
    loading: loading || !entries.length,
    entries: !loading && entries.length ? entries : DEFAULT_ENTRIES,
  };
};
