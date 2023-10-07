import { useCallback, useEffect, useRef, useState } from "react";
import { Fields } from "./Entry";
import { api } from "../../api";

const MAX_ENTRIES = 75;

export const useRequest = (eventId: string, isSingle: boolean) => {
  const currentRequestRef = useRef<string | null>(null);
  const currPage = useRef(1);
  const [startingIndex, setStartingIndex] = useState(0);
  const [entries, setEntries] = useState<Array<Fields>>([]);

  const type = isSingle ? "single" : "average";

  const addLoadedEntries = (entries: Array<Fields>) => {
    setEntries((es) => {
      const oldEntriesKept = es.slice(-MAX_ENTRIES);
      const numDeleted = es.length - oldEntriesKept.length;
      setStartingIndex((startIndex) => startIndex + numDeleted);
      return [
        ...oldEntriesKept,
        ...entries.map((e: Fields) => ({ ...e, loading: false })),
      ];
    });
  };

  const reset = () => {
    currentRequestRef.current = null;
    currPage.current = 1;
    setEntries([]);
  };

  useEffect(reset, [eventId, type]);

  const requestNextPage = useCallback(() => {
    if (currentRequestRef.current) {
      return;
    }

    const url = `/rankings/${type}?eventId=${eventId}&p=${currPage.current}`;
    currentRequestRef.current = url;

    api.get(url).then((resp) => {
      if (url !== currentRequestRef.current) {
        // request is no longer valid, must have reset
        return;
      }

      addLoadedEntries(resp.data.results);
      currPage.current++;
      currentRequestRef.current = null;
    });
  }, [eventId, type]);

  return {
    startingIndex,
    entries,
    requestNextPage,
  };
};
