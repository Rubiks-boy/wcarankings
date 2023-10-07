import classNames from "classnames";
import React from "react";
import type { EntryFields } from "../../types";
import { PAGE_SIZE } from "../../constants";
import { useRetainValue } from "./useRetainValue";

export const Entry = ({
  fields,
  rank,
  animationIndex,
}: {
  fields?: EntryFields;
  rank: number;
  animationIndex: number;
}) => {
  const transitionDelay = animationIndex % PAGE_SIZE;

  const name = useRetainValue(fields?.person.name);
  const id = useRetainValue(fields?.person.id);
  const rankIndex = useRetainValue(rank);

  return (
    <li
      className={classNames("entry", {
        loading: !!fields?.loading,
        hide: (fields?.globalIndex ?? 0) < 0,
      })}
      style={
        {
          "--transition-delay": `${transitionDelay * 10}ms`,
        } as React.CSSProperties
      }
    >
      <div className="loader">
        <div className="loaderContent">
          <span className="loaderRank blob"></span>
          <span className="loaderId blob"></span>
        </div>
        <div className="loaderBest blob"></div>
      </div>
      <div className="entryContent">
        <span className="rank">{rankIndex}</span>
        <span>{name}</span>
        <span className="wcaId">({id})</span>
      </div>
      <div className="entryContent">
        {((fields?.best ?? 0) / 100).toFixed(2)}
      </div>
    </li>
  );
};
