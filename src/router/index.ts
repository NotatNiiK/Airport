import Home from "../pages/Home/Home";
import Registration from "../pages/Auth/Registration";
import Authorization from "../pages/Auth/Authorization";
import Tickets from "../pages/Tickets/Tickets";
import About from "../pages/About/About";
import Account from "../pages/Account/Account";
import { IRoutes } from "../models/routes";

export const publicRoutes: IRoutes = [
  {
    id: 0,
    path: "/login",
    component: Authorization,
  },
  {
    id: 1,
    path: "/signin",
    component: Registration,
  },
];

export const privateRoutes: IRoutes = [
  { id: 0, path: "/", component: Home },
  { id: 1, path: "/about", component: About },
  {
    id: 2,
    path: "/tickets/:flightId/:flightNumber/:cost/:userId",
    component: Tickets,
  },
  {
    id: 3,
    path: "/account/:userId",
    component: Account,
  },
];
