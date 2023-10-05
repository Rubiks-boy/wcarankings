export type Fields = {
  personId: string;
  best: number;
};

export const Entry = ({ fields }: { fields?: Fields }) => {
  const { personId, best } = fields ?? {};
  return (
    <li className="entry">
      <div className="loader">
        <div className="loaderId"></div>
        <div className="loaderBest"></div>
      </div>
      <div>{personId}</div>
      <div>{best}</div>
    </li>
  );
};
