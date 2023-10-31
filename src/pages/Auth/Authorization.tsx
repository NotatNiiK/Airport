import { FC, useState } from "react";
import cl from "./Auth.module.scss";
import AuthButton from "../../components/UI/AuthButton/AuthButton";
import AuthInput from "../../components/UI/AuthInput/AuthInput";
import Alert from "@mui/material/Alert";
import { IAlert } from "../../models/alert";
import { useForm, SubmitHandler } from "react-hook-form";
import { IAuthData } from "../../models/auth";
import RegValidation from "../../validation/RegValidation";

const Authorization: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IAuthData>();

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

  const performAuthorization: SubmitHandler<IAuthData> = async (
    authData: IAuthData
  ): Promise<void> => {
    console.log(authData);
  };

  return (
    <div className={cl["auth"]}>
      <section className={cl["auth__body"]}>
        <h1 className={cl["auth__title"]}>Authorization</h1>
        <form
          className="auth__form"
          onSubmit={handleSubmit(performAuthorization)}
        >
          <fieldset className={cl["auth__section"]}>
            <AuthInput
              {...register("email", {
                required: true,
                validate: RegValidation.fullName,
              })}
              style={{ boxShadow: errors.email ? "0px 0px 5px red" : "" }}
              onBlur={() => clearErrors("email")}
              placeholder="Email"
              tabIndex={1}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <AuthInput
              {...register("password", {
                required: true,
                validate: RegValidation.password,
              })}
              style={{ boxShadow: errors.password ? "0px 0px 5px red" : "" }}
              onBlur={() => clearErrors("password")}
              placeholder="Password"
              tabIndex={2}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <AuthButton type="submit">Authorization</AuthButton>
          </fieldset>
          {errorAlert.error && (
            <Alert severity="error">{errorAlert.message}</Alert>
          )}
        </form>
      </section>
    </div>
  );
};

export default Authorization;
