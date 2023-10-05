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
          <div className="loaderRank"></div>
          <div className="loaderId"></div>
        </div>
        <div className="loaderBest"></div>
      </div>
      <div className="entry--content">
        <span>{index}</span>
        <span>
          {fields?.person.name} ({fields?.person.id})
        </span>
      </div>
      <div>{((fields?.best ?? 0) / 100).toFixed(2)}</div>
    </li>
  );
};
