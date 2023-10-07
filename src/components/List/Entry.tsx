import classNames from "classnames";
import React from "react";
import type { EntryFields } from "../../types";
import { PAGE_SIZE } from "../../constants";

export const Entry = ({
  fields,
  rank,
  animationIndex,
}: {
  fields?: EntryFields;
  rank: number;
  animationIndex: number;
}) => {
  const transitionDelay = animationIndex < PAGE_SIZE ? animationIndex : 0;

  return (
    <li
      className={classNames("entry", {
        loading: !!fields?.loading,
        hide: (fields?.globalIndex ?? 0) < 0,
      })}
      style={
        {
          "--transition-delay": `${transitionDelay * 8}ms`,
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
        <span className="rank">{rank}</span>
        <span>
          {fields?.person.name} ({fields?.person.id})
        </span>
      </div>
      <div className="entryContent">
        {((fields?.best ?? 0) / 100).toFixed(2)}
      </div>
    </li>
  );
};
