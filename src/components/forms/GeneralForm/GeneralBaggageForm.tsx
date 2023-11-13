import { FC, useState, useEffect, useMemo, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAlert } from "../../../hooks/useAlert";
import { useFetching } from "../../../hooks/useFetching";
import { useCalculatePrice } from "../../../hooks/useCalculatePrice";
import { IBaggage } from "../../../models/baggage";
import cl from "./GeneralForm.module.scss";
import Notify from "../../UI/Notify/Notify";
import FormInput from "../../UI/FormInput/FormInput";
import FormButton from "../../UI/FormButton/FormButton";
import BaggageStore from "../../../store/BaggageStore";
import BaggageValidation from "../../../validation/BaggageValidation";

interface GeneralBaggageFormProps {
  title: string;
  isClearForm: boolean;
  closeModal: () => void;
  isEdit?: boolean;
  baggage?: IBaggage;
}

const GeneralBaggageForm: FC<GeneralBaggageFormProps> = ({
  title,
  isClearForm,
  closeModal,
  isEdit,
  baggage,
}) => {
  const { tiketId } = useParams();

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  const [baggagePrice, setPrice] = useCalculatePrice({
    width,
    height,
    weight,
  });

  const baggagePriceDisplay = useMemo((): string => {
    if (baggagePrice === 0) return "0$";
    return baggagePrice ? baggagePrice + "$" : "Uncorrect data!";
  }, [baggagePrice]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
  } = useForm<IBaggage>();

  const [errorAlert, showErrorAlert] = useAlert();
  const [successAlert, showSuccessAlert] = useAlert();

  useEffect((): void => {
    if (baggage?.cost) {
      const baggageCost: number = +baggage.cost;
      setPrice(baggageCost);
    }
  }, []);

  useEffect((): void => {
    if (isEdit) setEditFormValue();
  }, [baggage]);

  useEffect((): void => {
    if (!isClearForm && !isEdit) reset();
  }, [isClearForm]);

  function setEditFormValue(): void {
    if (baggage) {
      Object.keys(baggage).forEach((key) => {
        const baggageKey = key as keyof IBaggage;
        setValue(baggageKey, baggage[baggageKey]);
      });
    }
  }

  const [handleForm, isLoading] = useFetching(
    async (baggageData: IBaggage): Promise<void> => {
      let apiResponse;

      if (isEdit) {
        apiResponse = await BaggageStore.updateBaggage(baggageData);
      } else {
        if (tiketId) {
          const baggage: IBaggage = {
            ...baggageData,
            tiketId,
            cost: String(baggagePrice),
          };
          apiResponse = await BaggageStore.createBaggage(baggage);
        }
      }

      if (apiResponse?.hasError) {
        showErrorAlert(apiResponse.response);
        return;
      }

      if (apiResponse?.response) {
        showSuccessAlert(apiResponse?.response);
      }

      if (tiketId) {
        const numTicketId = +tiketId;
        await BaggageStore.getBaggageById(numTicketId);
      }

      if (!isEdit) {
        reset();
      }

      setPrice(0);
      closeModal();
    }
  );

  const handleInput = (
    e: ChangeEvent<HTMLInputElement>,
    setValueFunction: (value: number) => void
  ) => {
    const numberValue = +e.target.value;
    setValueFunction(numberValue);
  };

  return (
    <form className={cl["general-form"]} onSubmit={handleSubmit(handleForm)}>
      <h2 className={cl["general-form__title"]}>{title}</h2>
      <section className={cl["general-form__section"]}>
        <FormInput
          {...register("width", {
            required: true,
            validate: BaggageValidation.dimensions,
          })}
          isError={errors.width}
          onBlur={() => clearErrors("width")}
          onInput={(e: ChangeEvent<HTMLInputElement>) =>
            handleInput(e, setWidth)
          }
          placeholder="Width, m"
          tabIndex={1}
        />
      </section>
      <section className={cl["general-form__section"]}>
        <FormInput
          {...register("height", {
            required: true,
            validate: BaggageValidation.dimensions,
          })}
          isError={errors.height}
          onBlur={() => clearErrors("height")}
          onInput={(e: ChangeEvent<HTMLInputElement>) =>
            handleInput(e, setHeight)
          }
          placeholder="Height, cm"
          tabIndex={2}
        />
      </section>
      <section className={cl["general-form__section"]}>
        <FormInput
          {...register("weight", {
            required: true,
            validate: BaggageValidation.dimensions,
          })}
          isError={errors.weight}
          onBlur={() => clearErrors("weight")}
          onInput={(e: ChangeEvent<HTMLInputElement>) =>
            handleInput(e, setWeight)
          }
          placeholder="Weight"
          tabIndex={3}
        />
      </section>
      <section className={cl["general-form__section"]}>
        <p className={cl["general-form__price"]}>
          Price: {baggagePriceDisplay}
        </p>
      </section>
      <section className={cl["general-form__section"]}>
        <FormButton loading={isLoading} tabIndex={8}>
          {isEdit ? "Edit" : "Create"}
        </FormButton>
      </section>
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
    </form>
  );
};

export default GeneralBaggageForm;
