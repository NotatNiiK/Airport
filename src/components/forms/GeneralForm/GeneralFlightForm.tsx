import { FC, useEffect } from "react";
import { useFetching } from "../../../hooks/useFetching";
import { useAlert } from "../../../hooks/useAlert";
import { IFlight } from "../../../models/flight";
import { useForm } from "react-hook-form";
import cl from "./GeneralForm.module.scss";
import FormInput from "../../UI/FormInput/FormInput";
import FormButton from "../../UI/FormButton/FormButton";
import Notify from "../../UI/Notify/Notify";
import Checkbox from "@mui/material/Checkbox";
import FlightsStore from "../../../store/FlightStore";
import FlightValidation from "../../../validation/FlightValidation";
import splitDate from "../../../utils/splitDate";

interface GeneralFlightFormProps {
  title: string;
  closeModal: () => void;
  isEdit?: boolean;
  isClearForm?: boolean;
  flight?: IFlight;
}

const GeneralFlightForm: FC<GeneralFlightFormProps> = ({
  title,
  closeModal,
  isEdit,
  isClearForm,
  flight,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
  } = useForm<IFlight>();

  const [errorAlert, showErrorAlert] = useAlert();

  useEffect((): void => {
    if (isEdit) setEditFormValue();
  }, [flight]);

  useEffect((): void => {
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
      flightData.departureTime = splitDate(flightData.departureTime);
      flightData.arrivalTime = splitDate(flightData.arrivalTime);

      let apiResponse;

      if (isEdit) {
        apiResponse = await FlightsStore.updateFlight(flightData);
      } else {
        apiResponse = await FlightsStore.createFlight(flightData);
      }

      if (apiResponse.hasError) {
        showErrorAlert(apiResponse.response);
        return;
      }

      await FlightsStore.getFlights();

      if (!isEdit) {
        reset();
      }

      closeModal();
    }
  );

  const checkBoxErrorClasses: string = [
    cl["general-form__label"],
    errors.flightStatus ? "text-red-600" : "",
  ].join(" ");

  const fifthSectionClasses: string = [
    cl["general-form__section"],
    cl["general-form__section_margin-zero"],
  ].join(" ");

  const checkboxSectionClasses: string = [
    cl["general-form__section"],
    cl["general-form__section_checkbox"],
  ].join(" ");

  return (
    <form className={cl["general-form"]} onSubmit={handleSubmit(handleForm)}>
      <h2 className={cl["general-form__title"]}>{title}</h2>
      <section className={cl["general-form__section"]}>
        <FormInput
          {...register("departureLocation", {
            required: true,
          })}
          isError={errors.departureLocation}
          onBlur={() => clearErrors("departureLocation")}
          placeholder="Departure location"
          tabIndex={1}
        />
      </section>
      <section className={cl["general-form__section"]}>
        <FormInput
          {...register("destination", {
            required: true,
          })}
          isError={errors.destination}
          onBlur={() => clearErrors("destination")}
          placeholder="Destination"
          tabIndex={2}
        />
      </section>
      <section className={cl["general-form__section"]}>
        <FormInput
          {...register("flightNumber", {
            required: true,
          })}
          isError={errors.flightNumber}
          onBlur={() => clearErrors("flightNumber")}
          placeholder="Flight number"
          tabIndex={3}
        />
      </section>
      <section className={cl["general-form__section"]}>
        <FormInput
          {...register("price", {
            required: true,
            validate: FlightValidation.price,
          })}
          isError={errors.price}
          onBlur={() => clearErrors("price")}
          placeholder="Price"
          tabIndex={4}
        />
      </section>
      <section className={cl["general-form__section"]}>
        <FormInput
          {...register("departureTime", {
            required: true,
            validate: FlightValidation.departureTime,
          })}
          isError={errors.departureTime}
          onBlur={() => clearErrors("departureTime")}
          type="datetime-local"
          placeholder="Departure time"
          tabIndex={5}
        />
      </section>
      <section className={fifthSectionClasses}>
        <FormInput
          {...register("arrivalTime", {
            required: true,
            validate: FlightValidation.arrivalTime,
          })}
          isError={errors.arrivalTime}
          onBlur={() => clearErrors("arrivalTime")}
          type="datetime-local"
          placeholder="Arrival time"
          tabIndex={6}
        />
      </section>
      <section className={checkboxSectionClasses}>
        <span className={checkBoxErrorClasses}>Is flight status active?</span>
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
      <Notify
        show={errorAlert.show}
        message={errorAlert.message}
        type="error"
      />
    </form>
  );
};

export default GeneralFlightForm;
