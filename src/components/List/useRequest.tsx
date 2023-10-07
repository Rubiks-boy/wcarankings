import { useCallback, useEffect, useRef, useState } from "react";
import { Fields } from "./Entry";
import { api } from "../../api";
import { MAX_PAGES, PAGE_SIZE } from "../../constants";

export const useRequest = (eventId: string, isSingle: boolean) => {
  const currentRequestRef = useRef<string | null>(null);
  const firstPage = useRef(1);
  const lastPage = useRef(1);
  const [entries, setEntries] = useState<Array<Fields>>([]);

  const type = isSingle ? "single" : "average";

  const prependEntries = (entries: Array<Fields>) => {
    setEntries((es) => {
      const oldEntriesKept = es.slice(0, MAX_PAGES * PAGE_SIZE);
      const pagesDeleted = (es.length - oldEntriesKept.length) / PAGE_SIZE;
      lastPage.current -= pagesDeleted;
      const prevFirstIndex = oldEntriesKept[0]?.globalIndex ?? 0;
      return [
        ...entries.map((e: Fields, i) => ({
          ...e,
          loading: false,
          globalIndex: prevFirstIndex - entries.length + i,
        })),
        ...oldEntriesKept,
      ];
    });
  };

  const appendEntries = (entries: Array<Fields>) => {
    setEntries((es) => {
      const oldEntriesKept = es.slice(-MAX_PAGES * PAGE_SIZE);
      const pagesDeleted = (es.length - oldEntriesKept.length) / PAGE_SIZE;
      firstPage.current += pagesDeleted;
      const prevLastIndex =
        oldEntriesKept[oldEntriesKept.length - 1]?.globalIndex ?? -1;
      return [
        ...oldEntriesKept,
        ...entries.map((e: Fields, i) => ({
          ...e,
          loading: false,
          globalIndex: prevLastIndex + i + 1,
        })),
      ];
    });
  };

  const requestPage = useCallback(
    (page: number, cb: (entries: Array<Fields>) => void) => {
      if (currentRequestRef.current) {
        return;
      }

      const url = `/rankings/${type}?eventId=${eventId}&p=${page}`;
      currentRequestRef.current = url;

      api.get(url).then((resp) => {
        if (url !== currentRequestRef.current) {
          // request is no longer valid, must have reset
          return;
        }

        const entries = resp.data.results.map((e: Fields, i: number) => ({
          ...e,
          globalIndex: (page - 1) * PAGE_SIZE + i,
        }));

        cb(entries);
      });
    },
    [eventId, type]
  );

  const requestNextPage = useCallback(() => {
    requestPage(lastPage.current, (entries) => {
      appendEntries(entries);
      lastPage.current++;
      currentRequestRef.current = null;
    });
  }, [requestPage]);

  const requestPreviousPage = useCallback(() => {
    if (firstPage.current <= 1) {
      return;
    }

    requestPage(firstPage.current - 1, (entries) => {
      prependEntries(entries);
      firstPage.current--;
      currentRequestRef.current = null;
    });
  }, [requestPage]);

  const reset = () => {
    currentRequestRef.current = null;
    firstPage.current = 1;
    lastPage.current = 1;
    setEntries([]);
  };

  useEffect(reset, [eventId, type]);

  return {
    startingIndex: (firstPage.current - 1) * PAGE_SIZE,
    entries,
    requestNextPage,
    requestPreviousPage,
  };
};
