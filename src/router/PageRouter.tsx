import { FC, useEffect } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import routes from ".";

const PageRouter: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isToken()) {
      navigate("/");
      return;
    }
    navigate("/registration");
  }, []);

  function isToken(): string | null {
    return localStorage.getItem("token");
  }

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
