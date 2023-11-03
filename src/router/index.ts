import Home from "../pages/Home/Home";
import Registration from "../pages/Auth/Registration";
import Authorization from "../pages/Auth/Authorization";
import { IRoutes } from "../models/routes";

const routes: IRoutes = [
  { id: 0, path: "/", component: Home },
  {
    id: 1,
    path: "/login",
    component: Authorization,
  },
  {
    id: 2,
    path: "/signin",
    component: Registration,
  },
];

export default routes;
