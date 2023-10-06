import classNames from "classnames";

export type Fields = {
  person: {
    id: string;
    name: string;
  };
  best: number;
  worldRank: number;
};

export const Entry = ({
  fields,
  loading,
  rank,
  index,
}: {
  fields?: Fields;
  loading: boolean;
  rank: number;
  index: number;
}) => {
  return (
    <li
      className={classNames("entry", { loading })}
      style={{ "--transition-delay": `${index * 8}ms` } as React.CSSProperties}
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
