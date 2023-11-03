import { FC } from "react";
import cl from "./Tickets.module.scss";
import { useParams } from "react-router-dom";

const Tickets: FC = () => {
  const { flightId } = useParams();
  return (
    <div className={cl["tickets"]}>
      <div className={cl["tickets__body"]}>
        <h1 className={cl["tickets__title"]}>Buy Ticket</h1>
        <form className={cl["tickets__form"]}>
          <section className={cl["tickets__section"]}>
            <label htmlFor="class">Select class: </label>
            <select className={cl["tickets__select"]} id="class">
              <option value="">Bussines</option>
              <option value="">Econom</option>
            </select>
          </section>
          <section className={cl["tickets__section"]}>
            <label>Select place: </label>
            <select className={cl["tickets__select"]}>
              <option value="">1</option>
              <option value="">32</option>
              <option value="">45</option>
              <option value="">31</option>
            </select>
          </section>
          <section className={cl["tickets__section"]}>
            <button className={cl["tickets__button"]}>Buy</button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Tickets;
