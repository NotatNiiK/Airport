import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import PageRouter from "./router/PageRouter";
import Header from "./components/Header/Header";

const App: FC = () => {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header />
        <main className="main">
          <PageRouter />
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
