import Home from "../pages/Home/Home";
import Registration from "../pages/Auth/Registration";
import Authorization from "../pages/Auth/Authorization";
import type { Routes } from "../models/routes";

const routes: Routes = [
  { id: 0, path: "/", text: "Home", component: Home },
  {
    id: 1,
    path: "/login",
    text: "Login",
    component: Authorization,
  },
  {
    id: 2,
    path: "/signin",
    text: "Sign in",
    component: Registration,
  },
];

export default routes;
