import { FC } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFetching } from "../../hooks/useFetching";
import { ITicket } from "../../models/ticket";
import { useAlert } from "../../hooks/useAlert";
import { classOptions, placeOptions } from "../../data/options";
import cl from "./Tickets.module.scss";
import TicketButton from "../../components/UI/TicketButton/TicketButton";
import TicketSelect from "../../components/UI/TicketSelect/TicketSelect";
import Notify from "../../components/UI/Notify/Notify";
import TicketStore from "../../store/TicketStore";
import formatTicketDate from "../../utils/formatTicketDate";

const Tickets: FC = () => {
  const {
    flightId,
    cost,
    userId,
    departureLocation,
    destination,
    arrivalTime,
  } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ITicket>();

  const [errorAlert, showErrorAlert] = useAlert();
  const [successAlert, showSuccessAlert] = useAlert();

  const [createTicket, isLoading] = useFetching(
    async (ticket: ITicket): Promise<void> => {
      const newTicket: ITicket = {
        ...ticket,
        departureLocation: departureLocation || "",
        destination: destination || "",
        arrivalTime: arrivalTime || "",
        cost: cost || "",
        flightId: flightId || "",
        userId: userId || "",
        flightStatus: true,
        purchaseDate: formatTicketDate(),
      };

      const createTicketResponse = await TicketStore.createTicket(newTicket);

      if (createTicketResponse.hasError) {
        showErrorAlert(createTicketResponse.response);
        return;
      }

      showSuccessAlert(createTicketResponse.response);
    }
  );

  return (
    <div className={cl["tickets"]}>
      <div className={cl["tickets__body"]}>
        <h1 className={cl["tickets__title"]}>Buy Ticket</h1>
        <form
          className={cl["tickets__form"]}
          onSubmit={handleSubmit(createTicket)}
        >
          <section className={cl["tickets__section"]}>
            <label htmlFor="class">Select class:</label>
            <TicketSelect
              options={classOptions}
              defaultValue="Choose class"
              {...register("classes", { required: true })}
              isError={errors.classes}
              onBlur={() => clearErrors("classes")}
              id="class"
              tabIndex={1}
            />
          </section>
          <section className={cl["tickets__section"]}>
            <label htmlFor="place">Select place:</label>
            <TicketSelect
              options={placeOptions}
              defaultValue="Choose place"
              {...register("place", { required: true })}
              isError={errors.place}
              onBlur={() => clearErrors("place")}
              id="place"
              tabIndex={2}
            />
          </section>
          <section className={cl["tickets__section"]}>
            <TicketButton loading={isLoading} tabIndex={3}>
              Buy
            </TicketButton>
          </section>
        </form>
        <div className={cl["tickets__links"]}>
          <Link to="/" className={cl["tickets__link"]}>
            Go home
          </Link>
          <Link to="/account" className={cl["tickets__link"]}>
            Show tickets
          </Link>
        </div>
      </div>
      <Notify
        show={errorAlert.show}
        message={errorAlert.message}
        type="error"
      />
      <Notify
        show={successAlert.show}
        message={successAlert.message}
        type="success"
      />
    </div>
  );
};

export default Tickets;
