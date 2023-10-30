import { FC } from "react";

interface Route {
  id: number;
  path: string;
  text: string;
  component: FC;
}

type Routes = Route[];

export type { Routes };
