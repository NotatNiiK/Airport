interface IBaggage {
  id?: number;
  width: string;
  height: string;
  weight: string;
  cost: string;
  tiketId: string;
}

type IBaggages = IBaggage[];

export type { IBaggage, IBaggages };
