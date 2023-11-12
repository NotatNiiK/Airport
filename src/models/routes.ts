import { FC } from "react";

export interface IRoute {
  path: string;
  component: FC;
}

export type INavLink = Omit<IRoute, "component"> & { text: string };

export type IRoutes = IRoute[];
export type INavLinks = INavLink[];
