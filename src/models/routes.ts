import { FC } from "react";

interface IRoute {
  id: number;
  path: string;
  component: FC;
}

type INavLink = Omit<IRoute, "component"> & { text: string };

type IRoutes = IRoute[];
type INavLinks = INavLink[];

export type { IRoutes, INavLinks };
