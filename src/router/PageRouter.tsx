import { FC } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from ".";
import { observer } from "mobx-react-lite";
import AuthStore from "../store/AuthStore";

const PrivateRoutes: FC = () => (
  <Routes>
    {privateRoutes.map((route) => {
      const Component = route.component;
      return (
        <Route element={<Component />} path={route.path} key={route.path} />
      );
    })}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

const PublicRoutes: FC = () => (
  <Routes>
    {publicRoutes.map((route) => {
      const Component = route.component;
      return (
        <Route element={<Component />} path={route.path} key={route.path} />
      );
    })}
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

const PageRouter: FC = observer(() => {
  return AuthStore.isAuth ? <PrivateRoutes /> : <PublicRoutes />;
});

export default PageRouter;
