export type ApiFields = {
  person: {
    id: string;
    name: string;
  };
  best: number;
  worldRank: number;
};

export type EntryFields = ApiFields & {
  loading: boolean;
  globalIndex: number;
  animationIndex: number;
};

export type FieldsWithIndex = ApiFields & { globalIndex: number };
