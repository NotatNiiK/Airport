import Home from "../pages/Home/Home";
import Registration from "../pages/Registration/Registration";
import type { Routes } from "../models/routes";

const routes: Routes = [
  { id: 0, path: "/", component: Home },
  { id: 1, path: "/registration", component: Registration },
];

export default routes;
