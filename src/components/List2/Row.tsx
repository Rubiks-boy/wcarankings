import classNames from "classnames";
import { useRetainValue } from "./useRetainValue";
import { CSSProperties } from "react";
import type { ApiFields } from "../../types";

import "./Row.css";

export const Row = ({
  fields,
  animationIndex,
}: {
  fields: ApiFields | null;
  animationIndex: number;
}) => {
  const rank = useRetainValue(fields?.worldRank) ?? 0;
  const name = useRetainValue(fields?.person.name) ?? "";
  const id = useRetainValue(fields?.person.id) ?? "";

  const style = {
    "--t-animation-delay": `${animationIndex * 10}ms`,
  } as CSSProperties;

  return (
    <li
      className={classNames("listItem", { isLoading: !fields })}
      style={style}
    >
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
