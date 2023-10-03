import type { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { api } from "../api";

export const TestComponent = () => {
  const [res, setRes] = useState<null | AxiosResponse>(null);

  useEffect(() => {
    api.get("/rankings/single?event=444").then((resp) => {
      console.log("resp", resp);
      setRes(resp);
    });
  }, []);

  if (!res?.data) {
    return <div>Loading...</div>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return res.data.map(({ fields }: any) => {
    return <div>{fields.personId}</div>;
  });
};
