import Home from "../pages/Home/Home";
import Registration from "../pages/Registration/Registration";
import Authorization from "../pages/Authorization/Authorization";
import type { Routes } from "../models/routes";

const routes: Routes = [
  { id: 0, path: "/", text: "Home", component: Home },
  {
    id: 1,
    path: "/authorization",
    text: "Authorization",
    component: Authorization,
  },
  {
    id: 2,
    path: "/registration",
    text: "Registration",
    component: Registration,
  },
];

export default routes;
