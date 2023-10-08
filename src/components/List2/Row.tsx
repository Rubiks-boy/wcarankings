import type { ApiFields } from "../../types";

import "./Row.css";

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) {
    return null;
  }
  return (
    <div className="loader">
      <div className="rank loaderBlob"></div>
      <div className="name loaderBlob"></div>
      <div className="best loaderBlob"></div>
    </div>
  );
};

export const Row = ({ fields }: { fields: ApiFields | null }) => {
  const rank = fields?.worldRank ?? 0;
  const name = fields?.person.name ?? "";
  const id = fields?.person.id ?? "";

  console.log(fields);

  return (
    <li className="listItem">
      <Loader isLoading={!fields} />
      <div className="row">
        <span className="rank">{rank}</span>
        <span>{name}</span>
        <span className="wcaId">({id})</span>
        <span className="best">{((fields?.best ?? 0) / 100).toFixed(2)}</span>
      </div>
    </li>
  );
};
