import classNames from "classnames";
import type { ApiFields } from "../../types";

import "./Row.css";
import { useRetainValue } from "./useRetainValue";

export const Row = ({ fields }: { fields: ApiFields | null }) => {
  const rank = useRetainValue(fields?.worldRank) ?? 0;
  const name = useRetainValue(fields?.person.name) ?? "";
  const id = useRetainValue(fields?.person.id) ?? "";

  return (
    <li className={classNames("listItem", { isLoading: !fields })}>
      <div className="loader">
        <div className="rank loaderBlob"></div>
        <div className="name loaderBlob"></div>
        <div className="best loaderBlob"></div>
      </div>
      <div className="row">
        <span className="rank">{rank}</span>
        <span>{name}</span>
        <span className="wcaId">({id})</span>
        <span className="best">{((fields?.best ?? 0) / 100).toFixed(2)}</span>
      </div>
    </li>
  );
};
