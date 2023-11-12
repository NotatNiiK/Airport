import { FC, useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from ".";
import { observer } from "mobx-react-lite";
import AuthStore from "../store/AuthStore";
import { IToken } from "../models/token";
import isUserAuth from "../utils/isUserAuth";

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
  useEffect((): void => {
    if (isUserAuth()) AuthStore.setIsAuth(true);

    const tokenInfo = localStorage.getItem("tokenInfo");
    if (tokenInfo) {
      const parsedTokenInfo: IToken = JSON.parse(tokenInfo);
      AuthStore.setTokenInfo(parsedTokenInfo);
    }
  }, []);

  return AuthStore.isAuth ? <PrivateRoutes /> : <PublicRoutes />;
});

export default PageRouter;
