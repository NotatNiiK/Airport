import Home from "../pages/Home/Home";
import Registration from "../pages/Auth/Registration";
import Authorization from "../pages/Auth/Authorization";
import Tickets from "../pages/Tickets/Tickets";
import About from "../pages/About/About";
import Account from "../pages/Account/Account";
import Baggage from "../pages/Baggage/Baggage";
import { IRoutes } from "../models/routes";

export const publicRoutes: IRoutes = [
  {
    path: "/login",
    component: Authorization,
  },
  {
    path: "/signin",
    component: Registration,
  },
];

export const privateRoutes: IRoutes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  {
    path: "/tickets/:flightId/:flightNumber/:cost/:userId/:departureLocation/:destination/:arrivalTime",
    component: Tickets,
  },
  {
    path: "/account",
    component: Account,
  },
  {
    path: "/baggage/:ticketId",
    component: Baggage,
  },
];
