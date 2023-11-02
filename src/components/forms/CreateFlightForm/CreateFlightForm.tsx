import { FC } from "react";
import cl from "./CreateFlightForm.module.scss";
import FormInput from "../../UI/FormInput/FormInput";
import FormButton from "../../UI/FormButton/FormButton";
import Checkbox from "@mui/material/Checkbox";

const CreateFlightForm: FC = () => {
  return (
    <form className={cl["create-form"]}>
      <h2 className={cl["create-form__title"]}>Create Flight</h2>
      <section className={cl["create-form__section"]}>
        <FormInput placeholder="Flight number" tabIndex={1} />
      </section>
      <section className={cl["create-form__section"]}>
        <FormInput placeholder="Departure location" tabIndex={2} />
      </section>
      <section className={cl["create-form__section"]}>
        <FormInput placeholder="Destination" tabIndex={3} />
      </section>
      <section className={cl["create-form__section"]}>
        <FormInput
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
        <span className={cl["create-form__label"]}>
          Is flight status active?
        </span>{" "}
        <Checkbox size="small" />
      </section>
      <section className={cl["create-form__section"]}>
        <FormButton loading={false} tabIndex={7}>
          Create
        </FormButton>
      </section>
    </form>
  );
};

export default CreateFlightForm;
