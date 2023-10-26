import { FC } from "react";
import cl from "./Registration.module.scss";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import RegValidation from "../../validation/RegValidation";
import { InputMask } from "@react-input/mask";
interface RegForm {
  fullname: string;
  email: string;
  password: string;
  passportNumber: string;
  contactInfo: string;
}

const Registration: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<RegForm>();

  const performRegistration: SubmitHandler<RegForm> = (data) => {
    console.log(data);
    reset();
  };

  const errorRegistration: SubmitErrorHandler<RegForm> = (data) => {};

  return (
    <div className={cl["registration"]}>
      <section className={cl["registration__body"]}>
        <h1 className={cl["registration__title"]}>Registration</h1>
        <form
          className="registration__form"
          onSubmit={handleSubmit(performRegistration, errorRegistration)}
        >
          <fieldset className={cl["registration__section"]}>
            <input
              type="text"
              className={cl["registration__input"]}
              {...register("fullname", {
                required: true,
                validate: RegValidation.fullname,
              })}
              style={{ boxShadow: errors.fullname ? "0px 0px 5px red" : "" }}
              onBlur={() => clearErrors("fullname")}
              placeholder="Username"
              tabIndex={1}
            />
          </fieldset>
          <fieldset className={cl["registration__section"]}>
            <input
              type="text"
              className={cl["registration__input"]}
              {...register("email", {
                required: true,
                validate: RegValidation.email,
              })}
              style={{ boxShadow: errors.email ? "0px 0px 5px red" : "" }}
              onBlur={() => clearErrors("email")}
              placeholder="Email"
              tabIndex={2}
            />
          </fieldset>
          <fieldset className={cl["registration__section"]}>
            <input
              type="text"
              className={cl["registration__input"]}
              {...register("password", {
                required: true,
                validate: RegValidation.password,
              })}
              style={{ boxShadow: errors.password ? "0px 0px 5px red" : "" }}
              onBlur={() => clearErrors("password")}
              placeholder="Password"
              tabIndex={3}
            />
          </fieldset>
          <fieldset className={cl["registration__section"]}>
            <input
              type="text"
              className={cl["registration__input"]}
              {...register("passportNumber", {
                required: true,
                validate: RegValidation.passportNumber,
              })}
              style={{
                boxShadow: errors.passportNumber ? "0px 0px 5px red" : "",
              }}
              onBlur={() => clearErrors("passportNumber")}
              placeholder="Passport number"
              tabIndex={4}
            />
          </fieldset>
          <fieldset className={cl["registration__section"]}>
            <InputMask
              type="text"
              className={cl["registration__input"]}
              mask="+38 (___) ___-__-__"
              replacement={{ _: /\d/ }}
              {...register("contactInfo", {
                required: true,
                validate: RegValidation.myContacts,
              })}
              style={{
                boxShadow: errors.contactInfo ? "0px 0px 5px red" : "",
              }}
              onBlur={() => clearErrors("contactInfo")}
              placeholder="Tel"
              tabIndex={5}
            />
          </fieldset>
          <fieldset className={cl["registration__section"]}>
            <button type="submit" className={cl["registration__button"]}>
              Register
            </button>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default Registration;
