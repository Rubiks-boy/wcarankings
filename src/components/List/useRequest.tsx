import { useCallback, useRef, useState } from "react";
import { Fields } from "./Entry";
import { api } from "../../api";

export const useRequest = (eventId: string, isSingle: boolean) => {
  const isLoadingRef = useRef(false);
  const currPage = useRef(1);
  const [entries, setEntries] = useState<Array<Fields>>([]);

  const type = isSingle ? "single" : "average";

  const addLoadedEntries = (entries: Array<Fields>) => {
    setEntries((es) => [
      ...es,
      ...entries.map((e: Fields) => ({ ...e, loading: false })),
    ]);
  };

  const requestNextPage = useCallback(() => {
    if (isLoadingRef.current) {
      return;
    }

    isLoadingRef.current = true;

    api
      .get(`/rankings/${type}?eventId=${eventId}&p=${currPage.current}`)
      .then((resp) => {
        currPage.current++;
        isLoadingRef.current = false;

        addLoadedEntries(resp.data.results);
      });
  }, [eventId, type]);

  return {
    entries,
    requestNextPage,
  };
};
