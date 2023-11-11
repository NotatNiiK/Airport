import { FC, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { IToken } from "./models/token";
import PageRouter from "./router/PageRouter";
import isUserAuth from "./utils/isUserAuth";
import AuthStore from "./store/AuthStore";

const App: FC = () => {
  useEffect((): void => {
    if (isUserAuth()) AuthStore.setIsAuth(true);

    const tokenInfo = localStorage.getItem("tokenInfo");
    if (tokenInfo) {
      const parsedTokenInfo: IToken = JSON.parse(tokenInfo);
      AuthStore.setTokenInfo(parsedTokenInfo);
    }
  }, []);

  return (
    <div className="wrapper">
      <BrowserRouter>
        <PageRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;
