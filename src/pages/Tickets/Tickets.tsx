import { FC } from "react";
import cl from "./Tickets.module.scss";
import { useParams } from "react-router-dom";
import TicketStore from "../../store/TicketStore";
import { ITicket } from "../../models/ticket";
import { useForm } from "react-hook-form";

const Tickets: FC = () => {
  const { flightId, flightNumber, cost, userId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<ITicket>();

  async function createTicket(ticket: ITicket): Promise<void> {
    const newTicket = {
      ...ticket,
      userId: userId || "",
      flightNumber: flightNumber || "",
      cost: cost || "",
      flightId: flightId || "",
      flightStatus: true,
      purchaseDate: "31.12.2004 15:31",
    };
    const r = await TicketStore.createTicket(newTicket);
    console.log(r.response);
  }

  return (
    <div className={cl["tickets"]}>
      <div className={cl["tickets__body"]}>
        <h1 className={cl["tickets__title"]}>Buy Ticket</h1>
        <form
          className={cl["tickets__form"]}
          onSubmit={handleSubmit(createTicket)}
        >
          <section className={cl["tickets__section"]}>
            <label htmlFor="class">Select class: </label>
            <select
              className={cl["tickets__select"]}
              id="class"
              {...register("classes")}
              tabIndex={1}
            >
              <option value="Bussines">Bussines</option>
              <option value="Econom">Econom</option>
            </select>
          </section>
          <section className={cl["tickets__section"]}>
            <label>Select place: </label>
            <select
              className={cl["tickets__select"]}
              {...register("place")}
              tabIndex={1}
            >
              <option value="1">1</option>
              <option value="32">32</option>
              <option value="45">45</option>
              <option value="31">31</option>
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
