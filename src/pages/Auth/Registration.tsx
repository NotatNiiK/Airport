import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputMask } from "@react-input/mask";
import { IRegData } from "../../models/auth";
import { useNavigate, Link } from "react-router-dom";
import { AxiosError } from "axios";
import { IAlert } from "../../models/alert";
import cl from "./Auth.module.scss";
import Alert from "@mui/material/Alert";
import AuthInput from "../../components/UI/AuthInput/AuthInput";
import AuthButton from "../../components/UI/AuthButton/AuthButton";
import AuthService from "../../services/AuthService";
import AuthValidation from "../../validation/AuthValidation";
import getRawPhoneNumber from "../../utils/getRawPhoneNumber";
import setTokenInLocalStorage from "../../utils/setTokenInLocalStorage";
import { createPortal } from "react-dom";

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
    setTimeout(() => {
      setErrorAlert({
        error: false,
        message: "",
      });
    }, 3000);
  }

  const performRegistration: SubmitHandler<IRegData> = async (
    regData: IRegData
  ): Promise<void> => {
    try {
      regData.contactInfo = getRawPhoneNumber(regData.contactInfo);

      const {
        data: { access },
      } = await AuthService.registration(regData);

      setTokenInLocalStorage(access);
      reset();
      navigate("/");
    } catch (e: unknown) {
      const error = e as AxiosError;
      showAlert(error.message);
    }
  };

  return (
    <div className={cl["auth"]}>
      <section className={cl["auth__body"]}>
        <h1 className={cl["auth__title"]}>Sign in</h1>
        <form
          className="auth__form"
          onSubmit={handleSubmit(performRegistration)}
        >
          <fieldset className={cl["auth__section"]}>
            <AuthInput
              {...register("fullName", {
                required: true,
                validate: AuthValidation.fullName,
              })}
              style={{ boxShadow: errors.fullName ? "0px 0px 7px red" : "" }}
              onBlur={() => clearErrors("fullName")}
              placeholder="Username"
              tabIndex={1}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <AuthInput
              {...register("email", {
                required: true,
                validate: AuthValidation.email,
              })}
              style={{ boxShadow: errors.email ? "0px 0px 7px red" : "" }}
              onBlur={() => clearErrors("email")}
              placeholder="Email"
              tabIndex={2}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <AuthInput
              {...register("password", {
                required: true,
                validate: AuthValidation.password,
              })}
              style={{ boxShadow: errors.password ? "0px 0px 7px red" : "" }}
              onBlur={() => clearErrors("password")}
              placeholder="Password"
              tabIndex={3}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <AuthInput
              {...register("passportNumber", {
                required: true,
                validate: AuthValidation.passportNumber,
              })}
              style={{
                boxShadow: errors.passportNumber ? "0px 0px 7px red" : "",
              }}
              onBlur={() => clearErrors("passportNumber")}
              placeholder="Passport number"
              tabIndex={4}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <InputMask
              type="text"
              className={cl["auth__input"]}
              mask="+38 (___) ___-__-__"
              replacement={{ _: /\d/ }}
              {...register("contactInfo", {
                required: true,
                validate: AuthValidation.myContacts,
              })}
              style={{
                boxShadow: errors.contactInfo ? "0px 0px 7px red" : "",
              }}
              onBlur={() => clearErrors("contactInfo")}
              placeholder="Tel"
              tabIndex={5}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <AuthButton type="submit" tabIndex={6}>
              Sign in
            </AuthButton>
          </fieldset>
          <p className={cl["auth__link"]}>
            Do you have an account? <Link to="/login">Login</Link>
          </p>
          {errorAlert.error &&
            createPortal(
              <Alert severity="error" className={cl["alert"]}>
                {errorAlert.message}
              </Alert>,
              document.body
            )}
        </form>
      </section>
    </div>
  );
};

export default Registration;
