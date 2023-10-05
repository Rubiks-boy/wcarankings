import { useEffect, useState } from "react";
import { Fields } from "./Entry";
import { api } from "../../api";

const DEFAULT_ENTRIES = [...Array(100).keys()].map(() => ({
  person: "-",
  best: 0,
}));

export const useRequest = (eventId: string) => {
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<Array<Fields>>(DEFAULT_ENTRIES);

  useEffect(() => {
    setLoading(true);

    api.get(`/rankings/single?eventId=${eventId}`).then((resp) => {
      setLoading(false);
      setEntries(resp.data.map(({ fields }: { fields: Fields }) => fields));
    });
  }, [eventId]);

  return {
    loading: loading || !entries.length,
    entries: entries.length ? entries : DEFAULT_ENTRIES,
  };
};
