import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import PageRouter from "./router/PageRouter";

const App: FC = () => {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <main className="main">
          <PageRouter />
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
