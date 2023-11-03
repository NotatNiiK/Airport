import { FC } from "react";
import Header from "../../components/Header/Header";
import Introduction from "../../layouts/Home/Inroduction/Introduction";
import Flights from "../../layouts/Home/Flights/Flights";
import Footer from "../../components/Footer/Footer";

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
      <Footer />
    </>
  );
};

export default Home;
