import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import PageRouter from "./router/PageRouter";
import isUserAuth from "./utils/isUserAuth";
import AuthStore from "./store/AuthStore";

const App: FC = () => {
  if (isUserAuth()) AuthStore.setIsAuth(true);

  return (
    <div className="wrapper">
      <BrowserRouter>
        <PageRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;
