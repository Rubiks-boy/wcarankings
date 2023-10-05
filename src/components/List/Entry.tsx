export type Fields = {
  person: string;
  best: number;
};

export const Entry = ({ fields }: { fields?: Fields }) => {
  const { person, best } = fields ?? {};
  return (
    <li className="entry">
      <div className="loader">
        <div className="loaderId"></div>
        <div className="loaderBest"></div>
      </div>
      <div>{person}</div>
      <div>{(best ?? 0) / 100}</div>
    </li>
  );
};
