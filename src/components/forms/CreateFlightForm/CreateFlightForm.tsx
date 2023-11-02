import { FC, useState } from "react";
import cl from "./CreateFlightForm.module.scss";
import FormInput from "../../UI/FormInput/FormInput";
import FormButton from "../../UI/FormButton/FormButton";
import Checkbox from "@mui/material/Checkbox";
import { useFetching } from "../../../hooks/useFetching";
import { ICreateData } from "../../../models/flights";
import { useForm } from "react-hook-form";
import FlightsStore from "../../../store/FlightsStore";
import FlightValidation from "../../../validation/FlightValidation";
import { Alert } from "@mui/material";
import { IAlert } from "../../../models/alert";

interface CreateFlightFormProps {
  closeModal: () => void;
}

const CreateFlightForm: FC<CreateFlightFormProps> = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<ICreateData>();

  const [errorAlert, setErrorAlert] = useState<IAlert>({
    error: false,
    message: "",
  });

  const [createFlight, isLoading] = useFetching(
    async (flight: ICreateData): Promise<void> => {
      const response = await FlightsStore.createFlight(flight);
      if (response.hasError) {
        setErrorAlert({ error: true, message: response.response });
        return;
      }
      reset();
      closeModal();
    }
  );

  return (
    <form className={cl["create-form"]} onSubmit={handleSubmit(createFlight)}>
      <h2 className={cl["create-form__title"]}>Create Flight</h2>
      <section className={cl["create-form__section"]}>
        <FormInput
          {...register("flightNumber", {
            required: true,
            validate: FlightValidation.required,
          })}
          style={{ boxShadow: errors.flightNumber ? "0px 0px 7px red" : "" }}
          onBlur={() => clearErrors("flightNumber")}
          placeholder="Flight number"
          tabIndex={1}
        />
      </section>
      <section className={cl["create-form__section"]}>
        <FormInput
          {...register("departureLocation", {
            required: true,
            validate: FlightValidation.required,
          })}
          style={{
            boxShadow: errors.departureLocation ? "0px 0px 7px red" : "",
          }}
          onBlur={() => clearErrors("departureLocation")}
          placeholder="Departure location"
          tabIndex={2}
        />
      </section>
      <section className={cl["create-form__section"]}>
        <FormInput
          {...register("destination", {
            required: true,
            validate: FlightValidation.required,
          })}
          style={{
            boxShadow: errors.destination ? "0px 0px 7px red" : "",
          }}
          onBlur={() => clearErrors("destination")}
          placeholder="Destination"
          tabIndex={3}
        />
      </section>
      <section className={cl["create-form__section"]}>
        <FormInput
          {...register("departureTime", {
            required: true,
            validate: FlightValidation.departureTime,
          })}
          style={{
            boxShadow: errors.departureTime ? "0px 0px 7px red" : "",
          }}
          onBlur={() => clearErrors("departureTime")}
          type="datetime-local"
          placeholder="Departure time"
          tabIndex={4}
        />
      </section>
      <section
        className={[
          cl["create-form__section"],
          cl["create-form__section_not-mb"],
        ].join(" ")}
      >
        <FormInput
          {...register("arrivalTime", {
            required: true,
            validate: FlightValidation.arrivalTime,
          })}
          style={{
            boxShadow: errors.arrivalTime ? "0px 0px 7px red" : "",
          }}
          onBlur={() => clearErrors("arrivalTime")}
          type="datetime-local"
          placeholder="Arrival time"
          tabIndex={5}
        />
      </section>
      <section
        className={[
          cl["create-form__section"],
          cl["create-form__section_checkbox"],
        ].join(" ")}
      >
        <span
          className={cl["create-form__label"]}
          style={{
            color: errors.flightStatus ? "red" : "",
          }}
        >
          Is flight status active?
        </span>{" "}
        <Checkbox
          {...register("flightStatus", {
            required: true,
            validate: FlightValidation.isActive,
          })}
          onBlur={() => clearErrors("flightStatus")}
          size="small"
        />
      </section>
      <section className={cl["create-form__section"]}>
        <FormButton loading={isLoading} tabIndex={7}>
          Create
        </FormButton>
      </section>
      {errorAlert.error && <Alert severity="error">{errorAlert.message}</Alert>}
    </form>
  );
};

export default CreateFlightForm;
