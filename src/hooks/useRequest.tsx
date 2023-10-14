import { useEffect, useRef, useState } from "react";
import { api } from "../api";
import { PAGE_SIZE } from "../constants";
import type { ApiFields } from "../types";

type FieldsWithIndex = ApiFields & { index: number };
type Page = Array<FieldsWithIndex>;

const getPageIndices = (startIndex: number, endIndex: number) => {
  const firstPage = Math.floor(startIndex / PAGE_SIZE) + 1;
  const lastPage = Math.ceil(endIndex / PAGE_SIZE) + 1;

  return { firstPage, lastPage };
};

export const useRequest = (eventId: string, isSingle: boolean) => {
  const controller = useRef<AbortController>();
  const inProgressRequests = useRef<Array<boolean>>([]);
  const [pages, setPages] = useState<Array<Page>>([]);
  const [count, setCount] = useState<number>(Infinity);
  const type = isSingle ? "single" : "average";

  const requestPage = (page: number) => {
    if (pages[page] || inProgressRequests.current[page]) {
      return;
    }
    if (page < 1) {
      return;
    }

    inProgressRequests.current[page] = true;

    const url = `/rankings/${type}?eventId=${eventId}&p=${page}`;
    api.get(url, { signal: controller.current?.signal }).then((resp) => {
      const { count } = resp.data;
      const entries = resp.data.results.map((e: ApiFields, i: number) => ({
        ...e,
        index: (page - 1) * PAGE_SIZE + i,
      })) as Array<FieldsWithIndex>;

      count && setCount(count);
      setPages((pages) => {
        const newPages = [...pages];
        newPages[page] = entries.map((e, i) => ({
          ...e,
          index: (page - 1) * PAGE_SIZE + i,
        }));
        return newPages;
      });
    });
  };

  const loadRange = (startIndex: number, endIndex: number) => {
    const { firstPage, lastPage } = getPageIndices(startIndex, endIndex);
    for (let i = firstPage; i <= lastPage; i++) {
      requestPage(i);
    }
  };

  const getEntries = (
    startIndex: number,
    howMany: number
  ): Array<FieldsWithIndex | null> => {
    const endIndex = startIndex + howMany;
    loadRange(startIndex, endIndex);

    const entries: Array<FieldsWithIndex> = [];
    for (let i = Math.max(0, startIndex); i < endIndex; i++) {
      const page = Math.floor(i / PAGE_SIZE) + 1;
      const e = pages[page]?.[i % PAGE_SIZE];
      entries.push(e ?? null);
    }

    return entries;
  };

  const reset = () => {
    controller.current?.abort();
    inProgressRequests.current = [];
    setPages([]);
  };

  useEffect(reset, [eventId, type]);

  return { getEntries, count };
};
