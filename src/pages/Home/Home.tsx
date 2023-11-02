import { FC } from "react";
import Header from "../../components/Header/Header";
import Introduction from "../../layouts/Home/Inroduction/Introduction";
import Flights from "../../layouts/Home/Flights/Flights";

const Home: FC = () => {
  return (
    <>
      <Header />
      <main className="main">
        <section className="home">
          <Introduction />
          <Flights />
        </section>
      </main>
    </>
  );
};

export default Home;
