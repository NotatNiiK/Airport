import { FC, useState, useEffect } from "react";
import { useFetching } from "../../../hooks/useFetching";
import { IFlight } from "../../../models/flights";
import { useForm } from "react-hook-form";
import { Alert } from "@mui/material";
import { IAlert } from "../../../models/alert";
import cl from "./GeneralFlightForm.module.scss";
import FormInput from "../../UI/FormInput/FormInput";
import FormButton from "../../UI/FormButton/FormButton";
import Checkbox from "@mui/material/Checkbox";
import FlightsStore from "../../../store/FlightsStore";
import FlightValidation from "../../../validation/FlightValidation";
import formatFlightDate from "../../../utils/formatFlightDate";

interface GeneralFlightFormProps {
  title: string;
  isEdit: boolean;
  isClearForm: boolean;
  flight?: IFlight;
  closeModal: () => void;
}

const GeneralFlightForm: FC<GeneralFlightFormProps> = ({
  title,
  isEdit,
  isClearForm,
  flight,
  closeModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
  } = useForm<IFlight>();

  const [errorAlert, setErrorAlert] = useState<IAlert>({
    error: false,
    message: "",
  });

  useEffect(() => {
    if (isEdit) setEditFormValue();
  }, [flight]);

  useEffect(() => {
    if (!isClearForm && !isEdit) reset();
  }, [isClearForm]);

  function setEditFormValue(): void {
    if (flight) {
      Object.keys(flight).forEach((key) => {
        const flightKey = key as keyof IFlight;
        setValue(flightKey, flight[flightKey]);
      });
    }
  }

  const [handleForm, isLoading] = useFetching(
    async (flightData: IFlight): Promise<void> => {
      flightData.price = +flightData.price;
      flightData.departureTime = formatFlightDate(flightData.departureTime);
      flightData.arrivalTime = formatFlightDate(flightData.arrivalTime);

      if (isEdit) {
        await FlightsStore.updateFlight(flightData);
        await FlightsStore.getFlights();
        closeModal();
        return;
      }

      const response = await FlightsStore.createFlight(flightData);
      if (response.hasError) {
        setErrorAlert({ error: true, message: response.response });
        return;
      }
      await FlightsStore.getFlights();
      reset();
      closeModal();
    }
  );

  return (
    <form className={cl["general-form"]} onSubmit={handleSubmit(handleForm)}>
      <h2 className={cl["general-form__title"]}>{title}</h2>
      <section className={cl["general-form__section"]}>
        <FormInput
          isError={errors.departureLocation}
          {...register("departureLocation", {
            required: true,
          })}
          onBlur={() => clearErrors("departureLocation")}
          placeholder="Departure location"
          tabIndex={1}
        />
      </section>
      <section className={cl["general-form__section"]}>
        <FormInput
          isError={errors.destination}
          {...register("destination", {
            required: true,
          })}
          onBlur={() => clearErrors("destination")}
          placeholder="Destination"
          tabIndex={2}
        />
      </section>
      <section className={cl["general-form__section"]}>
        <FormInput
          isError={errors.flightNumber}
          {...register("flightNumber", {
            required: true,
          })}
          onBlur={() => clearErrors("flightNumber")}
          placeholder="Flight number"
          tabIndex={3}
        />
      </section>
      <section className={cl["general-form__section"]}>
        <FormInput
          isError={errors.price}
          {...register("price", {
            required: true,
            validate: FlightValidation.price,
          })}
          onBlur={() => clearErrors("price")}
          placeholder="Price"
          tabIndex={4}
        />
      </section>
      <section className={cl["general-form__section"]}>
        <FormInput
          isError={errors.departureTime}
          {...register("departureTime", {
            required: true,
            validate: FlightValidation.departureTime,
          })}
          onBlur={() => clearErrors("departureTime")}
          type="datetime-local"
          placeholder="Departure time"
          tabIndex={5}
        />
      </section>
      <section
        className={[
          cl["general-form__section"],
          cl["general-form__section_not-mb"],
        ].join(" ")}
      >
        <FormInput
          isError={errors.arrivalTime}
          {...register("arrivalTime", {
            required: true,
            validate: FlightValidation.arrivalTime,
          })}
          onBlur={() => clearErrors("arrivalTime")}
          type="datetime-local"
          placeholder="Arrival time"
          tabIndex={6}
        />
      </section>
      <section
        className={[
          cl["general-form__section"],
          cl["general-form__section_checkbox"],
        ].join(" ")}
      >
        <span
          className={`${cl["general-form__label"]} ${
            errors.flightStatus ? "text-red-600" : ""
          }`}
        >
          Is flight status active?
        </span>{" "}
        <Checkbox
          {...register("flightStatus", {
            required: true,
          })}
          onBlur={() => clearErrors("flightStatus")}
          size="small"
          tabIndex={7}
        />
      </section>
      <section className={cl["general-form__section"]}>
        <FormButton loading={isLoading} tabIndex={8}>
          Create
        </FormButton>
      </section>
      {errorAlert.error && <Alert severity="error">{errorAlert.message}</Alert>}
    </form>
  );
};

export default GeneralFlightForm;
