import { FC } from "react";

import { Navigate, Routes, Route } from "react-router-dom";
import routes from ".";

const PageRouter: FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        const Component = route.component;
        return <Route element={<Component />} path={route.path} key={index} />;
      })}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default PageRouter;
