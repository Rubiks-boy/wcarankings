import classNames from "classnames";

export type Fields = {
  person: {
    id: string;
    name: string;
  };
  best: number;
};

export const Entry = ({
  fields,
  loading,
  index,
}: {
  fields?: Fields;
  loading: boolean;
  index: number;
}) => {
  return (
    <li
      className={classNames("entry", { loading })}
      style={{ "--transition-delay": `${index * 10}ms` } as React.CSSProperties}
    >
      <div className="loader">
        <div className="loaderContent">
          <span className="loaderRank"></span>
          <span className="loaderId"></span>
        </div>
        <div className="loaderBest"></div>
      </div>
      <div className="entryContent">
        <span className="rank">{index + 1}</span>
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
