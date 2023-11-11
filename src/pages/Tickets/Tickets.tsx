import { FC } from "react";
import { useParams, Link } from "react-router-dom";
import { ITicket } from "../../models/ticket";
import { useForm } from "react-hook-form";
import { useAlert } from "../../hooks/useAlert";
import { useFetching } from "../../hooks/useFetching";
import { IOptions } from "../../models/options";
import cl from "./Tickets.module.scss";
import TicketButton from "../../components/UI/TicketButton/TicketButton";
import TicketSelect from "../../components/UI/TicketSelect/TicketSelect";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import TicketStore from "../../store/TicketStore";
import formatTicketDate from "../../utils/formatTicketDate";

const Tickets: FC = () => {
  const { flightId, flightNumber, cost, userId } = useParams();
  const [errorAlert, showAlert] = useAlert();

  const [createTicket, isLoading] = useFetching(
    async (ticket: ITicket): Promise<void> => {
      const newTicket = {
        ...ticket,
        userId: userId || "",
        flightNumber: flightNumber || "",
        cost: cost || "",
        flightId: flightId || "",
        flightStatus: true,
        purchaseDate: formatTicketDate(),
      };
      const createResponse = await TicketStore.createTicket(newTicket);
      if (createResponse.hasError) {
        showAlert(createResponse.response);
      }
    }
  );

  const classOptions: IOptions = [
    { id: 0, text: "Econom", value: "Econom" },
    { id: 1, text: "Business", value: "Business" },
  ];

  const placeOptions: IOptions = [
    { id: 0, text: "1", value: "1" },
    { id: 1, text: "2", value: "2" },
    { id: 3, text: "22", value: "22" },
    { id: 4, text: "52", value: "52" },
    { id: 5, text: "67", value: "67" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ITicket>();

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
            <TicketSelect
              defaultValue="Choose class"
              options={classOptions}
              {...(register("classes"),
              {
                required: true,
              })}
              isError={errors.classes}
              onBlur={() => clearErrors("classes")}
              id="class"
              tabIndex={1}
            />
          </section>
          <section className={cl["tickets__section"]}>
            <label htmlFor="place">Select place: </label>
            <TicketSelect
              defaultValue="Choose place"
              options={placeOptions}
              {...(register("place"),
              {
                required: true,
              })}
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
        <Link to="/" className={cl["tickets__link"]}>
          Go home
        </Link>
      </div>
      <ErrorAlert isError={errorAlert.error} message={errorAlert.message} />
    </div>
  );
};

export default Tickets;
