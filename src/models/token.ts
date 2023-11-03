interface IToken {
  id: number;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

export type { IToken };
