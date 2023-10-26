import { FC } from "react";

interface Route {
  id: number;
  path: string;
  component: FC;
}

type Routes = Route[];

export type { Routes };
