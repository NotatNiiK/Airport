export interface IBaggage {
  id?: number;
  width: string;
  height: string;
  weight: string;
  cost: string;
  tiketId: string;
}

export type IBaggages = IBaggage[];
