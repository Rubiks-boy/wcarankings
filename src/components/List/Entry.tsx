import classNames from "classnames";

export type Fields = {
  person: string;
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
  const { person, best } = fields ?? {};
  return (
    <li
      className={classNames("entry", { loading })}
      style={{ "--transition-delay": `${index * 10}ms` } as React.CSSProperties}
    >
      <div className="loader">
        <div className="loaderContent">
          <div className="loaderRank"></div>
          <div className="loaderId"></div>
        </div>
        <div className="loaderBest"></div>
      </div>
      <div className="entry--content">
        <span>{index}</span>
        <span>{person}</span>
      </div>
      <div>{(best ?? 0) / 100}</div>
    </li>
  );
};
