import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import PageRouter from "./router/PageRouter";
import AuthStore from "./store/AuthStore";

const App: FC = () => {
  if (localStorage.getItem("token")) {
    AuthStore.setIsAuth(true);
  }
  return (
    <div className="wrapper">
      <BrowserRouter>
        <PageRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;
