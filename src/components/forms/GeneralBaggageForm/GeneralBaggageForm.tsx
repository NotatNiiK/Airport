import { FC, useState, useEffect, useMemo, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { IBaggage } from "../../../models/baggage";
import { useForm } from "react-hook-form";
import { useFetching } from "../../../hooks/useFetching";
import { useAlert } from "../../../hooks/useAlert";
import BaggageStore from "../../../store/BaggageStore";
import FormInput from "../../UI/FormInput/FormInput";
import FormButton from "../../UI/FormButton/FormButton";
import cl from "./GeneralBaggageForm.module.scss";
import Notify from "../../Notify/Notify";
import BaggageValidation from "../../../validation/BaggageValidation";
import { useCalculatePrice } from "../../../hooks/useCalculatePrice";

interface GeneralBaggageFormProps {
  title: string;
  isEdit: boolean;
  isClearForm: boolean;
  baggage?: IBaggage;
  closeModal: () => void;
}

const GeneralBaggageForm: FC<GeneralBaggageFormProps> = ({
  title,
  isEdit,
  isClearForm,
  baggage,
  closeModal,
}) => {
  const { tiketId } = useParams();

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  const [baggagePrice, resetBaggagePrice] = useCalculatePrice({
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

  const [errorAlert, showAlert] = useAlert();
  const [successAlert, showSuccessAlert] = useAlert();

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
          const baggage = {
            ...baggageData,
            tiketId,
            cost: String(baggagePrice),
          };
          apiResponse = await BaggageStore.createBaggage(baggage);
        }
      }

      if (apiResponse?.hasError) {
        showAlert(apiResponse.response);
        return;
      }

      showSuccessAlert(apiResponse?.response || "Success");

      if (tiketId) {
        const numTicketId = +tiketId;
        await BaggageStore.getBaggageById(numTicketId);
      }

      if (!isEdit) {
        reset();
        resetBaggagePrice();
      }

      closeModal();
    }
  );

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
          placeholder="Width, m"
          tabIndex={1}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            const numberValue = +e.target.value;
            setWidth(numberValue);
          }}
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
          placeholder="Height, cm"
          tabIndex={2}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            const numberValue = +e.target.value;
            setHeight(numberValue);
          }}
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
          placeholder="Weight"
          tabIndex={3}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            const numberValue = +e.target.value;
            setWeight(numberValue);
          }}
        />
      </section>
      <section className={cl["general-form__section"]}>
        <p className={cl["general-form__price"]}>
          Price: {baggagePriceDisplay}
        </p>
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
      <Notify
        show={successAlert.show}
        message={successAlert.message}
        type="success"
      />
    </form>
  );
};

export default GeneralBaggageForm;
