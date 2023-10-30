import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputMask } from "@react-input/mask";
import { IRegData } from "../../models/auth";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { IAlert } from "../../models/alert";
import cl from "./Registration.module.scss";
import Alert from "@mui/material/Alert";
import AuthServer from "../../services/AuthService";
import RegValidation from "../../validation/RegValidation";
import AuthInput from "../../components/UI/AuthInput/AuthInput";
import getRawPhoneNumber from "../../utils/getRawPhoneNumber";

const Registration: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IRegData>();

  const [errorAlert, setErrorAlert] = useState<IAlert>({
    error: false,
    message: "",
  });

  function showAlert(message: string): void {
    setErrorAlert({
      error: true,
      message,
    });
  }

  function setTokenInLocalStorage(token: string): void {
    localStorage.setItem("token", JSON.stringify(token));
  }

  const performRegistration: SubmitHandler<IRegData> = async (
    regData
  ): Promise<void> => {
    try {
      regData.contactInfo = getRawPhoneNumber(regData.contactInfo);

      const {
        data: { access },
      } = await AuthServer.registration(regData);

      setTokenInLocalStorage(access);
      reset();
      navigate("/");
    } catch (e: unknown) {
      const error = e as AxiosError;
      showAlert(error.message);
    }
  };

  return (
    <div className={cl["registration"]}>
      <section className={cl["registration__body"]}>
        <h1 className={cl["registration__title"]}>Registration</h1>
        <form
          className="registration__form"
          onSubmit={handleSubmit(performRegistration)}
        >
          <fieldset className={cl["registration__section"]}>
            <AuthInput
              {...register("fullName", {
                required: true,
                validate: RegValidation.fullName,
              })}
              style={{ boxShadow: errors.fullName ? "0px 0px 5px red" : "" }}
              onBlur={() => clearErrors("fullName")}
              placeholder="Username"
              tabIndex={1}
            />
          </fieldset>
          <fieldset className={cl["registration__section"]}>
            <AuthInput
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
            <AuthInput
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
            <AuthInput
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
          {errorAlert.error && (
            <Alert severity="error">{errorAlert.message}</Alert>
          )}
        </form>
      </section>
    </div>
  );
};

export default Registration;
