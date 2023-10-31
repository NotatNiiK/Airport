import { FC, useState } from "react";
import cl from "./Auth.module.scss";
import AuthButton from "../../components/UI/AuthButton/AuthButton";
import AuthInput from "../../components/UI/AuthInput/AuthInput";
import Alert from "@mui/material/Alert";
import { IAlert } from "../../models/alert";
import { useForm, SubmitHandler } from "react-hook-form";
import { IAuthData } from "../../models/auth";
import AuthValidation from "../../validation/AuthValidation";
import { AxiosError } from "axios";
import AuthService from "../../services/AuthService";
import setTokenInLocalStorage from "../../utils/setTokenInLocalStorage";
import { useNavigate, Link } from "react-router-dom";
import { createPortal } from "react-dom";

const Authorization: FC = () => {
  const navigate = useNavigate();

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
    setTimeout(() => {
      setErrorAlert({
        error: false,
        message: "",
      });
    }, 3000);
  }

  const performAuthorization: SubmitHandler<IAuthData> = async (
    authData: IAuthData
  ): Promise<void> => {
    try {
      const {
        data: { access },
      } = await AuthService.authorization(authData);
      setTokenInLocalStorage(access);
      reset();
      navigate("/");
    } catch (e: any) {
      console.log(e);
      showAlert(e?.response?.data?.message || "Unexpected error");
    }
  };

  return (
    <div className={cl["auth"]}>
      <section className={cl["auth__body"]}>
        <h1 className={cl["auth__title"]}>Login</h1>
        <form
          className="auth__form"
          onSubmit={handleSubmit(performAuthorization)}
        >
          <fieldset className={cl["auth__section"]}>
            <AuthInput
              {...register("email", {
                required: true,
                validate: AuthValidation.fullName,
              })}
              style={{ boxShadow: errors.email ? "0px 0px 7px red" : "" }}
              onBlur={() => clearErrors("email")}
              placeholder="Email"
              tabIndex={1}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <AuthInput
              {...register("password", {
                required: true,
                validate: AuthValidation.authPassword,
              })}
              style={{ boxShadow: errors.password ? "0px 0px 7px red" : "" }}
              onBlur={() => clearErrors("password")}
              placeholder="Password"
              tabIndex={2}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <AuthButton type="submit" tabIndex={3}>
              Login
            </AuthButton>
          </fieldset>
          <p className={cl["auth__link"]}>
            Don't have an account? <Link to="/signin">Sign in</Link>
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

export default Authorization;
